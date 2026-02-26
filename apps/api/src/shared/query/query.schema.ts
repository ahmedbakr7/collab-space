import { z } from 'zod';
import type { QueryOptions, SortOption, FilterOption } from '@repo/domain';

/**
 * Creates a Zod schema for query parameter validation.
 * Validates page, limit, sort, and allowed filter fields.
 *
 * @param allowedSortFields  - Fields that can appear in `sort` param
 * @param allowedFilterFields - Fields that can appear as filter query params
 */
export function createQuerySchema(
  allowedSortFields: string[],
  allowedFilterFields: string[],
) {
  return z
    .object({
      page: z.coerce.number().int().min(1).default(1),
      limit: z.coerce.number().int().min(1).max(50).default(10),
      sort: z.string().optional(),
    })
    .passthrough()
    .transform((raw) => {
      const queryOptions: QueryOptions = {
        pagination: { page: raw.page, limit: raw.limit },
      };

      // ── Sort ──
      if (raw.sort) {
        const sortParts = raw.sort.split(',').map((s: string) => s.trim());
        const sortOptions: SortOption[] = [];

        for (const part of sortParts) {
          const desc = part.startsWith('-');
          const field = desc ? part.slice(1) : part;
          if (allowedSortFields.includes(field)) {
            sortOptions.push({ field, direction: desc ? 'desc' : 'asc' });
          }
        }

        if (sortOptions.length > 0) {
          queryOptions.sort = sortOptions;
        }
      }

      // ── Filters ──
      const filters: FilterOption[] = [];

      for (const filterField of allowedFilterFields) {
        const rawValue = (raw as Record<string, unknown>)[filterField];
        if (typeof rawValue === 'string' && rawValue.length > 0) {
          if (rawValue.includes(',')) {
            filters.push({
              field: filterField,
              value: rawValue.split(',').map((v: string) => v.trim()),
              operator: 'in',
            });
          } else {
            filters.push({
              field: filterField,
              value: rawValue,
              operator: 'eq',
            });
          }
        }

        // LHS bracket syntax: field[gte]=value, field[lte]=value
        for (const op of ['gte', 'lte'] as const) {
          const bracketKey = `${filterField}[${op}]`;
          const bracketValue = (raw as Record<string, unknown>)[bracketKey];
          if (typeof bracketValue === 'string' && bracketValue.length > 0) {
            filters.push({
              field: filterField,
              value: bracketValue,
              operator: op,
            });
          }
        }
      }

      if (filters.length > 0) {
        queryOptions.filters = filters;
      }

      return queryOptions;
    });
}

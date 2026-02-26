import type { QueryOptions } from '@repo/domain';

/**
 * Converts domain QueryOptions into a flat Record<string, string>
 * suitable for Axios `params` / URL query strings.
 *
 * Output format matches the API's Zod query schema:
 *   - page, limit          → pagination
 *   - sort=field,-field     → sorting (comma-separated, - prefix = desc)
 *   - field=value           → exact filter
 *   - field=v1,v2           → IN filter
 *   - field[gte]=v          → range filter
 */
export function buildQueryParams(
  query?: QueryOptions,
): Record<string, string> | undefined {
  if (!query) return undefined;

  const params: Record<string, string> = {};

  // Pagination
  if (query.pagination) {
    if (query.pagination.page) {
      params.page = String(query.pagination.page);
    }
    if (query.pagination.limit) {
      params.limit = String(query.pagination.limit);
    }
  }

  // Sorting: sort=name,-createdAt
  if (query.sort && query.sort.length > 0) {
    params.sort = query.sort
      .map((s) => (s.direction === 'desc' ? `-${s.field}` : s.field))
      .join(',');
  }

  // Filters
  if (query.filters && query.filters.length > 0) {
    for (const filter of query.filters) {
      const value = Array.isArray(filter.value)
        ? filter.value.join(',')
        : filter.value;

      if (filter.operator === 'eq' || filter.operator === 'in') {
        params[filter.field] = value;
      } else {
        // gte / lte → field[gte]=value
        params[`${filter.field}[${filter.operator}]`] = value;
      }
    }
  }

  return Object.keys(params).length > 0 ? params : undefined;
}

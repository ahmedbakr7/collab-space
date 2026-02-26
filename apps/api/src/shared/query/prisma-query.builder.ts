import type {
  QueryOptions,
  PaginatedResult,
  PaginationOptions,
  FilterOption,
  SortOption,
} from '@repo/domain';

/**
 * Converts FilterOption[] into a Prisma `where` clause.
 * `fieldMap` translates user-facing names to Prisma column names.
 */
export function buildPrismaWhere(
  filters: FilterOption[] | undefined,
  fieldMap: Record<string, string>,
): Record<string, unknown> {
  const where: Record<string, unknown> = {};
  if (!filters) return where;

  for (const filter of filters) {
    const prismaField = fieldMap[filter.field];
    if (!prismaField) continue;

    switch (filter.operator) {
      case 'eq':
        where[prismaField] = filter.value;
        break;
      case 'in':
        where[prismaField] = { in: filter.value };
        break;
      case 'gte':
        where[prismaField] = {
          ...(where[prismaField] as Record<string, unknown> | undefined),
          gte: filter.value,
        };
        break;
      case 'lte':
        where[prismaField] = {
          ...(where[prismaField] as Record<string, unknown> | undefined),
          lte: filter.value,
        };
        break;
    }
  }

  return where;
}

/**
 * Converts SortOption[] into a Prisma `orderBy` array.
 */
export function buildPrismaOrderBy(
  sort: SortOption[] | undefined,
): Record<string, 'asc' | 'desc'>[] | undefined {
  if (!sort || sort.length === 0) return undefined;
  return sort.map((s) => ({ [s.field]: s.direction }));
}

/**
 * Converts PaginationOptions into Prisma `skip` and `take`.
 */
export function buildPrismaPagination(
  pagination: PaginationOptions | undefined,
): { skip?: number; take?: number } {
  if (!pagination) return {};
  return {
    skip: (pagination.page - 1) * pagination.limit,
    take: pagination.limit,
  };
}

/**
 * Builds a PaginatedResult from data, total count, and pagination options.
 */
export function buildPaginatedResult<T>(
  data: T[],
  total: number,
  pagination?: PaginationOptions,
): PaginatedResult<T> {
  const page = pagination?.page ?? 1;
  const limit = pagination?.limit ?? data.length;
  return {
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: limit > 0 ? Math.ceil(total / limit) : 1,
    },
  };
}

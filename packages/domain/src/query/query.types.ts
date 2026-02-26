/**
 * Shared query types for sorting, filtering, and pagination.
 * Pure TypeScript — no framework dependencies.
 */

export interface PaginationOptions {
  page: number;
  limit: number;
}

export interface SortOption {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterOption {
  field: string;
  value: string | string[];
  operator: 'eq' | 'gte' | 'lte' | 'in';
}

export interface QueryOptions {
  pagination?: PaginationOptions;
  sort?: SortOption[];
  filters?: FilterOption[];
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

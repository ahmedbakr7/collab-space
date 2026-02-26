import { Tag } from '@repo/domain';
import type { QueryOptions, PaginatedResult } from '@repo/domain';

export interface TagRepository {
  save(tag: Tag): Promise<void>;
  findById(id: string): Promise<Tag | null>;
  findByOrgId(
    orgId: string,
    query?: QueryOptions,
  ): Promise<PaginatedResult<Tag>>;
  findByName(orgId: string, name: string): Promise<Tag | null>;
  delete(id: string): Promise<void>;
}

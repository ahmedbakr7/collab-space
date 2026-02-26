import type { PaginatedResult, QueryOptions } from '@repo/domain';
import { Tag } from '@repo/domain';
import { TagRepository } from '../ports/tag.repository.interface';

export class GetTagsUseCase {
  constructor(private readonly tagRepository: TagRepository) {}

  async execute(
    orgId: string,
    query?: QueryOptions,
  ): Promise<PaginatedResult<Tag>> {
    return this.tagRepository.findByOrgId(orgId, query);
  }
}

import { Tag } from '../../domain/entities/tag.entity';
import { TagRepository } from '../ports/tag.repository.interface';

export class GetTagsUseCase {
  constructor(private readonly tagRepository: TagRepository) {}

  async execute(orgId: string): Promise<Tag[]> {
    return this.tagRepository.findByOrgId(orgId);
  }
}

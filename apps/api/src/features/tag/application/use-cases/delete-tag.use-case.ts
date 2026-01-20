import { TagRepository } from '../ports/tag.repository.interface';
import { TagNotFoundError } from '../errors/tag.errors';

export class DeleteTagUseCase {
  constructor(private readonly tagRepository: TagRepository) {}

  async execute(id: string): Promise<void> {
    const tag = await this.tagRepository.findById(id);

    if (!tag) {
      throw new TagNotFoundError(id);
    }

    await this.tagRepository.delete(id);
  }
}

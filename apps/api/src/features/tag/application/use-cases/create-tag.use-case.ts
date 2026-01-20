import { Tag } from '../../domain/entities/tag.entity';
import { TagRepository } from '../ports/tag.repository.interface';
import { TagAlreadyExistsError } from '../errors/tag.errors';
import { randomUUID } from 'crypto';

export interface CreateTagCommand {
  orgId: string;
  name: string;
}

export class CreateTagUseCase {
  constructor(private readonly tagRepository: TagRepository) {}

  async execute(command: CreateTagCommand): Promise<Tag> {
    const existingTag = await this.tagRepository.findByName(
      command.orgId,
      command.name,
    );

    if (existingTag) {
      throw new TagAlreadyExistsError(command.name);
    }

    const tag = new Tag(randomUUID(), command.name, command.orgId);
    await this.tagRepository.save(tag);

    return tag;
  }
}

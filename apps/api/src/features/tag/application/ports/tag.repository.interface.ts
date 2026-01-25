import { Tag } from '@repo/domain';

export interface TagRepository {
  save(tag: Tag): Promise<void>;
  findById(id: string): Promise<Tag | null>;
  findByOrgId(orgId: string): Promise<Tag[]>;
  findByName(orgId: string, name: string): Promise<Tag | null>;
  delete(id: string): Promise<void>;
}

import { Organization } from '@repo/domain/src/organization/entities/organization.entity';

export interface WorkspaceRepositoryPort {
  getAllWorkspaces(): Promise<Organization[]>;
  getWorkspace(id: string): Promise<Organization | null>;
}

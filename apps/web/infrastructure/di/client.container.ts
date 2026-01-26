import 'reflect-metadata';
import { container } from 'tsyringe';
import { ORGANIZATION_REPOSITORY_TOKEN } from '@/features/organization/application/ports/organization.repository.port';
import { OrganizationRepositoryAdapter } from '@/features/organization/infrastructure/adapters/organization.repository.adapter';

// Register Organization feature dependencies
container.register(ORGANIZATION_REPOSITORY_TOKEN, {
  useClass: OrganizationRepositoryAdapter,
});

export { container as clientContainer };

import { Module } from '@nestjs/common';
import { OrganizationsController } from './controllers/organizations.controller';
import { CreateOrganizationUseCase } from '../application/use-cases/create-organization.use-case';
import { GetOrganizationUseCase } from '../application/use-cases/get-organization.use-case';
import { GetOrganizationsUseCase } from '../application/use-cases/get-organizations.use-case';
import { UpdateOrganizationUseCase } from '../application/use-cases/update-organization.use-case';
import { DeleteOrganizationUseCase } from '../application/use-cases/delete-organization.use-case';
import { PrismaOrganizationRepository } from '../infrastructure/persistence/prisma-organization.repository';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { OrganizationRepository } from '../application/ports/organization.repository.interface';

// Define the token for dependency injection
const OrganizationRepositoryToken = 'OrganizationRepository';

@Module({
  controllers: [OrganizationsController],
  providers: [
    PrismaService,
    {
      provide: OrganizationRepositoryToken,
      useClass: PrismaOrganizationRepository,
    },
    {
      provide: CreateOrganizationUseCase,
      useFactory: (organizationRepository: OrganizationRepository) =>
        new CreateOrganizationUseCase(organizationRepository),
      inject: [OrganizationRepositoryToken],
    },
    {
      provide: GetOrganizationUseCase,
      useFactory: (organizationRepository: OrganizationRepository) =>
        new GetOrganizationUseCase(organizationRepository),
      inject: [OrganizationRepositoryToken],
    },
    {
      provide: GetOrganizationsUseCase,
      useFactory: (organizationRepository: OrganizationRepository) =>
        new GetOrganizationsUseCase(organizationRepository),
      inject: [OrganizationRepositoryToken],
    },
    {
      provide: UpdateOrganizationUseCase,
      useFactory: (organizationRepository: OrganizationRepository) =>
        new UpdateOrganizationUseCase(organizationRepository),
      inject: [OrganizationRepositoryToken],
    },
    {
      provide: DeleteOrganizationUseCase,
      useFactory: (organizationRepository: OrganizationRepository) =>
        new DeleteOrganizationUseCase(organizationRepository),
      inject: [OrganizationRepositoryToken],
    },
  ],
  exports: [GetOrganizationUseCase],
})
export class OrganizationsModule {}

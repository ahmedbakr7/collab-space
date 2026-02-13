import { Module } from '@nestjs/common';
import { OrganizationsController } from './controllers/organizations.controller';
import { CreateOrganizationUseCase } from '../application/use-cases/create-organization.use-case';
import { GetOrganizationUseCase } from '../application/use-cases/get-organization.use-case';
import { GetOrganizationsUseCase } from '../application/use-cases/get-organizations.use-case';
import { UpdateOrganizationUseCase } from '../application/use-cases/update-organization.use-case';
import { DeleteOrganizationUseCase } from '../application/use-cases/delete-organization.use-case';
import { GetPublicOrganizationsUseCase } from '../application/use-cases/get-public-organizations.use-case';
import { JoinPublicOrganizationUseCase } from '../application/use-cases/join-public-organization.use-case';
import { PrismaOrganizationRepository } from '../infrastructure/persistence/prisma-organization.repository';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { OrganizationRepository } from '../application/ports/organization.repository.interface';
import { AuthModule } from '../../auth/auth.module';

// Define the token for dependency injection
const OrganizationRepositoryToken = 'OrganizationRepository';

@Module({
  imports: [AuthModule],
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
    {
      provide: GetPublicOrganizationsUseCase,
      useFactory: (organizationRepository: OrganizationRepository) =>
        new GetPublicOrganizationsUseCase(organizationRepository),
      inject: [OrganizationRepositoryToken],
    },
    {
      provide: JoinPublicOrganizationUseCase,
      useFactory: (organizationRepository: OrganizationRepository) =>
        new JoinPublicOrganizationUseCase(organizationRepository),
      inject: [OrganizationRepositoryToken],
    },
  ],
  exports: [GetOrganizationUseCase],
})
export class OrganizationsModule {}

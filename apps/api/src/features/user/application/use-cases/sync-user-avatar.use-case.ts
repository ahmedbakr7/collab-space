import { Inject, Injectable, Logger } from '@nestjs/common';
import { AuthUser, User } from '@repo/domain';
import { AuthServiceInterface } from '../../../auth/application/ports/auth.service.interface';
import { UserRepository } from '../ports/user.repository.interface';
import { UserRepositoryToken } from '../../presentation/users.module';

@Injectable()
export class SyncUserAvatarUseCase {
  private readonly logger = new Logger(SyncUserAvatarUseCase.name);

  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
    @Inject('AuthServiceInterface')
    private readonly authService: AuthServiceInterface,
  ) {}

  async execute(userId: string, authUser: AuthUser): Promise<void> {
    try {
      // 1. Check local user
      const localUser = await this.userRepository.findById(userId);
      if (!localUser) {
        this.logger.warn(
          `SyncUserAvatar: User ${userId} not found in local DB.`,
        );
        return;
      }

      // 2. Check if avatar is NULL (First request / Unset), Already set, do nothing (idempotent)
      if (localUser.avatarUrl !== null && localUser.avatarUrl !== undefined) {
        return;
      }

      this.logger.log(`SyncUserAvatar: resolving avatar for ${userId}`);

      // 3. Resolve avatar from metadata
      // user_metadata.avatarUrl (clean) > picture (google) > avatar_url (github)
      const metadata = authUser.userMetadata || {};
      const resolvedAvatar =
        (metadata.avatarUrl as string) ||
        (metadata.picture as string) ||
        (metadata.avatar_url as string) ||
        null;

      if (!resolvedAvatar) {
        this.logger.log('SyncUserAvatar: No avatar found in metadata.');
        return;
      }

      // 4. Update Public User
      // We need a repository method to update partial user or just save the full user with modification
      // Since Domain User is immutable, we create a new instance (or copyWith if exists)
      // Assuming no copyWith, using constructor
      // 5. Save to local DB
      const newUser = new User(
        localUser.id,
        localUser.email,
        localUser.name,
        localUser.createdAt,
        localUser.updatedAt,
        resolvedAvatar,
        localUser.passwordHash,
      );
      await this.userRepository.save(newUser);

      // 6. Sync back to Supabase metadata (Canonical source is now DB)
      // We want `avatarUrl` in metadata to match DB.
      if (metadata.avatarUrl !== resolvedAvatar) {
        await this.authService.updateUserMetadata(userId, {
          avatarUrl: resolvedAvatar,
        });
      }

      this.logger.log(`SyncUserAvatar: Synced avatar for ${userId}`);
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Failed to sync avatar for user ${userId}: ${err.message}`,
        err.stack,
      );
      // Failsafe: don't crash request
    }
  }
}

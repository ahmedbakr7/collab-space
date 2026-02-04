import { Inject, Injectable, Logger } from '@nestjs/common';
import { AuthSession, AuthUser, User } from '@repo/domain';
import { RegisterUserDto } from '../dto/auth.dto';
import { AuthServiceInterface } from '../ports/auth.service.interface';
import { UserRepository } from '../../../user/application/ports/user.repository.interface';
import { UserRepositoryToken } from '../../../user/presentation/users.module';

@Injectable()
export class RegisterUserUseCase {
  private readonly logger = new Logger(RegisterUserUseCase.name);

  constructor(
    @Inject('AuthServiceInterface')
    private readonly authService: AuthServiceInterface,
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    dto: RegisterUserDto,
  ): Promise<{ user: AuthUser; session: AuthSession | null }> {
    const { user, session } = await this.authService.register(dto);

    try {
      // Sync user to local database
      const newUser = new User(
        user.id,
        user.email,
        dto.name || user.email.split('@')[0],
        new Date(),
        new Date(),
        dto.avatarUrl,
        'EXTERNAL_AUTH', // Managed by Supabase
      );

      await this.userRepository.save(newUser);
    } catch (error) {
      // If sync fails, we might want to log it or rollback (delete from supabase)
      // For now, we log and proceed, but this leaves inconsistent state.
      // Ideally, we would have a transactional approach or compensating action.
      const err = error as Error;
      this.logger.error(
        `Failed to sync user ${user.id} to local DB: ${err.message}`,
        err.stack,
      );
      // We don't throw to allow the user to at least have the auth account,
      // but next login might fail syncing if not handled there.
    }

    return { user, session };
  }
}

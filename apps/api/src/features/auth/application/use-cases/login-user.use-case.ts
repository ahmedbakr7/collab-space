import { Inject, Injectable, Logger } from '@nestjs/common';
import { AuthSession, AuthUser, User } from '@repo/domain';
import { LoginUserDto } from '../dto/auth.dto';
import { AuthServiceInterface } from '../ports/auth.service.interface';
import { UserRepository } from '../../../user/application/ports/user.repository.interface';
import { UserRepositoryToken } from '../../../user/presentation/users.module';

@Injectable()
export class LoginUserUseCase {
  private readonly logger = new Logger(LoginUserUseCase.name);

  constructor(
    @Inject('AuthServiceInterface')
    private readonly authService: AuthServiceInterface,
    @Inject(UserRepositoryToken)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(
    dto: LoginUserDto,
  ): Promise<{ user: AuthUser; session: AuthSession }> {
    const result = await this.authService.login(dto);
    const { user } = result;

    try {
      // Check if user exists in local DB
      const existingUser = await this.userRepository.findById(user.id);
      if (!existingUser) {
        this.logger.log(`User ${user.id} not found in local DB, syncing...`);
        // We don't have the name here unless it's in metadata
        const name =
          (user.metadata?.name as string) ||
          (user.metadata?.full_name as string) ||
          user.email.split('@')[0];

        const newUser = new User(
          user.id,
          user.email,
          name,
          'EXTERNAL_AUTH',
          new Date(),
          new Date(),
          user.metadata?.avatar_url as string | undefined,
        );

        await this.userRepository.save(newUser);
      }
    } catch (error) {
      const err = error as Error;
      this.logger.error(
        `Failed to sync user ${user.id} to local DB during login: ${err.message}`,
        err.stack,
      );
      // We don't block login, but strict consistency might require it.
    }

    return result;
  }
}

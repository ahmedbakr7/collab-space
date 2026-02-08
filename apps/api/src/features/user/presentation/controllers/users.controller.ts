import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthUser } from '@repo/domain';
import { CurrentUser } from '../../../auth/presentation/decorators/current-user.decorator';
import { SupabaseAuthGuard } from '../../../auth/presentation/guards/supabase-auth.guard';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { GetUserUseCase } from '../../application/use-cases/get-user.use-case';
import { GetUsersUseCase } from '../../application/use-cases/get-users.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { CreateUserDto, createUserSchema } from '../dtos/create-user.dto';
import { UpdateUserDto, updateUserSchema } from '../dtos/update-user.dto';
import { userIdSchema } from '../dtos/user-id.dto';
import { ZodValidationPipe } from '../../../../shared/pipes/zod-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createUserSchema)) body: CreateUserDto,
  ) {
    return this.createUserUseCase.execute(body);
  }

  @Get()
  @UseGuards(SupabaseAuthGuard)
  async getAll(@CurrentUser() user: AuthUser) {
    return this.getUsersUseCase.execute(user.id);
  }

  @Get(':id')
  @UseGuards(SupabaseAuthGuard)
  async get(
    @Param('id', new ZodValidationPipe(userIdSchema)) id: string,
    @CurrentUser() user: AuthUser,
  ) {
    return this.getUserUseCase.execute({ id, userId: user.id });
  }

  @Put(':id')
  async update(
    @Param('id', new ZodValidationPipe(userIdSchema)) id: string,
    @Body(new ZodValidationPipe(updateUserSchema)) body: UpdateUserDto,
  ) {
    return this.updateUserUseCase.execute({ id, ...body });
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', new ZodValidationPipe(userIdSchema)) id: string,
  ) {
    return this.deleteUserUseCase.execute(id);
  }
}

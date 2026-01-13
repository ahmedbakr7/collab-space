import { Controller, Post, Body, Get, Param, UsePipes } from '@nestjs/common';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { GetUserUseCase } from '../../application/use-cases/get-user.use-case';
import { GetUsersUseCase } from '../../application/use-cases/get-users.use-case';
import { CreateUserDto, createUserSchema } from '../dtos/create-user.dto';
import { ZodValidationPipe } from '../../../../shared/pipes/zod-validation.pipe';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserUseCase: GetUserUseCase,
    private readonly getUsersUseCase: GetUsersUseCase,
  ) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createUserSchema))
  async create(@Body() body: CreateUserDto) {
    const result = await this.createUserUseCase.execute(body);
    if (result.isErr()) {
      throw result.error;
    }
    return result.value;
  }

  @Get()
  async getAll() {
    const result = await this.getUsersUseCase.execute();
    if (result.isErr()) {
      throw result.error;
    }
    return result.value;
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const result = await this.getUserUseCase.execute({ id });
    if (result.isErr()) {
      throw result.error;
    }
    return result.value;
  }
}

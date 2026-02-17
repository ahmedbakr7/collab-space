import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from '../user/presentation/users.module';
import { SupabaseAuthGuard } from './presentation/guards/supabase-auth.guard';
import { PolicyGuard } from './presentation/guards/policy.guard';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

import { PassportModule } from '@nestjs/passport';
import { SupabaseJwtStrategy } from './infrastructure/supabase.strategy';

@Module({
  imports: [ConfigModule, forwardRef(() => UsersModule), PassportModule],
  controllers: [],
  providers: [
    PrismaService,
    SupabaseAuthGuard,
    SupabaseJwtStrategy,
    PolicyGuard,
  ],
  exports: [SupabaseAuthGuard, PolicyGuard],
})
export class AuthModule {}

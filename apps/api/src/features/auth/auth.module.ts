import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from '../user/presentation/users.module';
import { SupabaseAuthGuard } from './presentation/guards/supabase-auth.guard';

import { PassportModule } from '@nestjs/passport';
import { SupabaseJwtStrategy } from './infrastructure/supabase.strategy';

@Module({
  imports: [ConfigModule, UsersModule, PassportModule],
  controllers: [],
  providers: [SupabaseAuthGuard, SupabaseJwtStrategy],
  exports: [SupabaseAuthGuard],
})
export class AuthModule {}

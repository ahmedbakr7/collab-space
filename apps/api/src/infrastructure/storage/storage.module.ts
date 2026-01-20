import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StoragePort } from '../../shared/ports/storage.port';
import { SupabaseStorageService } from './supabase-storage.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: StoragePort,
      useClass: SupabaseStorageService,
    },
  ],
  exports: [StoragePort],
})
export class StorageModule {}

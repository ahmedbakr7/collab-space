import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { StoragePort } from '../../shared/ports/storage.port';
import {
  StorageDeleteError,
  StorageUploadError,
} from '../../shared/errors/storage.error';

@Injectable()
export class SupabaseStorageService implements StoragePort {
  private readonly client: SupabaseClient;

  constructor(private readonly configService: ConfigService) {
    const supabaseUrl = this.configService.getOrThrow<string>('SUPABASE_URL');
    const supabaseKey = this.configService.getOrThrow<string>('SUPABASE_KEY');
    this.client = createClient(supabaseUrl, supabaseKey);
  }

  async upload(
    bucket: string,
    path: string,
    file: Buffer,
    mimeType: string,
  ): Promise<string> {
    try {
      const { error } = await this.client.storage
        .from(bucket)
        .upload(path, file, {
          contentType: mimeType,
          upsert: true,
        });

      if (error) {
        throw new StorageUploadError(error.message);
      }

      const { data: publicUrlData } = this.client.storage
        .from(bucket)
        .getPublicUrl(path);

      return publicUrlData.publicUrl;
    } catch (error) {
      if (error instanceof StorageUploadError) {
        throw error;
      }
      throw new StorageUploadError(
        error instanceof Error ? error.message : 'Unknown upload error',
      );
    }
  }

  async delete(bucket: string, path: string): Promise<void> {
    try {
      const { error } = await this.client.storage.from(bucket).remove([path]);

      if (error) {
        throw new StorageDeleteError(error.message);
      }
    } catch (error) {
      if (error instanceof StorageDeleteError) {
        throw error;
      }
      throw new StorageDeleteError(
        error instanceof Error ? error.message : 'Unknown delete error',
      );
    }
  }
}

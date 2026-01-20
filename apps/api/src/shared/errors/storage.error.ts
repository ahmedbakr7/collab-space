import { AppError } from '../app.error';

export class StorageUploadError extends AppError {
  public readonly code = 'STORAGE_UPLOAD_ERROR';

  constructor(message: string = 'Failed to upload file to storage') {
    super(message);
  }
}

export class StorageDeleteError extends AppError {
  public readonly code = 'STORAGE_DELETE_ERROR';

  constructor(message: string = 'Failed to delete file from storage') {
    super(message);
  }
}

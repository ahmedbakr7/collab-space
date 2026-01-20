export abstract class StoragePort {
  /**
   * Uploads a file to the storage bucket.
   * @param bucket The name of the storage bucket
   * @param path The path where the file should be saved (including filename)
   * @param file The file buffer
   * @param mimeType The MIME type of the file
   * @returns The public URL or path of the uploaded file
   */
  abstract upload(
    bucket: string,
    path: string,
    file: Buffer,
    mimeType: string,
  ): Promise<string>;

  /**
   * Deletes a file from the storage bucket.
   * @param bucket The name of the storage bucket
   * @param path The path of the file to delete
   */
  abstract delete(bucket: string, path: string): Promise<void>;
}

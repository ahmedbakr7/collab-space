export class Attachment {
  constructor(
    public readonly id: string,
    public readonly taskId: string,
    public readonly uploadedById: string,
    public readonly fileName: string,
    public readonly fileType: string,
    public readonly fileSize: number,
    public readonly url: string | null,
    public readonly createdAt: Date,
  ) {}
}

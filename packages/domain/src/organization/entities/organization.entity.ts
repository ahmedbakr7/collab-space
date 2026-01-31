export enum Visibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export class Organization {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly visibility: Visibility,
    public readonly members: string[], // User IDs
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}

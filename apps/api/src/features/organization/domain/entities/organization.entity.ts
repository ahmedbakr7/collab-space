export enum Visibility {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

export class Organization {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly slug: string,
    public readonly description: string,
    public readonly visibility: Visibility,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}

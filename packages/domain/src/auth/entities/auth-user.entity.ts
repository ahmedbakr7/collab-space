export class AuthUser {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly emailConfirmed: boolean,
    public readonly name?: string,
    public readonly avatarUrl?: string,
    public readonly metadata: Record<string, any> = {},
  ) {}
}

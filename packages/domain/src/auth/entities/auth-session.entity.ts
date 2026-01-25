export class AuthSession {
  constructor(
    public readonly accessToken: string,
    public readonly refreshToken: string,
    public readonly expiresIn: number,
    public readonly tokenType: string,
  ) {}
}

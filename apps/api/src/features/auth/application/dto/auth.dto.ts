export class RegisterUserDto {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly name?: string,
    public readonly avatar?: string,
    public readonly data?: Record<string, any>,
  ) {}
}

export class LoginUserDto {
  constructor(
    public readonly email: string,
    public readonly password: string,
  ) {}
}

export class LogoutUserDto {
  constructor(public readonly accessToken: string) {}
}

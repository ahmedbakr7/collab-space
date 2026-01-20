export abstract class AppError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class AuthError extends AppError {
  constructor(message: string) {
    super(message);
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor() {
    super('Invalid credentials');
  }
}

export class UserAlreadyExistsError extends AuthError {
  constructor(email: string) {
    super(`User with email ${email} already exists`);
  }
}

export class AuthProviderError extends AuthError {
  constructor(message: string) {
    super(`Authentication provider error: ${message}`);
  }
}

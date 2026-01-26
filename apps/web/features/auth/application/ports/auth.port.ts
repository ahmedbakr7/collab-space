export interface AuthPort {
  login(email: string, password: string): Promise<void>;
  signup(
    email: string,
    password: string,
    data?: Record<string, any>,
  ): Promise<void>;
  logout(): Promise<void>;
  getUser(): Promise<any>;
}

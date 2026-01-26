export interface AuthPort {
  login(email: string, password: string): Promise<void>;
}

export interface AuthPort {
  login(email: string, password: string): Promise<void>;
  signup(params: {
    email: string;
    password: string;
    full_name?: string;
    company?: string;
    avatarUrl?: string;
  }): Promise<void>;
  logout(): Promise<void>;
  getUser(): Promise<any>;
}

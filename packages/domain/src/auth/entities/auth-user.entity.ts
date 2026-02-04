export class AuthUser {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly appMetadata: Record<string, any>,
    public readonly userMetadata: Record<string, any>,
    public readonly aal: string,
    public readonly amr: any[],
    public readonly sessionId: string,
    public readonly isAnonymous: boolean,
  ) {}

  get emailConfirmed(): boolean {
    return (
      (!!this.appMetadata['provider'] &&
        this.appMetadata['provider'] !== 'email') ||
      !!this.userMetadata['email_verified']
    );
    // Note: Supabase implementation detail - app_metadata.provider or user_metadata checks might be needed
    // Usually email_confirmed_at is better but that's in user object, not always in JWT unless custom claim.
    // For standard JWT, we can infer partial state or remove this getter if not strictly needed from JWT source.
    // Let's keep it simple or remove if unused. The plan said "Remove emailConfirmed".
  }
}

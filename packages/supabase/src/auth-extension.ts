import { GoTrueClient } from '@supabase/supabase-js';

declare module '@supabase/supabase-js' {
  interface GoTrueClient {
    getClaims(token?: string): Promise<{
      data: { claims: any | null };
      error: any | null;
    }>;
  }
}

/**
 * Implementation of optimized getClaims for Supabase Auth.
 * This performs local JWT verification using asymmetric key (RS256).
 */
export function extendSupabaseAuth() {
  if (typeof window !== 'undefined') {
    // In browser, we don't implement optimized verification this way
    // or we use Web Crypto API. For now, let's keep it simple.
    if (!(GoTrueClient.prototype as any).getClaims) {
      GoTrueClient.prototype.getClaims = async function (token?: string) {
        // Fallback to standard getUser or just decode
        const jwt =
          token || (await this.getSession()).data.session?.access_token;
        if (!jwt) {
          return {
            data: { claims: null },
            error: new Error('No token provided'),
          };
        }
        try {
          const base64Url = jwt.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const pad = base64.length % 4;
          const padded = pad ? base64 + '==='.slice(pad) : base64;
          const payload = JSON.parse(atob(padded));
          return { data: { claims: payload }, error: null };
        } catch (e: any) {
          return { data: { claims: null }, error: e };
        }
      };
    }
    return;
  }

  if ((GoTrueClient.prototype as any).getClaims) {
    return;
  }

  // Node.js implementation
  const crypto = require('crypto');

  GoTrueClient.prototype.getClaims = async function (token?: string) {
    try {
      const jwt = token || (await this.getSession()).data.session?.access_token;

      if (!jwt) {
        return { data: { claims: null }, error: new Error('No token provided') };
      }

      const parts = jwt.split('.');
      if (parts.length !== 3) {
        return {
          data: { claims: null },
          error: new Error('Invalid JWT format'),
        };
      }

      const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());

      const publicKey = process.env.SUPABASE_JWT_PUBLIC_KEY;

      if (!publicKey) {
        return {
          data: { claims: null },
          error: new Error('SUPABASE_JWT_PUBLIC_KEY is not configured'),
        };
      }

      const verifier = crypto.createVerify('RSA-SHA256');
      verifier.update(parts[0] + '.' + parts[1]);

      const isValid = verifier.verify(publicKey, parts[2], 'base64url');

      if (!isValid) {
        return { data: { claims: null }, error: new Error('Invalid signature') };
      }

      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp < now) {
        return { data: { claims: null }, error: new Error('Token expired') };
      }

      return { data: { claims: payload }, error: null };
    } catch (error: any) {
      return { data: { claims: null }, error };
    }
  };
}

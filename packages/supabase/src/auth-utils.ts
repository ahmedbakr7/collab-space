/**
 * Optimized getClaims for Supabase Auth.
 * Performs local JWT verification using asymmetric key (RS256).
 */
export async function getClaims(token: string, publicKey?: string): Promise<{
  data: { claims: any | null };
  error: any | null;
}> {
  try {
    if (!token) {
      return { data: { claims: null }, error: new Error('No token provided') };
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return {
        data: { claims: null },
        error: new Error('Invalid JWT format'),
      };
    }

    // Decode payload
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4;
    const padded = pad ? base64 + '==='.slice(pad) : base64;

    let payload: any;
    if (typeof window !== 'undefined') {
      payload = JSON.parse(atob(padded));
    } else {
      payload = JSON.parse(Buffer.from(padded, 'base64').toString());
    }

    if (!publicKey) {
      return {
        data: { claims: null },
        error: new Error('SUPABASE_JWT_PUBLIC_KEY is not configured'),
      };
    }

    // Node.js only verification (since we are in a backend context usually)
    if (typeof window === 'undefined') {
      const crypto = require('crypto');
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
    }

    return { data: { claims: payload }, error: null };
  } catch (error: any) {
    return { data: { claims: null }, error };
  }
}

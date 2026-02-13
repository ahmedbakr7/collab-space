import jwksClient from 'jwks-rsa';
import { Request } from 'express';

export function createJwksSecretProvider(supabaseUrl: string) {
  const jwksUri = `${supabaseUrl}/auth/v1/.well-known/jwks.json`;

  const client = jwksClient({
    jwksUri,
    cache: true,
    cacheMaxAge: 36000000, // 10 hours in milliseconds
    rateLimit: true,
    jwksRequestsPerMinute: 10,
  });

  /**
   * secretOrKeyProvider function compatible with passport-jwt.
   * Dynamically retrieves the signing key based on the JWT's kid (key ID).
   */
  return (
    request: Request,
    rawJwtToken: string,
    done: (err: any, secretOrKey?: string) => void,
  ) => {
    // Decode the JWT header to get the kid (key ID)
    const header = JSON.parse(
      Buffer.from(rawJwtToken.split('.')[0], 'base64').toString('utf-8'),
    );

    if (!header.kid) {
      return done(new Error('JWT header missing kid (key ID)'));
    }

    // Fetch the signing key from JWKS endpoint
    client.getSigningKey(header.kid, (err, key) => {
      if (err) {
        return done(err);
      }

      const signingKey = key?.getPublicKey();
      done(null, signingKey);
    });
  };
}

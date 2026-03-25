import { auth } from 'express-oauth2-jwt-bearer';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Authorization middleware.
 * Verifies the Access Token against the Auth0 JSON Web Key Set.
 */
export const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE || 'https://sua-api.com',
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: 'RS256'
});

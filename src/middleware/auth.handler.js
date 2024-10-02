const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const { AUTH0_AUDIENCE, AUTH0_ISSUER_BASE_URL } = require('../../config');
const checkScopes = (scopes) => requiredScopes(scopes.split(' '));
const auth0Check = auth({
  audience: AUTH0_AUDIENCE,
  issuerBaseURL: AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256',
});

module.exports = {
  auth0Check,
  checkScopes,
};

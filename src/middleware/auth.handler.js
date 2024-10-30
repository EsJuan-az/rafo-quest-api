const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const { AUTH0_AUDIENCE, AUTH0_ISSUER_BASE_URL } = require('../../config');
const UserService = require('../services/user.service');
const checkScopes = (scopes) => requiredScopes(scopes.split(' '));
const auth0Check = auth({
  audience: AUTH0_AUDIENCE,
  issuerBaseURL: AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256',
});

// Middleware combinado
const auth0AndAddUser = async (req, res, next) => {
  // Ejecuta el middleware `auth0Check` primero
  auth0Check(req, res, async (err) => {
    if (err) {
      return res.status(err.status).json({ error: err.message });
    }

    try {
      // Extraer el auth0Id del token
      const auth0Id = req.auth.payload.sub;

      // Buscar o crear el usuario en la base de datos
      const user = await UserService.findOrCreateByAuth0Id(auth0Id);

      // Añadir el usuario al objeto req
      req.user = user;

      // Continuar al siguiente middleware/controlador
      next();
    } catch (error) {
      next(error);
    }
  });
};

module.exports = {
  auth0Check,
  auth0AndAddUser,
  checkScopes,
};

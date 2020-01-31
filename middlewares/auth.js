/* jshint esversion: 6 */
// importamos librerías
var jwt = require('jsonwebtoken');

// Clave única para generar token
var SEED = require('../config/config').SEED;

// Verifica token
exports.tokenVerification = function (req, res, next) {
    var token = req.query.token;
    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                message: 'Usuario no autorizado',
                errors: err
            });
        }
        // Información del usuario que se ha logueado y que podremos ver en cualquier método
        // que utilice el middleware de auth
        req.user = decoded.user;
        next();
    });
};

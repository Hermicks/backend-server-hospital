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
            return res.status(401).send({
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

// Verifica si es ADMIN_ROLE
exports.adminVerification = function (req, res, next) {
    // Recogemos el usuario que hemos creado previamente con la verificación del token
    var user = req.user;
    if (user.role === 'ADMIN_ROLE') {
        next();
    } else {
        return res.status(401).send({
            ok: false,
            message: 'Rol incorrecto',
            errors: {
                message: 'No es un administrador. No puede realizar acción'
            }
        });
    }
};

// Verifica si el usuario es ADMIN_ROLE o de si es el mismo usuario contra el que realiza la acción
exports.adminOrSameUserVerification = function (req, res, next) {
    var user = req.user;
    var id = req.params.id;
    if (user.role === 'ADMIN_ROLE' || user._id === id) {
        next();
    } else {
        return res.status(401).send({
            ok: false,
            message: 'Rol incorrecto - No es el mismo usuario',
            errors: {
                message: 'No es un administrador. No puede realizar acción'
            }
        });
    }

};

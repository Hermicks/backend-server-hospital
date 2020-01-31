/*jshint esversion: 6 */
// Importamos librerías
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Importamos modelos
var User = require('../models/usuario-model');

// Clave única para generar token
var SEED = require('../config/config').SEED;

var loginController = {
    login: function (req, res) {
        var body = req.body;
        User.findOne({ email: body.email }, (err, userDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error al buscar usuarios',
                    errors: err
                });
            }
            if (userDB) {
                if (bcrypt.compareSync(body.password, userDB.password)) {
                    // Generación de un token válido
                    userDB.password = ':)';
                    var token = jwt.sign({ user: userDB }, SEED, { expiresIn: 14400 }); // 4 horas en milliseconds
                    return res.status(200).json({
                        ok: true,
                        message: 'Login realizado correctamente',
                        id: userDB._id,
                        token: token,
                        userDB: userDB
                    });
                } else {
                    return res.status(400).json({
                        ok: false,
                        message: 'Credenciales incorrectas - password',
                        errors: err
                    });
                }
            } else {
                return res.status(400).json({
                    ok: false,
                    message: 'Credenciales incorrectas - email',
                    errors: err
                });
            }
        });
    }
};

module.exports = loginController;
/*jshint esversion: 8 */
// Importamos librerías
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Clave única para generar token
var SEED = require('../config/config').SEED;

// Client ID Google
var CLIENT_ID = require('../config/config').CLIENT_ID;

// Google
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

// Importamos modelos
var User = require('../models/usuario-model');

// Verify
// Async: Se aplica a una función que devuelve una promesa
// Await: Espera a que se realice una promesa
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    return {
        name: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true,
        payload: payload
    };
}

var loginController = {
    // Login estándar
    login: function (req, res) {
        var body = req.body;
        User.findOne({ email: body.email }, (err, userDB) => {
            if (err) {
                return res.status(500).send({
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
                    return res.status(200).send({
                        ok: true,
                        message: 'Login realizado correctamente',
                        id: userDB._id,
                        token: token,
                        userDB: userDB,
                        menu: getMenu(userDB.role)
                    });
                } else {
                    return res.status(400).send({
                        ok: false,
                        message: 'Credenciales incorrectas - password',
                        errors: err
                    });
                }
            } else {
                return res.status(400).send({
                    ok: false,
                    message: 'Credenciales incorrectas - email',
                    errors: err
                });
            }
        });
    },
    // Login por Google
    loginGoogle: async function (req, res) {
        var token = req.body.token;
        var googleUser =
            await verify(token)
                .catch((err) => {
                    return res.status(403).send({
                        ok: false,
                        message: 'Token de Google no válido',
                        errors: err
                    });
                });
        User.findOne({ email: googleUser.email }, (err, userDB) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'Error al buscar usuarios',
                    errors: err
                });
            }
            if (userDB) {
                if (!userDB.google) {
                    return res.status(400).send({
                        ok: false,
                        message: 'Debe de usar su autenticación normal'
                    });
                } else {
                    var token = jwt.sign({ user: userDB }, SEED, { expiresIn: 14400 });
                    // Sino hay errores, devolvemos el usuario ya existente
                    return res.status(200).send({
                        ok: true,
                        message: 'Login por Google de usuario ya existente',
                        id: userDB._id,
                        googleUser: userDB,
                        token: token,
                        menu: getMenu(userDB.role)
                    });
                }
            } else {
                // El usuario no existe, por lo que hay que crearlo
                var user = new User({
                    nombre: googleUser.name,
                    email: googleUser.email,
                    img: googleUser.img,
                    google: googleUser.google,
                    password: ':)'
                });
                user.save((err, googleUserStored) => {
                    if (err) {
                        return res.status(500).send({
                            ok: false,
                            message: 'Error al guardar usuario de Google',
                            errors: err
                        });
                    }
                    var token = jwt.sign({ user: userDB }, SEED, { expiresIn: 14400 });
                    // Sino hay errores, devolvemos el usuario que hemos creado
                    return res.status(200).send({
                        ok: true,
                        message: 'Login por Google de nuevo usuario',
                        id: googleUserStored._id,
                        googleUser: googleUserStored,
                        token: token,
                        menu: getMenu(googleUserStored.role)
                    });
                });
            }
        });



    },
    // Renovación de token
    renewToken: function (req, res) {
        // Generamos un nuevo token
        var token = jwt.sign({ user: req.user }, SEED, { expiresIn: 14400 });
        return res.status(200).send({
            ok: true,
            token: token
        });
    }
};

function getMenu(ROLE) {
    var menu = [
        {
            title: 'Principal',
            icon: 'mdi mdi-gauge',
            submenu: [
                { title: 'Dashboard', url: '/dashboard' },
                { title: 'ProgressBar', url: '/progress' },
                { title: 'Gráficas', url: '/graficas1' },
                { title: 'Promesas', url: '/promesas' },
                { title: 'RXJS', url: '/rxjs' }
            ]
        },
        {
            title: 'Mantenimiento',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                { title: 'Médicos', url: '/medicos' },
                { title: 'Hospitales', url: '/hospitales' }
            ]
        }
    ];
    if (ROLE === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ title: 'Usuarios', url: '/usuarios' });
    }
    return menu;
}

module.exports = loginController;
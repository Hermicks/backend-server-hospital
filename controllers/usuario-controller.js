/*jshint esversion: 6 */
// importamos librerías
var bcrypt = require('bcryptjs');

// Importamos modelo de Usuario
var User = require('../models/usuario-model');

var userController = {
    // Obtener todos los usuarios
    getUsers: function (req, res) {
        User.find({}, 'nombre email img role')
            .exec((err, users) => {
                if (err) {
                    return res.status(500).send({
                        ok: false,
                        message: 'Error en BBDD',
                        errors: err
                    });
                }
                res.status(200).send({
                    ok: true,
                    message: 'Petición de usuarios',
                    users: users
                });
            });
    },
    // Crear un nuevo usuario
    postUser: function (req, res) {
        var body = req.body;
        var user = new User({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            img: body.img,
            role: body.role
        });
        user.save((err, userStored) => {
            if (err) {
                return res.status(400).send({
                    ok: false,
                    message: 'Error al crear usuario',
                    errors: err
                });
            }
            res.status(201).send({
                ok: true,
                message: 'User created',
                userStored: userStored,
                userToken: req.user
            });
        });
    },
    // Actualizar un usuario
    putUser: function (req, res) {
        var id = req.params.id;
        var body = req.body;
        User.findById(id, (err, user) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'Error al buscar usuario',
                    errors: err
                });
            }
            if (user) {
                user.nombre = body.nombre;
                user.email = body.email;
                user.role = body.role;
                user.save((err, userUpdated) => {
                    if (err) {
                        return res.status(400).send({
                            ok: false,
                            message: 'Error al actualizar usuario',
                            errors: err
                        });
                    }
                    user.password = ':)';
                    res.status(200).send({
                        ok: true,
                        message: 'User updated',
                        userUpdated: userUpdated,
                        userToken: req.user
                    });
                });
            } else {
                return res.status(400).send({
                    ok: false,
                    message: 'Error al buscar usuario ' + id,
                    errors: err
                });
            }
        });
    },
    // Eliminar un usuario
    deleteUser: function (req, res) {
        var id = req.params.id;
        User.findByIdAndRemove(id, (err, userDeleted) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'Error al borrar usuario',
                    errors: err
                });
            }
            if (userDeleted) {
                return res.status(200).send({
                    ok: true,
                    userDeleted: userDeleted,
                    userToken: req.user
                });
            } else {
                return res.status(400).send({
                    ok: false,
                    message: 'Error al borrar el usuario ' + id
                });
            }
        });
    }

};

// Exporto el controlador de Usuario
module.exports = userController;
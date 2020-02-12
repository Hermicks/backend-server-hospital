/*jshint esversion: 6 */
// Importamos express
var express = require('express');

// Inicializamos la variables
var userRoutes = express.Router();

// Importamos el controller de user
var UserController = require('../controllers/usuario-controller');

// Verificación de token
var mdAuth = require('../middlewares/auth');

/*  ============================
    Listado de rutas y servicios
    ============================ */
// Obtención de todos los usuarios
userRoutes.get('/usuario', UserController.getUsers);
// Creación de un nuevo usuario
userRoutes.post('/usuario', UserController.postUser);
// Actuzalizar un usuario
userRoutes.put('/usuario/:id', mdAuth.tokenVerification, UserController.putUser);
// Borrar un usuario
userRoutes.delete('/usuario/:id', mdAuth.tokenVerification, UserController.deleteUser);

// Exportamos el módulo de rutas de User
module.exports = userRoutes;
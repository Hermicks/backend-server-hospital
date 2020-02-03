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
userRoutes.get('/', UserController.getUsers);
// Creación de un nuevo usuario
userRoutes.post('/', mdAuth.tokenVerification, UserController.postUser);
// Actuzalizar un usuario
userRoutes.put('/:id', mdAuth.tokenVerification, UserController.putUser);
// Borrar un usuario
userRoutes.delete('/:id', mdAuth.tokenVerification, UserController.deleteUser);

// Exportamos el módulo de rutas de User
module.exports = userRoutes;
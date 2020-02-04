/*jshint esversion: 6 */
// Importamos express
var express = require('express');

// Inicializamos la variables
var loginRoutes = express.Router();

// Importamos el controlador de login
var LoginController = require('../controllers/login-controller');

/* ============================
    Listado de rutas y servicios
 ============================ */
// Login de usuario
loginRoutes.post('/login', LoginController.login);
// Login de usuario por Google
loginRoutes.post('/login/google', LoginController.loginGoogle);

// Exportamos el módulo de rutas de Login
module.exports = loginRoutes;
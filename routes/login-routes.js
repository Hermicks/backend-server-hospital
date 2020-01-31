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
loginRoutes.post('/', LoginController.login);

// Exportamos el módulo de rutas de Login
module.exports = loginRoutes;
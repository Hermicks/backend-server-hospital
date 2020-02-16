/*jshint esversion: 6 */
// Importamos express
var express = require('express');

// Inicializamos la variables
var loginRoutes = express.Router();

// Importamos el controlador de login
var LoginController = require('../controllers/login-controller');

// Verificador de token
var mdAuth = require('../middlewares/auth');

/* ============================
    Listado de rutas y servicios
 ============================ */
// Login de usuario
loginRoutes.post('/login', LoginController.login);
// Login de usuario por Google
loginRoutes.post('/login/google', LoginController.loginGoogle);
// Renovación de token
loginRoutes.get('/login/renewToken', mdAuth.tokenVerification, LoginController.renewToken);

// Exportamos el módulo de rutas de Login
module.exports = loginRoutes;
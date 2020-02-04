/*jshint esversion: 6 */
// Importamos express
var express = require('express');

// Inicializamos la variable
var imgRoutes = express.Router();

// Importamos el controlador de Img
var ImgController = require('../controllers/img-controller');

/*  ============================
    Listado de rutas y servicios
    ============================ */
// Recuperar una imagen
imgRoutes.get('/image/:type/:img', ImgController.getImage);

// Exportar el módulo con las rutas de Upload
module.exports = imgRoutes;
/*jshint esversion: 6 */
// Importamos librerías
var express = require('express');
var fileupload = require('express-fileupload');

// Inicializamos la variable
var uploadRoutes = express.Router();

// Default options
uploadRoutes.use(fileupload());

// Importamos el controlador de Upload
var UploadController = require('../controllers/upload-controller');

/*  ============================
Listado de rutas y servicios
============================ */
// Subir y actualizar una imagen
uploadRoutes.put('/upload/:type/:id', UploadController.putImage);

// Exportamos el módulo con las rutas de Upload
module.exports = uploadRoutes;
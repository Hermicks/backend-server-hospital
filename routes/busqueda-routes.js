/*jshint esversion: 6 */
// Importamos express
var express = require('express');

// Inicializamos la variable
var busquedaRoutes = express.Router();

// Importamos el controlador de búsqueda
var BusquedaController = require('../controllers/busqueda-controller');

/*  ============================
    Listado de rutas y servicios
    ============================ */
// Búsqueda genérica
busquedaRoutes.get('/busqueda/all/:where', BusquedaController.getGenericSearch);
// Búsqueda por colección
busquedaRoutes.get('/busqueda/coleccion/:collection/:where', BusquedaController.getSpecificSearch);

module.exports = busquedaRoutes;
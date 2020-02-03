/*jshint esversion: 6 */
// Importamos express
var express = require('express');

// Inicializamos la variables
var hospitalRoutes = express.Router();

// Importamos el controlador de hospital
var hospitalController = require('../controllers/hospital-controller');

// Verificación de token
var mdAuth = require('../middlewares/auth');

/*  ============================
Listado de rutas y servicios
============================ */
// Obtención de todos los hospitales
hospitalRoutes.get('/', hospitalController.getHospitals);
// Creación de un hospital
hospitalRoutes.post('/', mdAuth.tokenVerification, hospitalController.postHospital);
// Actualizar un hospital
hospitalRoutes.put('/:id', mdAuth.tokenVerification, hospitalController.putHospital);
// Eliminar un hospital
hospitalRoutes.delete('/:id', mdAuth.tokenVerification, hospitalController.deleteHospital);


// Exportamos el módulo de rutas de Hospital
module.exports = hospitalRoutes;
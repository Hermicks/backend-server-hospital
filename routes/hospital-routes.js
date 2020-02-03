/*jshint esversion: 6 */
// Importamos express
var express = require('express');

// Inicializamos la variables
var hospitalRoutes = express.Router();

// Importamos el controlador de hospital
var HospitalController = require('../controllers/hospital-controller');

// Verificación de token
var mdAuth = require('../middlewares/auth');

/*  ============================
Listado de rutas y servicios
============================ */
// Obtención de todos los hospitales
hospitalRoutes.get('/hospital', HospitalController.getHospitals);
// Creación de un hospital
hospitalRoutes.post('/hospital', mdAuth.tokenVerification, HospitalController.postHospital);
// Actualizar un hospital
hospitalRoutes.put('/hospital/:id', mdAuth.tokenVerification, HospitalController.putHospital);
// Eliminar un hospital
hospitalRoutes.delete('/hospital/:id', mdAuth.tokenVerification, HospitalController.deleteHospital);


// Exportamos el módulo de rutas de Hospital
module.exports = hospitalRoutes;
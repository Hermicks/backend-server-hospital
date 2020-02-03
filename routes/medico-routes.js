/*jshint esversion: 6 */
// Importamos express
var express = require('express');

// Inicializamos la variable
var medicoRoutes = express.Router();

// Importamos el controlador de Médico
var MedicoController = require('../controllers/medico-controller');

// Verificación de token
var mdAuth = require('../middlewares/auth');

/*  ============================
Listado de rutas y servicios
============================ */
// Obtención de todos los médicos
medicoRoutes.get('/medico', MedicoController.getDoctors);
// Creación de un médico
medicoRoutes.post('/medico/:id', mdAuth.tokenVerification, MedicoController.postDoctor);
// Actualización de un médico
medicoRoutes.put('/medico/:id', mdAuth.tokenVerification, MedicoController.putDoctor);
// Eliminación de un médico
medicoRoutes.delete('/medico/:id', mdAuth.tokenVerification, MedicoController.deleteDoctor);

// Exportamos el módulo con las rutas de Médico
module.exports = medicoRoutes;
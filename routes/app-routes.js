/*jshint esversion: 6 */
// Importamos express
var express = require('express');

// Inicializamos la variables
var appRoutes = express();

appRoutes.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'Petición realizada correctamente'
    });
});

module.exports = appRoutes;
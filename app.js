/*jshint esversion: 6 */
// Requires
var express = require('express');
var mongoose = require('mongoose');

// Inicializamos las variables
var app = express();

// Conexión a BBDD
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;
    console.log('BBDD online!');
});

// Rutas
app.get('/', (req, res) => {
    res.status(200).json({
        ok: true,
        message: 'Petición realizada correctamente'
    });
});

// Escuchamos peticiones
app.listen(3000, () => {
    // Cambiamos el color de la palabra 'online'
    console.log('Express server corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 'online!');
});
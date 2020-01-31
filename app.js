/*jshint esversion: 6 */
// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializamos las variables
var app = express();

// Body Parser
// Parse application/x-www-form-urlencoded && Parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importamos rutas
var appRoutes = require('./routes/app-routes');
var userRoutes = require('./routes/usuario-routes');
var loginRoutes = require('./routes/login-routes');

// Conexión a BBDD
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
    if (err) throw err;
    console.log('BBDD online!');
});

/**
 * Rutas principales de la aplicación
 */
// Ruta de carga principal
app.use('/', appRoutes);
// Ruta de controlador de usuarios
app.use('/usuario', userRoutes);
// Ruta de controlador de login
app.use('/login', loginRoutes);

// Escuchamos peticiones
app.listen(3000, () => {
    // Cambiamos el color de la palabra 'online'
    console.log('Express server corriendo en el puerto 3000: \x1b[32m%s\x1b[0m', 'online!');
});
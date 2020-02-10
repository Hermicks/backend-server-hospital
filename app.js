/*jshint esversion: 6 */
// Requires
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// Inicializamos las variables
var app = express();

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// Body Parser
// Parse application/x-www-form-urlencoded && Parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importamos rutas
var appRoutes = require("./routes/app-routes");
var userRoutes = require("./routes/usuario-routes");
var loginRoutes = require("./routes/login-routes");
var hospitalRoutes = require("./routes/hospital-routes");
var medicoRoutes = require("./routes/medico-routes");
var busquedaRoutes = require("./routes/busqueda-routes");
var uploadRoutes = require("./routes/upload-routes");
var imgRoutes = require("./routes/img-routes");

// Conexión a BBDD
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
};
mongoose.connect("mongodb://localhost:27017/hospitalDB", options).then(() => {
  console.log("BBDD online!");
});

// Serve Index config
var serveIndex = require("serve-index");
app.use(express.static(__dirname + "/"));
app.use("/uploads", serveIndex(__dirname + "/uploads"));

/**
 * Rutas principales de la aplicación
 */
app.use("/api", [
  appRoutes,
  loginRoutes,
  userRoutes,
  hospitalRoutes,
  medicoRoutes,
  busquedaRoutes,
  uploadRoutes,
  imgRoutes
]);

// Escuchamos peticiones
app.listen(3000, () => {
  // Cambiamos el color de la palabra 'online'
  console.log(
    "Express server corriendo en el puerto 3000: \x1b[32m%s\x1b[0m",
    "online!"
  );
});

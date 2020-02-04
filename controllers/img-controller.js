/*jshint esversion: 6 */
// Importamos librerías
const path = require('path');
const fs = require('fs');

var imgController = {
    getImage: function(req, res) {
        var type = req.params.type;
        var img = req.params.img;
        // __dirname -> string que contiene la ruta actual donde nos encontramos
        var pathImg =  path.resolve(__dirname, `../uploads/${ type }/${ img }`);
        // Comprobamos si existe para madnar la imagen
        if (fs.existsSync(pathImg)) {
            res.sendFile(pathImg);
        } else {
            var pathNoImg = path.resolve(__dirname, '../assets/img/no-img.jpg');
            res.sendFile(pathNoImg);
        }
    }
};

// Exportamos el controller de Img
module.exports = imgController;
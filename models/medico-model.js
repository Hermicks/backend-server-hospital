// Importamos mongoose
var mongoose = require('mongoose');

// Inicializamos el esquema
var Schema = mongoose.Schema;

var medicoSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
    usuario: { type: Schema.ObjectId, ref: 'Usuario', required: true },
    hospital: { type: Schema.ObjectId, ref: 'Hospital', required: [true, 'El id del hospital es un campo obligatorio'] },
});

module.exports = mongoose.model('Medico', medicoSchema);
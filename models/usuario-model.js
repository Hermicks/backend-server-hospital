// Importamos mongoose y validator
var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

// Inicializamos el esquema
var Schema = mongoose.Schema;

// Allowed Roles
var allowedRoles = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} is not allowed'
};

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'Name is required'] },
    email: { type: String, unique: true, required: [true, 'Email is required'] },
    password: { type: String, required: [true, 'Password is required'] },
    img: { type: String, required: [false, 'Img is not required'] },
    role: { type: String, required: [true, 'Role is required'], default: 'USER_ROLE', enum: allowedRoles }
});

// Implementamos el validator único
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Usuario', usuarioSchema);
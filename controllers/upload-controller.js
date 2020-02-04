/*jshint esversion: 6 */
// Importamos librerías
var fs = require('fs');

// Importamos modelos
var Usuario = require('../models/usuario-model');
var Medico = require('../models/medico-model');
var Hospital = require('../models/hospital-model');

var uploadController = {
    putImage: function (req, res) {
        // Obtener datos de URL
        var type = req.params.type;
        var id = req.params.id;
        // Obtener nombre del archivo
        var file = req.files.imagen;
        var splitFileName = file.name.split('.');
        var fileExtension = splitFileName[splitFileName.length - 1];
        // Extensiones aceptada
        var extensionsAllowed = ['png', 'jpg', 'gif', 'jpeg'];
        // Tipos aceptados
        var typesAllowed = ['hospitales', 'medicos', 'usuarios'];
        if (!req.files) {
            return res.status(400).send({
                ok: false,
                message: 'Nada seleccionado',
                errors: { message: 'Debe seleccionar una imagen' }
            });
        }
        if (extensionsAllowed.indexOf(fileExtension) < 0) {
            return res.status(400).send({
                ok: false,
                message: 'Extensión no válida',
                errors: { message: 'Las extensiones válidas son ' + extensionsAllowed.join(', ') }
            });
        }
        if (typesAllowed.indexOf(type) < 0) {
            return res.status(400).send({
                ok: false,
                message: 'Tipo no válido',
                errors: { message: 'Los tipos válidos son ' + typesAllowed.join(', ') }
            });
        }
        // Nombre archivo personalizado -> ID usuario + numero random + .png
        var fileName = `${id}-${new Date().getMilliseconds()}.${fileExtension}`;
        // Mover el archivo del temporal a un path
        var path = `./uploads/${type}/${fileName}`;
        file.mv(path, (err) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'Error al mover archivo',
                    errors: err
                });
            }
            uploadByType(type, id, fileName, res);
        });
    }
};

function uploadByType(type, id, fileName, res) {
    if (type === 'usuarios') {
        Usuario.findById(id, (err, user) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'Error al buscar usuario',
                    errors: err
                });
            }
            if (user) {
                var oldPath = './uploads/usuarios/' + user.img;
                // Si existe elimina la imagen anterior
                if (fs.existsSync(oldPath)) {
                    fs.unlink(oldPath, () => { });
                }
                // Guardamos el nuevo nombre de la imagen en su usuario
                user.img = fileName;
                user.save((err, userUpdated) => {
                    if (err) {
                        return res.status(500).send({
                            ok: false,
                            message: 'Error al actualizar usuario',
                            errors: err
                        });
                    }
                    userUpdated.password = ':)';
                    return res.status(200).send({
                        ok: true,
                        message: 'Imágen actualizada',
                        messageImg: 'Archivo movido a la carpeta ' + type,
                        userUpdated: userUpdated
                    });
                });
            } else {
                return res.status(404).send({
                    ok: false,
                    message: 'El usuario ' + id + 'no existe'
                });
            }
        });
    }
    if (type === 'medicos') {
        Medico.findById(id, (err, doctor) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'Error al buscar médico',
                    errors: err
                });
            }
            if (doctor) {
                var oldPath = './uploads/medicos/' + doctor.img;
                // Si existe elimina la imagen anterior
                if (fs.existsSync(oldPath)) {
                    fs.unlink(oldPath, () => { });
                }
                // Guardamos el nuevo nombre de la imagen en su médico
                doctor.img = fileName;
                doctor.save((err, doctorUpdated) => {
                    if (err) {
                        return res.status(500).send({
                            ok: false,
                            message: 'Error al actualizar médico',
                            errors: err
                        });
                    }
                    return res.status(200).send({
                        ok: true,
                        message: 'Imagen actualizada',
                        messageImg: 'Archivo movido a la carpeta ' + type,
                        doctorUpdated: doctorUpdated
                    });
                });
            } else {
                return res.status(404).send({
                    ok: false,
                    message: 'El doctor ' + id + 'no existe'
                });
            }
        });
    }
    if (type === 'hospitales') {
        Hospital.findById(id, (err, hospital) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'Error al buscar hospital',
                    errors: err
                });
            }
            if (hospital) {
                var oldPath = './uploads/hospitales/' + hospital.img;
                // Si existe elimina la imagen anterior
                if (fs.existsSync(oldPath)) {
                    fs.unlink(oldPath, () => { });
                }
                // Guardamos el nuevo nombre de la imagen en su hospital
                hospital.img = fileName;
                hospital.save((err, hospitalUpdated) => {
                    if (err) {
                        return res.status(500).send({
                            ok: false,
                            message: 'Error al actualizar hospital',
                            errors: err
                        });
                    }
                    return res.status(200).send({
                        ok: true,
                        message: 'Imagen actualizada',
                        messageImg: 'Archivo movido a la carpeta ' + type,
                        hospitalUpdated: hospitalUpdated
                    });
                });
            } else {
                return res.status(404).send({
                    ok: false,
                    message: 'El hospital ' + id + 'no existe'
                });
            }
        });
    }
}

// Exportamos el controller de Upload
module.exports = uploadController;
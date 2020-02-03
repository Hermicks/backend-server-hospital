/*jshint esversion: 6 */
// Importamos el modelo de medico
var Medico = require('../models/medico-model');

var medicoController = {
    // Obtenemos todos los médicos
    getDoctors: function (req, res) {
        Medico.find({})
            .exec((err, doctors) => {
                if (err) {
                    return res.status(500).send({
                        ok: false,
                        message: 'Error al obtener listado de médicos',
                        errors: err
                    });
                }
                return res.status(200).send({
                    ok: true,
                    message: 'Listado de médicos',
                    doctors: doctors
                });
            });
    },
    // Generamos un nuevo médico
    postDoctor: function (req, res) {
        var body = req.body;
        var userToken = req.user;
        var newDoctor = new Medico({
            nombre: body.nombre,
            img: body.img,
            usuario: userToken._id,
            hospital: body.hospital
        });
        newDoctor.save((err, storedDoctor) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'Error al guardar médico',
                    errors: err
                });
            }
            return res.status(200).send({
                ok: true,
                message: 'Médico creado',
                storedDoctor: storedDoctor,
                userToken: userToken
            });
        });
    },
    // Actualizamos un médico
    putDoctor: function (req, res) {
        var id = req.params.id;
        var body = req.body;
        Medico.findById(id, (err, doctor) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'Error al buscar médico',
                    errors: err
                });
            }
            if (doctor) {
                doctor.nombre = body.nombre;
                doctor.usuario = req.user._id;
                doctor.hospital = body.hospital;
                doctor.save((err, updatedDoctor) => {
                    if (err) {
                        return res.status(500).send({
                            ok: false,
                            message: 'Error al actualizar médico',
                            errors: err
                        });
                    }
                    if (updatedDoctor) {
                        return res.status(200).send({
                            ok: true,
                            message: 'Médico actualizado',
                            updatedDoctor: updatedDoctor,
                            userToken: req.user
                        });
                    } else {
                        return res.status(404).send({
                            ok: false,
                            message: 'No existe el médico'
                        });
                    }
                });
            } else {
                return res.status(400).send({
                    ok: false,
                    message: 'No existe el médico con id ' + id
                });
            }
        });
    },
    // Borramo un médico
    deleteDoctor: function (req, res) {
        var id = req.params.id;
        Medico.findByIdAndDelete(id, (err, deletedDoctor) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'Error al eliminar médico',
                    deletedDoctor: deletedDoctor
                });
            }
            if (deletedDoctor) {
                return res.status(200).send({
                    ok: true,
                    message: 'Médido eliminado',
                    deletedDoctor: deletedDoctor,
                    userToken: req.user
                });
            } else {
                return res.status(404).send({
                    ok: false,
                    message: 'El médico no ha sido encontrado'
                });
            }
        });
    }
};

module.exports = medicoController;
/*jshint esversion: 6 */
// Importamos el modelo de Hospital
var Hospital = require('../models/hospital-model');

var hospitalController = {
    // Obtener todos los hospitales
    getHospitals: function (req, res) {
        Hospital.find({})
            .exec((err, hospitals) => {
                if (err) {
                    return res.status(500).send({
                        ok: false,
                        message: 'Error al recuperar hospitales',
                        errors: err
                    });
                }
                return res.status(200).send({
                    ok: true,
                    message: 'Listado de hospitales',
                    hospitals: hospitals
                });
            });
    },
    // Crear un nuevo hospital
    postHospital: function (req, res) {
        var body = req.body;
        var newHospital = new Hospital({
            nombre: body.nombre,
            img: body.img,
            usuario: req.user._id
        });
        newHospital.save((err, storedHospital) => {
            if (err) {
                return res.status(400).send({
                    ok: false,
                    message: 'Error creando hospital ' + newHospital.nombre,
                    errors: err
                });
            }
            return res.status(200).send({
                ok: true,
                message: 'Hospital generado',
                storedHospital: storedHospital,
                userToken: req.user
            });
        });
    },
    // Actualizar un hospital
    putHospital: function (req, res) {
        var id = req.params.id;
        var body = req.body;
        Hospital.findById(id, (err, hospital) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'Error al buscar hospital',
                    errors: err
                });
            }
            if (hospital) {
                hospital.nombre = body.nombre;
                hospital.usuario = req.user._id;
                hospital.save((err, hospitalUpdated) => {
                    if (err) {
                        return res.status(500).send({
                            ok: false,
                            message: 'Error al actualizar hospital',
                            errors: err
                        });
                    }
                    if (hospitalUpdated) {
                        return res.status(200).send({
                            ok: true,
                            message: 'Hospital actualizado',
                            hospitalUpdated: hospitalUpdated,
                            userToken: req.user
                        });
                    } else {
                        return res.status(404).send({
                            ok: false,
                            message: 'El hospital no existe',
                            errors: err
                        });
                    }
                });
            } else {
                return res.status(400).send({
                    ok: false,
                    message: 'Error al buscar el hospital ' + id,
                    errors: err
                });
            }
        });
    },
    // Eliminar un hospital
    deleteHospital: function (req, res) {
        var id = req.params.id;
        Hospital.findByIdAndDelete(id, (err, hospitalDeleted) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    message: 'Error al eliminar el hospital',
                    errors: err
                });
            }
            if (hospitalDeleted) {
                return res.status(200).send({
                    ok: true,
                    message: 'Hospital eliminado',
                    hospitalDeleted: hospitalDeleted,
                    userToken: req.user
                });
            } else {
                return res.status(400).send({
                    ok: false,
                    message: 'Error al eliminar el hospital ' + id,
                    errors: err
                });
            }
        });
    }
};

// Exportamos el controller de Hospital
module.exports = hospitalController;
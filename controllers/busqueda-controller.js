/*jshint esversion: 6 */
// Importamos modelos
var Hospital = require('../models/hospital-model');
var Medico = require('../models/medico-model');
var Usuario = require('../models/usuario-model');

var busquedaController = {
    // Búsqueda General
    getGenericSearch: function (req, res) {
        var where = req.params.where;
        // Expresión regular para buscar hospitales con la palabra que salga en el where
        // es lo mismo que poner esto -> /blablabla/i
        var regexForSearch = new RegExp(where, 'i');
        // Con Promise.all puedo realizar varias peticiones asíncronas y las gestiono con un then
        // y el catch
        Promise.all([
            searchHospitals(regexForSearch),
            searchDoctors(regexForSearch),
            searchUsers(regexForSearch)
        ])
            .then((response) => {
                return res.status(200).send({
                    ok: true,
                    hospitals: response[0],
                    doctors: response[1],
                    users: response[2]
                });
            });
    },
    // Búsqueda por colección
    getSpecificSearch: function (req, res) {
        var collection = req.params.collection;
        var where = req.params.where;
        var promise;
        var regexForSearch = new RegExp(where, 'i');
        switch (collection) {
            case 'hospital':
                promise = searchHospitals(regexForSearch);
                break;
            case 'medico':
                promise = searchDoctors(regexForSearch);
                break;
            case 'usuario':
                promise = searchUsers(regexForSearch);
                break;
            default:
                return res.status(400).send({
                    ok: false,
                    message: 'Los tipos de búsqueda no son válidos',
                    errors: { message: 'Tipo de colección no válida' }
                });
        }
        promise
        .then((response) => {
            return res.status(200).send({
                ok: true,
                [collection]: response
            });
        });
    }
};

function searchHospitals(regExp) {
    return new Promise((resolve, reject) => {
        Hospital.find({ nombre: regExp })
            .populate('usuario', 'nombre email role')
            .exec((err, hospitals) => {
                if (err) {
                    reject('Error al buscar hospitales');
                } else {
                    resolve(hospitals);
                }
            });
    });
}

function searchDoctors(regExp) {
    return new Promise((resolve, reject) => {
        Medico.find({ nombre: regExp })
            .populate('usuario', 'nombre email')
            .populate({ path: 'hospital' })
            .exec((err, doctors) => {
                if (err) {
                    reject('Error al buscar médicos');
                } else {
                    resolve(doctors);
                }
            });
    });
}

function searchUsers(regExp) {
    return new Promise((resolve, reject) => {
        Usuario.find({}, 'nombre email role')
            .or([
                { 'nombre': regExp },
                { 'email': regExp }
            ])
            .exec((err, users) => {
                if (err) {
                    reject('Error al buscar usuarios');
                } else {
                    resolve(users);
                }
            });
    });
}

module.exports = busquedaController;
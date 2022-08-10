const mongoose = require('mongoose');

var Employe = mongoose.model('Employe', {
    idUser: { type: String },
    nom: { type: String },
    prenom: { type: String },
    phone: { type: Number },
    email: { type: String }

});

module.exports = { Employe };
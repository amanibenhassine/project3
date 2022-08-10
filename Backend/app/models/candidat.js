const mongoose = require('mongoose');

var Candidat = mongoose.model('Candidat', {
   

  idUser:{
    type: Number,
    required: true

   },
  prenom: { 
    type: String,
    required: true
  },
  nom: { 
    type: String,
    required: true
  },
  dateOfBirth: { type: Date },
  phone: { type: String },
  email: { type: String },
  cin: { type: String },
  adresse: { type: String },
  ville: { type: String },
  photo : { type: String },
  password: { type: String },
  pathCv : { type: String },
  pathMotivationLetter: { type: String },
  niveauEtud: { type: String },
  titreDiplome: { type: String },
  university: { type: String },
  niveauExp: { type: String },
  experience: { type: String },
  archived : { type: String }

});

module.exports = { Candidat };
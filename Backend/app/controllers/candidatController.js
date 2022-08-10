const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Candidat } = require('../models/candidat');

router.get('/', (req, res) => {
    Candidat.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Candidats :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Candidat.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Candidat :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var emp = new Candidat({
      idUser: req.body.idUser,  
      prenom: req.body.prenom,  
      nom: req.body.nom,
      dateOfBirth: req.body.dateOfBirth,
      phone: req.body.phone,
      email: req.body.email,
      cin: req.body.cin,
      adresse: req.body.adresse,
      ville: req.body.ville,
      photo : req.body.photo,
      password: req.body.password,
      pathCv : req.body.pathCv,
      pathMotivationLetter: req.body.pathMotivationLetter,
      niveauEtud: req.body.niveauEtud,
      titreDiplome: req.body.titreDiplome,
      university: req.body.university,
      niveauExp: req.body.niveauExp,
      experience: req.body.experience,
        
    });
    emp.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Candidat Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var emp = {
  idUser: req.body.idUser, 
  prenom: req.body.prenom,  
  nom: req.body.nom,
  dateOfBirth: req.body.dateOfBirth,
  phone: req.body.phone,
  email: req.body.email,
  cin: req.body.cin,
  adresse: req.body.adresse,
  ville: req.body.ville,
  photo : req.body.photo,
  password: req.body.password,
  pathCv : req.body.pathCv,
  pathMotivationLetter: req.body.pathMotivationLetter,
  niveauEtud: req.body.niveauEtud,
  titreDiplome: req.body.titreDiplome,
  university: req.body.university,
  niveauExp: req.body.niveauExp,
  experience: req.body.experience,
    };
    Candidat.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Candidat Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Candidat.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Candidat Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;
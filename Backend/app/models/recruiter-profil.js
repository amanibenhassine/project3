var mongoose = require('mongoose');

var RecPro = new mongoose.Schema({
    rec_id: String,
    hr_id: String,
    job_id:String,
    name: String,
    poste: String,
    phone: String,
    email: String,
    address: String,

   
   

});

module.exports = mongoose.model('recProfile', RecPro);
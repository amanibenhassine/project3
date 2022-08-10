var mongoose = require('mongoose');

var Account = new mongoose.Schema({
  id: String,

});

module.exports = mongoose.model('Account', Account);
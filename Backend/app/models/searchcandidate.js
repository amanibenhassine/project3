var mongoose = require('mongoose');

var searchCandidateSchema = new mongoose.Schema({
    can_id: String, 
    firstName: String,
    status: String,
    
});

module.exports = mongoose.model('searchcandidate', searchCandidateSchema);
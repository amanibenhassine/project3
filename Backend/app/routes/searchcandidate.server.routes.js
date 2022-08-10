const express = require("express");
var mongoose = require('mongoose');

// const searchjob = require("../models/searchjob");
const searchcandidate = require("../models/job");
const app = express.Router();

app.post("", function (req, res, next) {
   
    //if 1 of conditon meet
    if (req.body.status  == '' ) {
        searchcandidate.find({ status: req.body.status }, function (err, post) {
            if (err) return next(err);
            return res.json(post);
        });
    }
  });
  module.exports = app;
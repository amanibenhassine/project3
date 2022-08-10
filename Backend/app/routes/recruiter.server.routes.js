const express = require("express");
var mongoose = require('mongoose');
const job = require("../models/job");
const candidateprofile = require("../models/cand-profile");
const app = express.Router();
const hrProfile = require("../models/hr-profile");
const canProfile = require("../models/cand-profile");
const jobFav = require("../models/job-fav");
const imgProfile = require("../models/img");
const recProfile = require("../models/recruiter-profil");
const recprofile = require("../models/recruiter-profil");

//candidate find jobs
app.post("/find_job", function (req, res, next) {
    job.find({ title: req.body.title, date: { $lt: req.body.date }, location: req.body.location}, function (err, post) {
        if (err) return next(err);
        return res.json(post);
    });
});

//candidate update profile
app.put("/:can_id", function (req, res, next) {
  recruiterprofile.updateOne(
        { can_id: req.body.can_id },
        {
            can_id: req.body.can_id,
            name: req.body.name,
            telephone: req.body.telephone,
            work_experience: req.body.work_experience,
           
        },
        function (err, result) {
            if (result.n > 0) {
                res.status(200).json({ message: "Update successful!" });
            } else {
                res.status(401).json({ message: "Not authorized!" });
            }
        });
});

//retrive default candidate profile
app.post("/get-profile", (req, res, next) => {
    // console.log(" server get can_id # is:", req.params.can_id);
    recruiterprofile.findOne({ rec_id: req.body.rec_id })
        .then(recruiter => {
            if (recruiter) {
                res.status(200).json(recruiter);
            } else {
                res.status(404).json({ message: "Account not found!" });
            }
        });
});

//candidate update profile
app.post("/update", function (req, res, next) {
    console.log("update can profile: ", req.body);
    recruiterprofile.updateOne(
        { rec_id: req.body.rec_id },
        {
            //fname: req.body.firstName,
           // lname: req.body.lastName,
          //  phone: req.body.phone,
            name: req.body.name,
            phone: req.body.telephone,
            email : req.body.email,
            address : req.body.address,

           

         
        },
        function (err, result) {
            if (err) {
                res.status(401).json({ message: "Not authorized!" });
            } else {
                res.status(200).json({ message: "Update successful!" });
            }
        });
                        
});
app.post("/view_job", function (req, res, next) {
    job.find({ rec_id: ""}, function (err, post) {
        if (err) return next(err);
        return res.json(post);
    }).sort({"candidate.rank" : 1});
});

//candidate check applied jobs
app.post("/view_job/apply-history", function (req, res, next) {
    job.find(
        { 
            rec_id: req.body.rec_id,
            candidate: { $elemMatch: { candidate_id : req.body.candidate_id } }
         }
        , function (err, post) {
        if (err) return next(err);
        return res.json(post);
    });
});

module.exports = app;
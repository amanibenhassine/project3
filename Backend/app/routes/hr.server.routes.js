const express = require("express");
var mongoose = require('mongoose');
const user= require("../models/user.model.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

const job = require("../models/job");
const hrProfile = require("../models/hr-profile");
const canProfile = require("../models/cand-profile");
const jobFav = require("../models/job-fav");
const imgProfile = require("../models/img");
const recProfile = require("../models/recruiter-profil");
const recprofile = require("../models/recruiter-profil");
const rec_id = String;
const hr_id = String;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



const app = express.Router();

//hr post job
app.post("/create_job", function (req, res, next) {
 
    job.create(req.body, function (err, post) {
        if (err) return next(err);
        return res.json(post);
    });
});

//hr check posted jobs
app.post("/posted_job", function (req, res, next) {
    job.find({ hr_id: req.body.hr_id}, function (err, post) {
        if (err) return next(err);
        return res.json(post);
    }).sort({"candidate.rank" : 1});
});

//candidate check applied jobs
app.post("/posted_job/apply-history", function (req, res, next) {
    job.find(
        { 
            hr_id: req.body.hr_id,
            candidate: { $elemMatch: { candidate_id : req.body.candidate_id } }
         }
        , function (err, post) {
        if (err) return next(err);
        return res.json(post);
    });
});
//rec check posted jobs
app.post("/posted_jobR", function (req, res, next) {
    job.find({ name: req.body.name}, function (err, post) {
        if (err) return next(err);
        return res.json(post);
    }).sort({"candidate.rank" : 1});
});

//candidate check applied jobs
app.post("/posted_job/apply-historyR", function (req, res, next) {
    job.find(
        { 
            name: req.body.name,
            candidate: { $elemMatch: { candidate_id : req.body.candidate_id } }
         }
        , function (err, post) {
        if (err) return next(err);
        return res.json(post);
    });
});

//delete a posted job
app.post("/delete_job", function (req, res, next) {
    job.deleteOne({ job_id: req.body.job_id }, function (err, post) {
        if (err) return next(err);
        return res.json(post);
    });
});

//update a posted job
app.post("/update_job", function (req, res, next) {
    job.updateOne(
        { job_id: req.body.job_id },
        {   
            hr_id : req.body.hr_id,
            company: req.body.company,
            title: req.body.title,
            startDate: req.body.startDate,
            expirationDate: req.body.expirationDate,
            jobDescription: req.body.jobDescription,
            industryType: req.body.industryType,
            jobType: req.body.jobType,
            location: req.body.location,
            candidate: req.body.candidate
        }, 
        function (err, result) {
            if (err) {
                res.status(401).json({ message: "Not authorized!" });
            } else {
                res.status(200).json({ message: "Update successful!" });
            }
        });
});

//hr delete or update posted jobs
//add it later as needed


//hr get list of candidate , return candidate array back to the front end
app.post("/candidate_list", function (req, res, next) {
    job.find({job_id: req.body.job_id}, function (err, post) {
        if (err) return next(err);
        return res.json(post);
    });
});
app.post("/rec_list", function (req, res, next) {
    recProfile.find({hr_id: req.body.hr_id}, function (err, post) {
        if (err) return next(err);
        return res.json(post);
    });
});

//hr get specific candidates profile
app.post("/check_candidate", function (req, res, next) {
    canProfile.findOne({ can_id: req.body.can_id }, function (err, post) {
        if (err) return next(err);
        return res.json(post);
    });
});

//get defalut info
app.post("/get-profile", (req, res, next) => {
   
  
        hrProfile.findOne({ hr_num: req.body.hr_num })
        .then(account => {
            if (account) {
                res.status(200).json(account);
            } else {
                res.status(404).json({ message: "Account not found!" });
            }
    }); 
});

app.post("/create_recruiter", function (req, res, next) {

    const user = new User({
        username:  req.body.name,
        email:  req.body.email,
        password: bcrypt.hashSync(req.body.email, 8),
    });
    
      
      user.save((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        } 
        if (req.body.roles) {
            Role.find(
              {
                name: { $in: req.body.roles },
              },
              (err, roles) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }
      
                user.roles = roles.map((role) => role._id);
                user.save((err) => {
                  if (err) {
                    res.status(500).send({ message: err });
                    return;
                  }  
                 
          
                  res.send({ message: "User was registered successfully!" });
                 
                });
              }
            );
          
            
            
            
          } else {
            Role.findOne({ name: "moderator" }, (err, role) => {
              if (err) {
                res.status(500).send({ message: err });
                return;
              }
      
              user.roles = [role._id];
              user.save((err) => {
                if (err) {
                  res.status(500).send({ message: err });
                  return;
                }     
                  
                 
                res.send({ message: "User was registered successfully!" });
   
  
     const recprofile = new recProfile({
        rec_id:user._id,
        hr_id:req.body.hr_id,
        name: req.body.name,
        phone: req.body.phone,
        poste:req.body.poste,
        email: req.body.email,
       
         });

    recprofile.save()
        .then(result => {
             console.log(" rec account created");});
        
          
    const img = new imgProfile({
        userInfo:user._id,
        img: {} });
            

    img.save().then(result => {
        console.log("can profile created with new user");
    });
});
 }
)} 
});  
   


      
});


//delete a posted job
app.post("/delete_recruiter", function (req, res, next) {
    recProfile.deleteOne({ rec_id: req.body.rec_id }, function (err, post) {
        if (err) return next(err);
        return res.json(post);
    });
});

//update a posted job
app.post("/update_recruiter", function (req, res, next) {
    recProfile.updateOne(
        { rec_id: req.body.rec_id },
        {   
            hr_id : req.body.hr_id,
            name: req.body.name,
            poste: req.body.poste,
            phone:req.body.phone,
            email: req.body.email,

        }, 
        function (err, result) {
            if (err) {
                res.status(401).json({ message: "Not authorized!" });
            } else {
                res.status(200).json({ message: "Update successful!" });
            }
        });
});

//get employers details
app.post("/employers-contact", (req, res, next) => {
    // console.log(" server get id # is:", req.body);
    hrProfile.find({  },function (err, post) {
        if (err) return next(err);
        return res.json(post);
    });
});

//hr update profile
app.put("/update", function (req, res, next) {
  
 hrProfile.updateOne(
        { hr_num: req.body.hr_id },
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            title: req.body.title,
            company: req.body.company,
            startDate: req.body.startDate,
            note: req.body.note,
            contacts: req.body.contacts,
        },
        function (err, result) {
            if (err) {
                res.status(401).json({ message: "Not authorized!" });
            } else {
                res.status(200).json({ message: "Update successful!" });
            }
        });
});


module.exports = app;
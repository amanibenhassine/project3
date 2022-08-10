const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const hrProfile = require("../models/hr-profile");
const canProfile = require("../models/cand-profile");
const jobFav = require("../models/job-fav");
const imgProfile = require("../models/img");
const express = require("express");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

const userid= "";

const router = express.Router();

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
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
      Role.findOne({ name: "user" }, (err, role) => {
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
        
          if (req.body.role == "HR") {
            const profile = new hrProfile({
                hr_num: user._id,
                firstName: "",
                lastName: "",
                phone: "",
                title: "",
                company: "",
                startDate: "",
                note: "",
                contacts: ""
            });
            profile.save()
                .then(result => {
                    console.log(" hr account created with new user");
              
                });

            const img = new imgProfile({
                userInfo: user._id,
                img:{}
            });

            img.save().then(result => {
                console.log(" hr profile img created with new user");
           
            });

        } else {

            const canprofile = new canProfile({
                can_num: user._id,
                fname: "",
                lname: "",
                phone: "",
                work_experience: [],
                educxation: []
                 });

            canprofile.save()
                .then(result => {
                     console.log(" cand account created with new user");});
                
                

            const JobFav = new jobFav({
                can: user._id,
                job_id_array: [] });
            

            JobFav.save().then(result => {
                console.log(" job fav created with new user");}); 
           
             

            const img = new imgProfile({
                userInfo: user._id,
                img: {} });
                    

            img.save().then(result => {
                console.log("can profile created with new user");});
          
         } 
        })
    
      }
    )};
  });
       
}








exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username,
  })
    .populate("roles", "-__v")
    .exec(async (err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
  


   let passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
          );
    
          if (!passwordIsValid) {
            return res.status(401).send({
              accessToken: null,
              message: "Invalid Password!",
            });
          }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
     
          
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token
       });
    });
  };

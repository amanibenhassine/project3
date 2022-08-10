const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
const hrProfile = require("../models/hr-profile");
const canProfile = require("../models/cand-profile");
const jobFav = require("../models/job-fav");
const imgProfile = require("../models/img");

require('dotenv').config();
const nodemailer = require('nodemailer');

const User = require("../models/user");
const userid = "";

const router = express.Router();
//Create new user
Routes.post('/users', function(req, res){
	var username = req.body.username;
	var firstname = req.body.fname;
	var lastname = req.body.lname;

	
	bcrypt.hash(req.body.password, 10, function(err, hash) {
		var user = new User({username: username, password: hash, firstname: firstname, lastname: lastname, admin: admin});
		User.create(user, function(err, users){
			if(err)
				res.send(err);
			res.json(users);
		});
	});
});

//Get all users
Routes.get('/users', function(req, res){
  User.find(function(err, users){
    if(err)
      res.send(err);
    res.json(users);
  });
//Get user by id
Routes.get('/users/:id', function(req, res){
	User.findOne({_id:req.params.id}, function(err, user){
		if(err)
			res.send(err);
		res.json(user);
	});
});

//Update selected user
Routes.put('/users/:id', function(req, res){
	var user = false;
	if(req.body.role == "user"){
		user = true;
	}
	var query = {
		username:req.body.username,
		firstname:req.body.firstname,
		lastname:req.body.lastname,
	
	};
});

});
router.post("/register", (req, res, next) => {
	console.log("register info: ",req.body.email, req.body.password, req.body.role);

			if (req.body.role == "admin") {
											const profile = new hrProfile({
													hr_num: this._id,
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
													})
													.catch(err => {
															console.log("hr account created faild");
													});

											const img = new imgProfile({
													userInfo: this._id,
													img:{}
											});

											img.save().then(result => {
													// console.log(" hr profile img created with new user");
											})
											.catch(err => {
													// console.log("hr profile img created faild");
											});

									} else {

											const canprofile = new canProfile({
													can_num: this._id,
													fname: "",
													lname: "",
													phone: "",
													work_experience: [],
													educxation: []
											});
											canprofile.save()
													.then(result => {
															// console.log(" hr account created with new user");
													})
													.catch(err => {
															// console.log("hr account created faild");
													});

											const JobFav = new jobFav({
													can: this.userid,
													job_id_array: []
											});

											JobFav.save().then(result => {
													// console.log(" job fav created with new user");
											})
											.catch(err => {
													// console.log("job fav created faild");
											});  

											const img = new imgProfile({
													userInfo: this._id,
													img: {}
											});

											img.save().then(result => {
													// console.log("can profile created with new user");
											})
													.catch(err => {
															// console.log("can profile created faild");
													});
									}                          
							})
							.catch(err => {
									res.status(500).json({
											message: "User create failed!",
											error: err
									});
							});
					//if it's a hr regited 
	 
			

app.use('/api', Routes);

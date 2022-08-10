const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dbConfig = require("./app/config/db.config");
const cookieParser = require('cookie-parser');
const path = require('path');
var fs = require("fs");
var multer = require('multer');
var nodemailer = require("nodemailer");
const hrProfile = require("./app/models/hr-profile");
const recProfile=require("./app/models/recruiter-profil")
const canProfile = require("./app/models/cand-profile");
const jobFav = require("./app/models/job-fav");
const userid = "";
const details = require("./details.json");



mongoose.Promise= require('bluebird');
mongoose.Promise.config({
  longStackTraces: false,
  warnings: false
})

mongoose.set('useFindAndModify', false);



var employeeController = require('./app/controllers/employeeController.js');
var employeController = require('./app/controllers/employeController.js');
var candidatController = require('./app/controllers/candidatController.js');
const hrRoutes = require("./app/routes/hr.server.routes");
const searchjobRoutes = require("./app/routes/searchjob.server.routes");
const searchcandidateRoutes = require("./app/routes/searchcandidate.server.routes");

const candidateRoutes = require("./app/routes/candidate.server.routes");
const applyRoutes = require("./app/routes/apply.server.routes");
const imageRoutes = require("./app/routes/img.server.routes");
const recruiterRoutes = require("./app/routes/recruiter.server.routes");





const app = express();
app.use(cookieParser());

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/employees', employeeController);
app.use('/employes', employeController);
app.use('/candidat', candidatController);
app.use("/hr", hrRoutes);
app.use("/searchjob", searchjobRoutes);
app.use("/searchcandidate", searchcandidateRoutes);

app.use("/jobappform", applyRoutes);
app.use("/images", imageRoutes);
app.use("/cand-profile", candidateRoutes);
app.use("/recruiter-profile", recruiterRoutes);


app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: '"Fun Of Heuristic"<example.gimail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Wellcome to Fun Of Heuristic 👻", // Subject line
    html: `<h1>Hi ${user.name}</h1><br>
    <h4>Thanks for joining us</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}




const db = require("./app/models");
const Role = db.role;
mongoose.Promise= require('bluebird');

mongoose.Promise.config({
    longStackTraces: false,
    warnings: false
})

mongoose.set('useFindAndModify', false);

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to  application." });

});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
       
              // console.log(" hr account created with new user")
        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      
    }
      )};
  

})}
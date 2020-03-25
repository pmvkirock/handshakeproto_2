var express = require("express");
var app = express();
var cors = require("cors");
const jwt = require("jsonwebtoken");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const { mongoDB } = require("./Utils/config");
const mongoose = require("mongoose");

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});

const insert = require("./insert");
const login = require("./login");
const stud_profile = require("./profile");

app.post("/signupStud", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new insert.insert();
  ins.insert_stud(req.body, res);
});

app.post("/signupComp", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new insert.insert();
  ins.insert_comp(req.body, res);
});

app.post("/loginStud", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new login.login();
  ins.login_stud(req, res);
});

app.post("/loginComp", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new login.login();
  ins.login_comp(req, res);
});

app.post("/stud_profile", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new stud_profile.profile();
  ins.getbasicinfo(req, res);
});

app.post("/updatePersonal", function(req, res) {
  console.log("Req Body : ", req.body);
  var ins = new stud_profile.profile();
  ins.updatebasicinfo(req, res);
});

//start your server on port 3001
app.listen(8000, () => console.log("Server Listening on port 8000"));

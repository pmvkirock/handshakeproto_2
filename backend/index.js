var express = require("express");
var app = express();
var cors = require("cors");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
//use cors to allow cross origin resource sharing
app.use("/prof_pic", express.static("public/uploads"));
app.use(
  cors({
    origin: "http://ec2-3-19-208-31.us-east-2.compute.amazonaws.com:3000",
    credentials: true,
  })
);
const { checkAuth, frontendURL } = require("../backend/Utils/config");

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", frontendURL);
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
  bufferMaxEntries: 0,
};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});

const multer = require("multer");

storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, `${new Date()}-${file.fieldname}.${file.mimetype.split("/")[1]}`);
  },
});

upload = multer({ storage });

app.post("/files", upload.single("file"), (req, res) => {
  console.log("Req Body : ", req.body);
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.end(`${new Date()}-${req.body.name}`);
});

const insert = require("./insert");
const login = require("./login");
const stud_profile = require("./profile");
const comp_profile = require("./company");
const jobs = require("./jobs");
const events = require("./events");
const students = require("./students");
const messages = require("./messages");

app.post("/signupStud", function (req, res) {
  console.log("Req Body : ", req.body);
  var ins = new insert.insert();
  ins.insert_stud(req.body, res);
});

app.post("/signupComp", function (req, res) {
  console.log("Req Body : ", req.body);
  var ins = new insert.insert();
  ins.insert_comp(req.body, res);
});

app.post("/loginStud", function (req, res) {
  console.log("Req Body : ", req.body);
  var ins = new login.login();
  ins.login_stud(req, res);
});

app.post("/loginComp", function (req, res) {
  console.log("Req Body : ", req.body);
  var ins = new login.login();
  ins.login_comp(req, res);
});

app.use("/stud_profile", stud_profile);

app.use("/comp_profile", comp_profile);

app.use("/jobs", jobs);

app.use("/events", events);

app.use("/students", students);

app.use("/messages", messages);

app.listen(8000, () => console.log("Server Listening on port 8000"));

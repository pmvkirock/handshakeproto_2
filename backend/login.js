const Stud_Profile = require("./Models/StudProfileModel");
const Comp_Profile = require("./Models/CompProfileModel");
const { auth } = require("../backend/Utils/passport");
const { secret } = require("../backend/Utils/config");
const jwt = require("jsonwebtoken");
var kafka = require("./kafka/client");
auth();

var login = class login {
  login_stud(req, res) {
    console.log(req.body);
    kafka.make_request("login_stud", req.body, function (err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        res.status(500).end("Error Occured");
      } else {
        const payload = {
          _id: results._id,
          username: results.email,
          type: "Student",
        };
        const token = jwt.sign(payload, secret, {
          expiresIn: 1008000,
        });
        res.status(200).end("JWT " + token);
      }
    });
  }

  login_comp(req, res) {
    console.log(req.body);
    kafka.make_request("login_comp", req.body, function (err, results) {
      console.log("in result");
      console.log(results);
      if (err) {
        res.status(500).end("Error Occured");
      } else {
        const payload = {
          _id: results._id,
          username: results.email,
          type: "Company",
        };
        const token = jwt.sign(payload, secret, {
          expiresIn: 1008000,
        });
        res.status(200).end("JWT " + token);
      }
    });
  }
};

module.exports = {
  login,
};

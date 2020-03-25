const Stud_Profile = require("./Models/StudProfileModel");
const Comp_Profile = require("./Models/CompProfileModel");
const { auth } = require("../backend/Utils/passport");
const { secret } = require("../backend/Utils/config");
const jwt = require("jsonwebtoken");
auth();

var login = class login {
  login_stud(req, res) {
    Stud_Profile.findOne(
      { email: req.body.username, password: req.body.password },
      (error, user) => {
        if (error) {
          res.status(500).end("Error Occured");
        }
        if (user) {
          const payload = {
            _id: user._id,
            username: user.email,
            type: "Student"
          };
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000
          });
          res.status(200).end("JWT " + token);
        } else {
          res.status(401).end("Invalid Credentials");
        }
      }
    );
  }

  login_comp(req, res) {
    Comp_Profile.findOne(
      { email: req.body.username, password: req.body.password },
      (error, user) => {
        if (error) {
          res.status(500).end("Error Occured");
        }
        if (user) {
          const payload = {
            _id: user._id,
            username: user.email,
            type: "Company"
          };
          const token = jwt.sign(payload, secret, {
            expiresIn: 1008000
          });
          res.status(200).end("JWT " + token);
        } else {
          res.status(401).end("Invalid Credentials");
        }
      }
    );
  }
};

module.exports = {
  login
};

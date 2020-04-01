const Stud_Profile = require("./Models/StudProfileModel");
var express = require("express");
const router = express.Router();
const { checkAuth } = require("../backend/Utils/passport");
var kafka = require("./kafka/client");

router.post("/comp_profile", checkAuth, (req, res) => {
  console.log(req.body);
  kafka.make_request("get_Comp_Profile", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      res.status(500).end("Error Occured");
    } else {
      console.log("Inside else");
      console.log(results);
      var JSONStr = JSON.stringify(results);
      res.status(200).end(JSONStr);
    }
  });
});

router.post("/updateCompany", checkAuth, (req, res) => {
  console.log(req.body);
  kafka.make_request("update_Comp_Profile", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      res.status(500).end("Error Occured");
    } else {
      console.log("Inside else");
      console.log(results);
      var JSONStr = JSON.stringify(results);
      res.status(200).end(JSONStr);
    }
  });
});

module.exports = router;

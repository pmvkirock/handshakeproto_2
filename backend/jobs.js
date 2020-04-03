var express = require("express");
const router = express.Router();
const { checkAuth } = require("../backend/Utils/passport");
var kafka = require("./kafka/client");

router.get("/getAllJobs", checkAuth, (req, res) => {
  console.log(req.body);
  kafka.make_request("get_All_Jobs", req.query, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      res.status(500).end("Error Occured");
    } else {
      console.log("Inside else");
      var JSONStr = JSON.stringify(results);
      res.status(200).end(JSONStr);
    }
  });
});

router.post("/insertJob", checkAuth, (req, res) => {
  console.log(req.body);
  kafka.make_request("add_Jobs", req.body, function(err, results) {
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
var express = require("express");
const router = express.Router();
const { checkAuth } = require("../backend/Utils/passport");
var kafka = require("./kafka/client");

router.get("/getAllEvents", checkAuth, (req, res) => {
  console.log(req.query);
  kafka.make_request("get_All_Events", req.query, function (err, results) {
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

router.post("/insertEvent", checkAuth, (req, res) => {
  console.log(req.query);
  kafka.make_request("add_Events", req.body, function (err, results) {
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

router.post("/insertAppliEvents", checkAuth, (req, res) => {
  console.log(req.query);
  kafka.make_request("insert_Events_Appli", req.body, function (err, results) {
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

router.get("/getEventsApplied", checkAuth, (req, res) => {
  console.log(req.query);
  kafka.make_request("get_Events_Applied", req.query, function (err, results) {
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

module.exports = router;

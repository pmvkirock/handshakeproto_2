var express = require("express");
const router = express.Router();
const { checkAuth } = require("../backend/Utils/passport");
var kafka = require("./kafka/client");

router.get("/getAllStudents", checkAuth, (req, res) => {
  console.log(req.query);
  kafka.make_request("get_All_Students", req.query, function (err, results) {
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

router.post("/getOtherStudents", checkAuth, (req, res) => {
  console.log(req.query);
  kafka.make_request("get_Other_Students", req.body, function (err, results) {
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

const Stud_Profile = require("./Models/StudProfileModel");
var express = require("express");
const router = express.Router();
const { checkAuth } = require("../backend/Utils/passport");
var kafka = require("./kafka/client");

router.post("/stud_profile", checkAuth, (req, res) => {
  console.log(req.body);
  kafka.make_request("get_Profile", req.body, function(err, results) {
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

router.post("/updatePersonal", checkAuth, (req, res) => {
  kafka.make_request("update_Pers", req.body, function(err, results) {
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

router.post("/updateEduInfo", checkAuth, (req, res) => {
  kafka.make_request("update_Edu", req.body, function(err, results) {
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

router.post("/insertEduInfo", checkAuth, (req, res) => {
  kafka.make_request("insert_Edu", req.body, function(err, results) {
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

router.post("/updateContact", checkAuth, (req, res) => {
  console.log("x");
  kafka.make_request("update_Contact", req.body, function(err, results) {
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

/*updatecontactinfo(con, req, res) {
    var obj = req.body.career_obj
      .replace(/\\/g, "\\\\")
      .replace(/\$/g, "\\$")
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"');
    var sql =
      `UPDATE 
      student 
      SET 
      phone_num = '` +
      req.body.phone_num +
      `', 
      email_ID = '` +
      req.body.email_ID +
      `',
      Career_obj = '` +
      obj +
      `' WHERE 
      idstudent = ` +
      req.body.id;
    console.log(sql);
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    });
  }

  

  updateexpinfo(con, req, res) {
    var sql =
      `UPDATE 
      student_exp
      SET 
      company_name = '` +
      req.body.company_name +
      `', 
      title = '` +
      req.body.title +
      `',
      location = '` +
      req.body.location +
      `',
      fromYr = '` +
      req.body.fromYr +
      `',
      fromMth = '` +
      req.body.fromMth +
      `',
      toYr = '` +
      req.body.toYr +
      `',
      toMth = '` +
      req.body.toMth +
      `',
      jobDesc = '` +
      req.body.desc +
      `' 
      WHERE 
      idstudent_exp = ` +
      req.body.id;
    console.log(sql);
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    });
  }

  insertexpinfo(con, req, res) {
    var sql =
      `INSERT INTO student_exp (idstudent, company_name, title, location, fromYr, fromMth, toYr, toMth, jobDesc) VALUES ('` +
      +req.body.stud_id +
      `','` +
      req.body.company_name +
      `','` +
      req.body.title +
      `','` +
      req.body.location +
      `','` +
      req.body.fromYr +
      `','` +
      req.body.fromMth +
      `','` +
      req.body.toYr +
      `','` +
      req.body.toMth +
      `','` +
      req.body.desc +
      `')`;
    console.log(sql);
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    });
  }

  inserteduinfo(con, req, res) {
    var sql =
      `INSERT INTO student_edu (idstudent, coll_name, degree, pass_year, curr_CGPA, fromYr, fromMth, toYr, toMth, major) VALUES ('` +
      +req.body.stud_id +
      `','` +
      req.body.coll_name +
      `','` +
      req.body.degree +
      `','` +
      req.body.pass_year +
      `','` +
      req.body.curr_CGPA +
      `','` +
      req.body.fromYr +
      `','` +
      req.body.fromMth +
      `','` +
      req.body.toYr +
      `','` +
      req.body.toMth +
      `','` +
      req.body.major +
      `')`;
    console.log(sql);
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    });
  }

  deleteeduinfo(con, req, res) {
    var sql =
      "DELETE FROM student_edu where idstudent_edu = '" + req.body.id + "'";
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    });
  }

  deleteexpinfo(con, req, res) {
    var sql =
      "DELETE FROM student_exp where idstudent_exp = '" + req.body.id + "'";
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    });
  }

  insertskillinfo(con, req, res) {
    var sql =
      `INSERT INTO student_skills (idstudent, skill_name) VALUES ('` +
      +req.body.idstudent +
      `','` +
      req.body.skill_name +
      `')`;
    console.log(sql);
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    });
  }

  getskillinfo(con, req, res) {
    var sql =
      "SELECT * FROM student_skills where idstudent = '" +
      req.query.stud_id +
      "'";
    con.query(sql, function(err, result, fields) {
      if (err) throw err;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      console.log(JSON.stringify(result));
      res.end(JSON.stringify(result));
    });
  }*/

module.exports = router;

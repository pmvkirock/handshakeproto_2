const Stud_Profile = require("./Models/StudProfileModel");

var profile = class profile {
  getbasicinfo(req, res) {
    Stud_Profile.findOne({ _id: req.body.user_id }, (error, user) => {
      if (error) {
        res.status(500).end("Error Occured");
      }
      if (user) {
        console.log(user);
        var JSONStr = JSON.stringify(user);
        res.status(200).end(JSONStr);
      } else {
        res.status(401).end("Invalid Credentials");
      }
    });
  }

  updatebasicinfo(req, res) {
    Stud_Profile.findOne({ _id: req.body.user_id }, (error, user) => {
      if (error) {
        res.status(500).end("Error Occured");
      }
      if (user) {
        user.fname = req.body.firstName;
        user.lname = req.body.lastName;
        user.dob = req.body.dob;
        user.city = req.body.city;
        user.state = req.body.state;
        user.country = req.body.country;
        user.save();
        res.status(200);
      } else {
        res.status(401).end("Invalid Credentials");
      }
    });
  }

  updatecontactinfo(con, req, res) {
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

  updateeduinfo(con, req, res) {
    var sql =
      `UPDATE 
      student_edu
      SET 
      coll_name = '` +
      req.body.coll_name +
      `', 
      degree = '` +
      req.body.degree +
      `',
      curr_CGPA = '` +
      req.body.curr_CGPA +
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
      major = '` +
      req.body.major +
      `',
      pass_year = '` +
      req.body.pass_year +
      `' WHERE 
      idstudent_edu = ` +
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
  }
};

module.exports = {
  profile
};

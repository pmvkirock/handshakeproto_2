const Stud_Profile = require("./Models/StudProfileModel");
const Comp_Profile = require("./Models/CompProfileModel");

var insert = class insert {
  insert_stud(body, res) {
    var newuser = new Stud_Profile({
      fname: body.fname,
      lname: body.lname,
      password: body.pass,
      email: body.email,
      school_info: [{ name: body.sname }]
    });

    Stud_Profile.findOne({ email: body.email }, (error, Stud_Profile) => {
      if (error) {
        res.writeHead(500, {
          "Content-Type": "text/plain"
        });
        res.end();
      }
      if (Stud_Profile) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Email already exists");
      } else {
        newuser.save((error, data) => {
          if (error) {
            res.writeHead(500, {
              "Content-Type": "text/plain"
            });

            res.end();
          } else {
            res.writeHead(200, {
              "Content-Type": "text/plain"
            });
            res.end();
          }
        });
      }
    });
    console.log("Connected!");
  }

  insert_comp(body, res) {
    var newuser = new Comp_Profile({
      cname: body.cname,
      password: body.pass,
      email: body.email,
      location: body.location
    });

    Comp_Profile.findOne({ email: body.email }, (error, Comp_Profile) => {
      if (error) {
        res.writeHead(500, {
          "Content-Type": "text/plain"
        });
        res.end();
      }
      if (Comp_Profile) {
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Email already exists");
      } else {
        newuser.save((error, data) => {
          if (error) {
            res.writeHead(500, {
              "Content-Type": "text/plain"
            });
            console.log(error);
            res.end();
          } else {
            res.writeHead(200, {
              "Content-Type": "text/plain"
            });
            res.end();
          }
        });
      }
    });
    console.log("Connected!");
  }
};

module.exports = {
  insert
};

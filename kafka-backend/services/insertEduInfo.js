const Stud_Profile = require("../Models/StudProfileModel");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg.stud_id);
  Stud_Profile.update(
    { _id: msg.stud_id },
    {
      $push: {
        school_info: {
          name: msg.coll_name,
          degree: msg.degree,
          yop: msg.pass_year,
          CGPA: msg.curr_CGPA,
          fromMonth: msg.fromMth,
          fromYear: msg.fromYr,
          toMonth: msg.toMth,
          toYear: msg.toYr,
          major: msg.major
        }
      }
    },
    (error, user) => {
      if (error) {
        console.log("error-->");
        callback(error, "Error");
      } else {
        console.log(user);
        callback(null, user);
      }
      console.log("after callback");
    }
  );
}

exports.handle_request = handle_request;

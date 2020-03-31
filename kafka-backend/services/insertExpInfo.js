const Stud_Profile = require("../Models/StudProfileModel");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg.stud_id);
  Stud_Profile.update(
    { _id: msg.stud_id },
    {
      $push: {
        work_exp: {
          name: msg.company_name,
          title: msg.title,
          location: msg.location,
          work_des: msg.desc,
          fromMonth: msg.fromMth,
          fromYear: msg.fromYr,
          toMonth: msg.toMth,
          toYear: msg.toYr
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

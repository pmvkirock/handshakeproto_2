const Stud_Profile = require("../Models/StudProfileModel");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg.user_id);
  Stud_Profile.findOneAndUpdate(
    { _id: msg.user_id, "school_info._id": msg.school_id },
    {
      $set: {
        "school_info.$.name": msg.coll_name,
        "school_info.$.degree": msg.degree,
        "school_info.$.major": msg.major,
        "school_info.$.yop": msg.pass_year,
        "school_info.$.CGPA": msg.curr_CGPA,
        "school_info.$.fromMonth": msg.fromMth,
        "school_info.$.fromYear": msg.fromYr,
        "school_info.$.toMonth": msg.toMth,
        "school_info.$.toYear": msg.toYr
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

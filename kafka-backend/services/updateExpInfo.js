const Stud_Profile = require("../Models/StudProfileModel");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg.user_id);
  Stud_Profile.findOneAndUpdate(
    { _id: msg.user_id, "work_exp._id": msg.exp_id },
    {
      $set: {
        "work_exp.$.name": msg.company_name,
        "work_exp.$.title": msg.title,
        "work_exp.$.location": msg.location,
        "work_exp.$.work_des": msg.desc,
        "work_exp.$.fromMonth": msg.fromMth,
        "work_exp.$.fromYear": msg.fromYr,
        "work_exp.$.toMonth": msg.toMth,
        "work_exp.$.toYear": msg.toYr
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

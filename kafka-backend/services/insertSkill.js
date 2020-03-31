const Stud_Profile = require("../Models/StudProfileModel");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg.user_id);
  Stud_Profile.update(
    { _id: msg.user_id },
    {
      $push: {
        skill: {
          skill_name: msg.skill_name
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

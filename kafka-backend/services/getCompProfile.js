const Comp_Profile = require("../Models/CompProfileModel");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg.user_id);
  Comp_Profile.find({ _id: msg.user_id }, (error, user) => {
    if (error) {
      console.log("error-->");
      callback(error, "Error");
    } else {
      console.log(user);
      callback(null, user);
    }
    console.log("after callback");
  });
}

exports.handle_request = handle_request;

const Stud_Profile = require("../Models/StudProfileModel");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg.user_id);
  var obj;
  if (msg.career_obj)
    obj = msg.career_obj
      .replace(/\\/g, "\\\\")
      .replace(/\$/g, "\\$")
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"');
  Stud_Profile.findOne({ _id: msg.user_id }, (error, user) => {
    if (error) {
      console.log("error-->");
      callback(error, "Error");
    } else {
      user.phone = msg.phone_num;
      user.email = msg.email_ID;
      user.obj = obj;
      user.save();
      callback(null, user);
    }
    console.log("after callback");
  });
}

exports.handle_request = handle_request;

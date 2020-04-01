const Stud_Profile = require("../Models/StudProfileModel");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg.user_id);
  Stud_Profile.findOne({ _id: msg.user_id }, (error, user) => {
    if (error) {
      console.log("error-->");
      callback(error, "Error");
    } else {
      user.fname = msg.firstName;
      user.lname = msg.lastName;
      user.dob = msg.dob;
      user.city = msg.city;
      user.state = msg.state;
      user.country = msg.country;
      user.profile_pic = msg.prof_pic;
      user.save();
      callback(null, user);
    }
    console.log("after callback");
  });
}

exports.handle_request = handle_request;

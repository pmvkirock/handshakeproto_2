const Comp_Profile = require("../Models/CompProfileModel");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg.id);
  Comp_Profile.findOne({ _id: msg.id }, (error, user) => {
    if (error) {
      console.log("error-->");
      callback(error, "Error");
    } else {
      user.cname = msg.comp_name;
      user.location = msg.location;
      user.desc = msg.des;
      user.type = msg.type;
      user.noofemp = msg.no;
      user.website = msg.web;
      user.email = msg.email;
      user.owner_ship = msg.owner;
      user.prof_pic = msg.prof_pic;
      user.save();
      callback(null, user);
    }
    console.log("after callback");
  });
}

exports.handle_request = handle_request;

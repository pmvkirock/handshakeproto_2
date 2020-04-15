const Comp_Profile = require("../Models/CompProfileModel");
const mongoose = require("mongoose");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  Comp_Profile.findOne({ email: msg.username, password: msg.password })
    .then((user) => {
      console.log(user);
      callback(null, user);
    })
    .catch((error) => {
      console.log(user);
      callback(null, error);
    });
}

exports.handle_request = handle_request;

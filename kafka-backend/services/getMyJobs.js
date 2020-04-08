const App = require("../Models/ApplicationModel");
const mongoose = require("mongoose");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg.user_id);
  App.find({
    idstudent: new mongoose.Types.ObjectId(msg.user_id),
  })
    .populate("idjob")
    .exec()
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

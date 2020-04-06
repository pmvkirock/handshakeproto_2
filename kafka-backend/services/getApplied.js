const App = require("../Models/ApplicationModel");
const mongoose = require("mongoose");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg.user_id);
  App.find({
    idcompany: new mongoose.Types.ObjectId(msg.comp_id),
    idjob: new mongoose.Types.ObjectId(msg.job_id),
  })
    .populate("idstudent")
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

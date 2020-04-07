const App = require("../Models/AppEventModel");
const mongoose = require("mongoose");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  var array = {
    idcompany: new mongoose.Types.ObjectId(msg.comp_id),
    idjob: new mongoose.Types.ObjectId(msg.job_id),
  };
  console.log(array);
  App.find(array)
    .populate("idstudent")
    .exec()
    .then((user) => {
      console.log(user);
      callback(null, user);
    })
    .catch((error) => {
      console.log(error + "1");
      callback(null, error);
    });
}

exports.handle_request = handle_request;

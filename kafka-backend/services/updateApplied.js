const Job = require("../Models/ApplicationModel");
const mongoose = require("mongoose");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg.id);
  Job.findOne(
    {
      idcompany: new mongoose.Types.ObjectId(msg.idcompany),
      idjob: new mongoose.Types.ObjectId(msg.idjob),
      idstudent: new mongoose.Types.ObjectId(msg.idstudent),
    },
    (error, user) => {
      if (error) {
        console.log("error-->");
        callback(error, "Error");
      } else {
        user.status = msg.status;
        user.save();
        callback(null, user);
      }
      console.log("after callback");
    }
  );
}

exports.handle_request = handle_request;

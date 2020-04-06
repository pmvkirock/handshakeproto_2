const Application = require("../Models/ApplicationModel");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  var newappli = new Application({
    idcompany: msg.idcompany,
    idstudent: msg.idstudent,
    idjob: msg.idjob,
    status: msg.status,
    resume: msg.resume,
  });
  newappli.save((error, user) => {
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

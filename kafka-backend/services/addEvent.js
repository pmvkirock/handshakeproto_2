const Event_Model = require("../Models/EventModel");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg.user_id);
  var newevent = new Event_Model({
    title: msg.title,
    location: msg.location,
    eligibility: msg.eligibility,
    desc: msg.event_des,
    time: msg.time,
    date: msg.date,
    company_name: msg.company_name,
    email: msg.email,
    idcompany: msg.comp_id,
  });
  newevent.save((error, user) => {
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

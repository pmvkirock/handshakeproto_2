const Job_Model = require("../Models/JobModel");

function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg.user_id);
  var newjob = new Job_Model({
    title: msg.job_title,
    deadline: msg.deadline,
    location: msg.location,
    salary: msg.salary,
    desc: msg.des,
    post: msg.post,
    paid: msg.paid,
    job_cat: msg.job_cat,
    company_name: msg.company_name,
    email: msg.email,
    comp_id: msg.comp_id
  });
  newjob.save((error, user) => {
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

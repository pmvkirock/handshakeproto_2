const Job_Model = require("../Models/JobModel");

async function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg);
  const options = {
    page: parseInt(msg.skip),
    limit: parseInt(msg.limit)
  };
  const jobs = await Job_Model.paginate({}, options);
  callback(null, jobs);
}

exports.handle_request = handle_request;

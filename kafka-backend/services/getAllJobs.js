const Job_Model = require("../Models/JobModel");

async function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg);
  var options = {
    page: parseInt(msg.skip),
    limit: parseInt(msg.limit),
  };
  switch (msg.filter) {
    case "Location - Asc":
      options = Object.assign(options, {
        sort: { location: 1 },
      });
      break;
    case "Location - Dsc":
      options = Object.assign(options, {
        sort: { location: -1 },
      });
      break;
    case "Deadline - Asc":
      options = Object.assign(options, {
        sort: { deadline: 1 },
      });
      break;
    case "Deadline - Dsc":
      options = Object.assign(options, {
        sort: { deadline: -1 },
      });
      break;
    case "Posting Date - Asc":
      options = Object.assign(options, {
        sort: { posting_date: 1 },
      });
      break;
    case "Posting Date - Dsc":
      options = Object.assign(options, {
        sort: { posting_date: -1 },
      });
      break;
    default:
      options = Object.assign(options, {
        sort: { posting_date: -1 },
      });
  }
  console.log(options);
  var filter = {};
  if (msg.job != "") {
    filter = Object.assign(filter, {
      title: { $regex: ".*" + msg.job + ".*" },
    });
  }
  if (msg.city != "") {
    filter = Object.assign(filter, {
      location: { $regex: ".*" + msg.city + ".*" },
    });
  }
  switch (msg.filter) {
    case "PartTime":
      filter = Object.assign(filter, {
        paid: msg.filter,
      });
      break;
    case "FullTime":
      filter = Object.assign(filter, {
        paid: msg.filter,
      });
      break;
    case "OnCampus":
      filter = Object.assign(filter, {
        job_cat: msg.filter,
      });
      break;
    case "Internship":
      filter = Object.assign(filter, {
        job_cat: msg.filter,
      });
      break;
    default:
      break;
  }
  if (msg.comp_id) {
    filter = Object.assign(filter, {
      comp_id: msg.comp_id,
    });
  }
  console.log(filter);
  const jobs = await Job_Model.paginate(filter, options);
  callback(null, jobs);
}

exports.handle_request = handle_request;

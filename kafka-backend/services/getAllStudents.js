const Stud_Model = require("../Models/StudProfileModel");

async function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg);
  var options = {
    page: parseInt(msg.skip),
    limit: parseInt(msg.limit),
  };
  console.log(options);
  var filter = {};
  if (msg.name != "") {
    filter = Object.assign(filter, {
      fname: { $regex: ".*" + msg.name + ".*" },
    });
  }
  if (msg.sname != "") {
    filter = Object.assign(filter, {
      "school_info.name": { $regex: ".*" + msg.sname + ".*" },
    });
  }
  if (msg.major) {
    filter = Object.assign(filter, {
      "school_info.major": { $regex: ".*" + msg.major + ".*" },
    });
  }
  if (msg.skill) {
    filter = Object.assign(filter, {
      "skill.skill_name": { $regex: ".*" + msg.skill + ".*" },
    });
  }
  console.log(filter);
  const jobs = await Stud_Model.paginate(filter, options);
  callback(null, jobs);
}

exports.handle_request = handle_request;

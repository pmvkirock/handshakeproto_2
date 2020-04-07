const Event_Model = require("../Models/EventModel");

async function handle_request(msg, callback) {
  console.log("Inside book kafka backend");
  console.log(msg);
  var options = {
    page: parseInt(msg.skip),
    limit: parseInt(msg.limit),
  };
  switch (msg.sort) {
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
  if (msg.comp_id) {
    filter = Object.assign(filter, {
      idcompany: msg.comp_id,
    });
  }
  console.log(filter);
  const jobs = await Event_Model.paginate(filter, options);
  callback(null, jobs);
}

exports.handle_request = handle_request;

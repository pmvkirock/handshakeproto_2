const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var eventSchema = new Schema(
  {
    idcompany: { type: String, required: true },
    title: { type: String, required: true },
    deadline: { type: Date },
    location: { type: String },
    salary: { type: String },
    desc: { type: String },
    eligibility: { type: String },
    posting_date: { type: Date },
    date: { type: String },
    time: { type: String }
  },
  {
    versionKey: false
  }
);

const eventModel = mongoose.model("events", eventSchema);
module.exports = eventModel;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var jobSchema = new Schema(
  {
    idcompany: { type: String, required: true },
    title: { type: String, required: true },
    deadline: { type: Date },
    location: { type: String },
    salary: { type: String },
    desc: { type: String },
    post: { type: Number },
    paid: { type: String },
    job_cat: { type: String },
    posting_date: { type: Date }
  },
  {
    versionKey: false
  }
);

const jobModel = mongoose.model("jobs", jobSchema);
module.exports = jobModel;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var appSchema = new Schema(
  {
    idcompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comp_prof",
      required: true,
    },
    idstudent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "stud_prof",
      required: true,
    },
    idjob: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "jobs",
      required: true,
    },
    status: { type: String, required: true },
    resume: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const appModel = mongoose.model("application", appSchema);
module.exports = appModel;

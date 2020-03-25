const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var appSchema = new Schema(
  {
    idcompany: { type: String, required: true },
    idstudent: { type: String, required: true },
    idjob: { type: String, required: true },
    status: { type: String, required: true },
    resume: { type: String, required: true }
  },
  {
    versionKey: false
  }
);

const appModel = mongoose.model("application", appSchema);
module.exports = appModel;

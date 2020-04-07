const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var appEventSchema = new Schema(
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
      ref: "events",
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const appModel = mongoose.model("app_event", appEventSchema);
module.exports = appModel;

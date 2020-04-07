const mongoose = require("mongoose");
const paginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

var studSchema = new Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phone: { type: Number, required: false },
    dob: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    country: { type: String, required: false },
    obj: { type: String, required: false },
    profile_pic: { type: String },
    school_info: [
      {
        name: String,
        location: String,
        degree: String,
        major: String,
        yop: String,
        CGPA: Number,
        fromMonth: String,
        fromYear: String,
        toMonth: String,
        toYear: String,
      },
    ],
    work_exp: [
      {
        name: String,
        title: String,
        location: String,
        work_des: String,
        fromMonth: String,
        fromYear: String,
        toMonth: String,
        toYear: String,
      },
    ],
    skill: [
      {
        skill_name: String,
      },
    ],
  },
  {
    versionKey: false,
  }
);

studSchema.plugin(paginate);
const studModel = mongoose.model("stud_prof", studSchema);
module.exports = studModel;

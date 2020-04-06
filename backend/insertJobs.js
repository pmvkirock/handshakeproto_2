var Job_Model = require("./Models/JobModel");

const comp = [
  {
    cname: "Tesla Inc",
    email: "tesla@tesla.com",
    id: "5e87152ae7c68444b75824b4",
  },
  {
    cname: "Apple Inc",
    email: "apple@apple.com",
    id: "5e7867f6ead1f571b011f2e6",
  },
  {
    cname: "ABC Corp",
    email: "abc@abc.com",
    id: "5e8714aae7c68444b75824b3",
  },
];

const { mongoDB } = require("./Utils/config");
const mongoose = require("mongoose");

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0,
};

mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});

const insert = async (comp) => {
  console.log(1);
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 10; i++) {
      var newjob = new Job_Model({
        title: "Software Dev " + i,
        location: "Cupertino",
        deadline: "2020-06-03",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        job_cat: "Internship",
        paid: "FullTime",
        salary: 50000,
        company_name: comp[j].cname,
        email: comp[j].email,
        comp_id: comp[j].id,
      });
      await newjob.save((error, user) => {
        if (error) {
          console.log(error);
        } else {
          console.log(user);
        }
      });
    }
  }
};

insert(comp);

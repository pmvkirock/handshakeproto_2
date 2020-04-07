var Job_Model = require("./Models/EventModel");

const comp = [
  {
    cname: "Tesla Inc",
    email: "tesla@tesla.com",
    id: "5e87152ae7c68444b75824b4",
    city: "Paulo Alto",
  },
  {
    cname: "Apple Inc",
    email: "apple@apple.com",
    id: "5e7867f6ead1f571b011f2e6",
    city: "Cupertino",
  },
  {
    cname: "ABC Corp",
    email: "abc@abc.com",
    id: "5e8714aae7c68444b75824b3",
    city: "San Francisco",
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
        title: "Conference " + i,
        location: comp[j].city,
        date: "2020-06-03",
        desc:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        eligibility: "Software Engineering",
        time: "19:00",
        company_name: comp[j].cname,
        email: comp[j].email,
        idcompany: comp[j].id,
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

var app = require("../index");
var chai = require("chai");
chai.use(require("chai-http"));
var expect = require("chai").expect;

var agent = require("chai").request.agent(app);
var login = { username: "pranav.karmalkar@gmail.com", password: "1234" };
const auth =
  "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTc4NGE4MzYzZTNiMTY0MTk3ODZlNGIiLCJ1c2VybmFtZSI6InByYW5hdi5rYXJtYWxrYXJAZ21haWwuY29tIiwidHlwZSI6IlN0dWRlbnQiLCJpYXQiOjE1ODY5NTU0NzksImV4cCI6MTU4Nzk2MzQ3OX0.d9sa1EUrAVI0mZcQ_-lEjrlMXavZJo_r4wKLwJc_0TM";

describe("Handshake App", function () {
  it("GET /getAllJobs - Get All Jobs", function (done) {
    agent
      .get("/jobs/getAllJobs?limit=10&skip=1&filter=&job=&city=&sort=")
      .set("Authorization", auth)
      .then(function (res) {
        //console.log(JSON.parse(res.text).docs);
        expect(res).to.have.status(200);
        expect(JSON.parse(res.text).docs[0].title).to.equal("Software Dev 9");
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it("POST /loginStud- login Student", function (done) {
    agent
      .post("/loginStud")
      .send({ username: "pranav.karmalkar@gmail.com", password: "1234" })
      .set("Authorization", auth)
      .then(function (res) {
        //console.log("Pranav" + JSON.parse(res.text).docs);
        expect(res).to.have.status(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it("POST /loginComp- login Company", function (done) {
    agent
      .post("/loginComp")
      .send({ username: "abc@abc.com", password: "1234" })
      .set("Authorization", auth)
      .then(function (res) {
        expect(res).to.have.status(200);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it("POST /comp_profile - Get Company", function (done) {
    agent
      .post("/comp_profile/comp_profile")
      .send({ user_id: "5e7867f6ead1f571b011f2e6" })
      .set("Authorization", auth)
      .then(function (res) {
        //console.log(JSON.parse(res.text)[0].cname);
        expect(JSON.parse(res.text)[0].cname).to.equal("Apple Inc");
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it("POST /stud_profile - Get Student", function (done) {
    agent
      .post("/stud_profile/stud_profile")
      .send({ user_id: "5e784a8363e3b16419786e4b" })
      .set("Authorization", auth)
      .then(function (res) {
        expect(JSON.parse(res.text)[0].fname).to.equal("Pranav");
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});

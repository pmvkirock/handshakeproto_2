let mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://pranav:Pranav96@cluster0-f0slq.mongodb.net/handshake?retryWrites=true&w=majority";
class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose
      .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch(err => {
        console.error("Database connection error");
      });
  }
}

module.exports = new Database();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var messageSchema = new Schema({
  senderid: { type: String, required: true },
  recieverid: { type: String, required: true },
  type: { type: String, required: true },
  sendername: { type: String, required: true },
  recievername: { type: String, required: true },
  senderdes: { type: String },
  recieverdes: { type: String },
  message: [
    {
      content: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

const messageModel = mongoose.model("messages", messageSchema);
module.exports = messageModel;

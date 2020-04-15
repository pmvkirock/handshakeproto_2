const Message = require("../Models/MessageModel.js");

function handle_request(msg, callback) {
  var newconvo = new Message({
    senderid: msg.senderid,
    recieverid: msg.recieverid,
    type: msg.type,
    recievername: msg.recievername,
    message: [{ content: msg.content }],
    sendername: msg.sendername,
  });
  Message.findOne(
    { senderid: msg.senderid, recieverid: msg.recieverid },
    (error, found) => {
      if (error) {
        console.log("error-->");
        callback(error, "Error");
      }
      if (found) {
        Message.update(
          { senderid: msg.senderid, recieverid: msg.recieverid },
          {
            $push: {
              message: {
                content: msg.content,
              },
            },
          },
          (error, inserted) => {
            if (error) {
              console.log("error-->");
              callback(error, "Error");
            } else {
              console.log("inserted-->");
              callback(null, inserted);
            }
          }
        );
      } else {
        newconvo.save((error, inserted) => {
          if (error) {
            console.log("error-->");
            callback(error, "Error");
          } else {
            console.log("inserted-->");
            callback(null, inserted);
          }
        });
      }
    }
  );
}

exports.handle_request = handle_request;

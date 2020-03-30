var connection = new require("./kafka/Connection");
const Database = require("./config");

//topics files
//var signin = require('./services/signin.js');
var Books = require("../kafka-backend/services/getProfile");

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  if (topic_name != "__consumer_offsets") {
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log("server is running ");
    consumer.on("message", function(message) {
      console.log("message received for " + topic_name + " ", fname);
      console.log(message.value);
      var data = JSON.parse(message.value);
      fname.handle_request(data.data, function(err, res) {
        console.log("after handle" + res);
        var payloads = [
          {
            topic: data.replyTo,
            messages: JSON.stringify({
              correlationId: data.correlationId,
              data: res
            }),
            partition: 0
          }
        ];
        producer.send(payloads, function(err, data) {
          console.log(data);
        });
        return;
      });
    });
  }
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("get_Profile", Books);

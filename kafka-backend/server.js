var connection = new require("./kafka/Connection");
const Database = require("./config");

var get_Prof = require("../kafka-backend/services/getProfile");
var update_Pers = require("../kafka-backend/services/updatePersonalInfo");
var update_Edu = require("../kafka-backend/services/updateEduInfo");
var insert_Edu = require("../kafka-backend/services/insertEduInfo");
var update_Contact = require("../kafka-backend/services/updateContactInfo");
var insert_Exp = require("../kafka-backend/services/insertExpInfo");
var update_Exp = require("../kafka-backend/services/updateExpInfo");
var insert_Skill = require("../kafka-backend/services/insertSkill");

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
handleTopicRequest("get_Profile", get_Prof);
handleTopicRequest("update_Pers", update_Pers);
handleTopicRequest("update_Edu", update_Edu);
handleTopicRequest("insert_Edu", insert_Edu);
handleTopicRequest("update_Contact", update_Contact);
handleTopicRequest("insert_Exp", insert_Exp);
handleTopicRequest("update_Exp", update_Exp);
handleTopicRequest("insert_Skill", insert_Skill);

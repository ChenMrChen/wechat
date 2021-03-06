var request = require('request');
var getXMLNodeValue = require("../tool/xmlparse.js");
var formattedValue = require("../tool/formatValue.js");
var replyMessage = require("../tool/replyMessage.js");
var config = require("../../config.js");
if( config.useRedis ) {
  var conversationLogService = require("./conversationLogService.js");
}

const url = "http://www.tuling123.com/openapi/api?key=b2060a25a15f41bdb8e4597a8f1c6dff&info=";

module.exports = function(wholecontent, question, res){
  requesturl = url + encodeURI(question); 

  var options = {
            url: requesturl,
            method: "GET"
        };

  request(options,function(error,response,data){
  if(data){
     var text = JSON.parse(data).text;
     console.log("TUNING, question: " + question + " answer: " + text);
     if( config.useRedis ) {
        conversationLogService.log(wholecontent, question, text);
     }
     var xml = replyMessage(wholecontent, text);
     res.send(xml);
  } else {
       res.send("Error when calling Tuning API: " + error);
       console.log(error);
     }
  });
};

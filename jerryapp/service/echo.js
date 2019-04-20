var replyMessage = require("../tool/replyMessage.js");

module.exports = function(wholecontent, question, res){

  var reply = "Add by Mr Chen: " + question; 
  var xml = replyMessage(wholecontent, reply);
  res.send(xml);
};

var request = require('request');

var url = "https://localhost:8080/env";

var getTokenOptions = {
        url: url,
        method: "GET",
        json:true,
        headers: {
            "content-type": "application/json"
        }
};

function getToken() {
  return new Promise(function(resolve,reject){
      var requestC = request.defaults({jar: true});
      console.log("HTTPS consumption test: " + url );

      requestC(getTokenOptions,function(error,response,body){
       console.log("response: " + response);
      }); 
     });
}



getToken();
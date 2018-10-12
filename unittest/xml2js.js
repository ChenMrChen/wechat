
var parseString = require('xml2js').parseString;

text="<bookstore>"
text=text+"<book>";
text=text+"<title>Harry Potter</title>";
text=text+"<author>J K. Rowling</author>";
text=text+"<year>2005</year>";
text=text+"</book>";
text=text+"</bookstore>";


parseString(text, function (err, result) {
    console.log(result);
    // var obj = JSON.parse(result); // syntax error
    // console.log("id: " + obj.title);
});



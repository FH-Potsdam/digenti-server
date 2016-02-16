/*global require*/
var D = require("./../../digenti");
var request = require("./../../aidr_twitter/request");

var test_request = function(){
  request.get(D.trace("test_request"));
};

test_request();

/*global require*/
var D = require("./../../../../digenti");
var request = require("./../../../../collect/socialmediachannels/aidr_twitter/request");

var test_request = function(){
  request.get(D.trace("test_request"));
};

test_request();

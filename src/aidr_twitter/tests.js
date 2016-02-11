var D = require("./../digenti");
var converter = D.require("./aidr_twitter/converter");
var request = D.require("./aidr_twitter/request");

var test_request_get = function(){
  params = {
    q: 'flood OR water OR aid OR risk OR river OR victims OR congaree OR aid OR help OR damage OR access OR injure OR wound OR joaquin',
    geocode: '33.991020,-81.047866,20km',
    until: '2015-10-08',
    count: '10'
  }
	D.trace("test_request_test", request.get(params));
};

test_request_get();
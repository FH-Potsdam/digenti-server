var D = require("./../digenti");
var request = D.require("./youtube/request");

var test_request_get = function(){
  var params = {
    part: 'snippet',
    location: '27.7167,85.3667',
    locationRadius: '300km',
    maxResults: 50,
    publishedAfter: '2015-04-24T00:00:00Z',
    publishedBefore: '2015-06-01T00:00:00Z',
    q: 'earthquake',
    regionCode: 'np',
    type: 'video'
  };
	D.trace("test_request_test", request.get(params));
};

test_request_get();
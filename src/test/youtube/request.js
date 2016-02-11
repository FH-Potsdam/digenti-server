/*global require*/
var D = require("./../../digenti");
var request = require("./../../youtube/request");

var test_request_get_list = function(){
  var params = {
    part: 'snippet',
    location: '27.7167,85.3667',
    locationRadius: '300km',
    maxResults: 5,
    publishedAfter: '2015-04-24T00:00:00Z',
    publishedBefore: '2015-06-01T00:00:00Z',
    q: 'earthquake',
    regionCode: 'np',
    type: 'video'
  };
	request.get_list(D.trace("test_request_get_list"), params);
};

var test_request_get_videos = function(){
  var ids = [ 
    '_gE0UnyA2kI',
    'GBQsxJ-Bmkc',
    'W3fZZwQmEmQ',
    'QxZx4T5bPUE',
    '3YIwzDCwlgo',
    'kJTrujsQKRo',
    'HiBUB-4V4sk',
    '-kR5lXSFZh8',
    'SSOqmGr1SY0'
  ];
  request.get_videos(D.trace("test_request_get_videos"), ids);
}

var test_request_get = function(){
  var params = {
    part: 'snippet',
    location: '27.7167,85.3667',
    locationRadius: '300km',
    maxResults: 5,
    publishedAfter: '2015-04-24T00:00:00Z',
    publishedBefore: '2015-06-01T00:00:00Z',
    q: 'earthquake',
    regionCode: 'np',
    type: 'video'
  };
	request.get(D.trace("test_request_get"), params);
};

test_request_get_list();
test_request_get_videos();
test_request_get();
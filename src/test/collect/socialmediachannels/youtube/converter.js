/*global require*/
var R = require("ramda");
var D = require("./../../../../digenti");
var converter = require("./../../../../collect/socialmediachannels/youtube/converter");

var test_as_search_record = function(){
  var items = [
    {
      "id": "btc020siGBo",
      "snippet": {
        "publishedAt": "2015-05-01T20:54:51.000Z",
        "title": "Kathmandu Nepal Earthquake Traffic Camera CCTV caught on camera April 25 2015 11:51 AM",
        "description": "People literally walked on their knees because they couldn't even stand straight up."
      },
      "recordingDetails": {
        "location": {
          "latitude": 27.7,
          "longitude": 85.33333
        }
      }
    },
    {
      "id": "btc020siGBo",
      "snippet": {
        "publishedAt": "2015-05-01T20:54:51.000Z",
        "title": "Kathmandu Nepal Earthquake Traffic Camera CCTV caught on camera April 25 2015 11:51 AM",
        "description": "People literally walked on their knees because they couldn't even stand straight up."
      },
      "recordingDetails": {
        
      }
    },
    {
      "id": "btc020siGBo",
      "snippet": {
        "title": "Kathmandu Nepal Earthquake Traffic Camera CCTV caught on camera April 25 2015 11:51 AM",
        "description": "People literally walked on their knees because they couldn't even stand straight up."
      }
    },
    {
      "id": "btc020siGBo"
    }
  ];
  R.forEach(function(item){
    D.trace("test_as_search_record", converter.as_search_record(item));
  }, items);
};

var test_filter = function(){
  var items = [
    { id: "1", latitude: "12", longitude: "23"},
    { id: "1", latitude: "", longitude: "23"},
    { id: "1", latitude: "12", longitude: ""},
    { id: "1", latitude: "", longitude: ""},
    { id: "1"}
  ];
  var filteredItems = converter.filter(items);
  R.forEach(function(item){
    D.trace("test_filter", item);
  }, filteredItems);
};

var test_convert = function(){
  var data = {
    "kind": "youtube#videoListResponse",
    "etag": "\"mPrpS7Nrk6Ggi_P7VJ8-KsEOiIw/DNgx6b5M5Mj6CkSPMzfycDeRXVE\"",
    "pageInfo": {
      "totalResults": 50,
      "resultsPerPage": 50
    },
    "items": [
      {
        "id": "1",
        "snippet": {
          "publishedAt": "2015-05-01T20:54:51.000Z",
          "title": "Kathmandu Nepal Earthquake Traffic Camera CCTV caught on camera April 25 2015 11:51 AM",
          "description": "People literally walked on their knees because they couldn't even stand straight up."
        },
        "recordingDetails": {
          "location": {
            "latitude": 27.7,
            "longitude": 85.33333
          }
        }
      },
      {
        "id": "2",
        "snippet": {
          "publishedAt": "2015-05-01T20:54:51.000Z",
          "title": "Kathmandu Nepal Earthquake Traffic Camera CCTV caught on camera April 25 2015 11:51 AM",
          "description": "People literally walked on their knees because they couldn't even stand straight up."
        },
        "recordingDetails": {
          
        }
      }
    ]
  };
  R.forEach(function(item){
    D.trace("test_convert", item.sourceId);
  }, converter.convert(data));
};

test_as_search_record();
test_filter();
test_convert();
/*global require*/
var R = require("ramda");
var D = require("./../../digenti");
var converter = require("./../../youtube/converter");

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

test_as_search_record();
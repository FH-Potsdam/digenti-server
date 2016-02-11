/*global require,module*/
var request = require("request");
var qs = require("querystring");
var R = require("ramda");
var D = require("./../digenti");
var config = D.require("./config");

var apiBaseUrl = 'https://www.googleapis.com/youtube/v3';

var get_list = function(params, callback){

  var query = {
    part: 'snippet',
    type: 'video'
  };

  query = Object.assign(query, params); // merge two arrays
  var queryStr = qs.stringify(query);

  request.get(apiBaseUrl + '/search?' + queryStr+'&key=' + config.youtube.key, function (error, response, body) {
    if (error){
      D.trace("Error", error)
    }else if (response.statusCode != 200){
      D.trace("Error ", response.statusCode);
    }else{
      var mapping = R.pipe(JSON.parse, R.prop("items"), R.map(R.path(["id","videoId"])));
      callback(mapping(body));
    }
  });
  
}

var get_videos = function(idsArray, callback) {

  var query = {
    part: 'id,snippet,recordingDetails',
    id: idsArray.join(',')
  };
  
  var queryStr = qs.stringify(query);

  request.get(apiBaseUrl + '/videos?'+queryStr+'&key='+config.youtube.key, function (error, response, body) {
    if (error){
      D.trace("Error", error)
    }else if (response.statusCode != 200){
      D.trace("Error ", response.statusCode);
    }else{
      callback(JSON.parse(body));
    }
  });
  
}


var get = function(params, callback){

  
	return {
    "kind": "youtube#videoListResponse",
    "etag": "\"mPrpS7Nrk6Ggi_P7VJ8-KsEOiIw/DNgx6b5M5Mj6CkSPMzfycDeRXVE\"",
    "pageInfo": {
      "totalResults": 50,
      "resultsPerPage": 50
    },
    "items": [{
      "kind": "youtube#video",
      "etag": "\"mPrpS7Nrk6Ggi_P7VJ8-KsEOiIw/m4CnE9uWrlGBGBr3CPGDtKRM_2Q\"",
      "id": "btc020siGBo",
      "snippet": {
        "publishedAt": "2015-05-01T20:54:51.000Z",
        "channelId": "UC7OwfPsfaV2ihZHDotkOwI",
        "title": "Kathmandu Nepal Earthquake Traffic Camera CCTV caught on camera April 25 2015 11:51 AM",
        "description": "People literally walked on their knees because they couldn't even stand straight up.",
        "thumbnails": {
          "default": {
            "url": "https://i.ytimg.com/vi/btc020siGBo/default.jpg",
            "width": 120,
            "height": 90
          },
          "medium": {
            "url": "https://i.ytimg.com/vi/btc020siGBo/mqdefault.jpg",
            "width": 320,
            "height": 180
          },
          "high": {
            "url": "https://i.ytimg.com/vi/btc020siGBo/hqdefault.jpg",
            "width": 480,
            "height": 360
          }
        },
        "channelTitle": "Dan Singha",
        "tags": ["Traffic camera", "security camera", "Nepal earthquake", "quake", "Nepal quake", "cctv", "cctv camera", "Nepal", "Kathmandu", "Earthquake", "Camera", "Avalanche", "Everest", "Mt. Everest", "Mt everest", "Everest Avalanche"],
        "categoryId": "19",
        "liveBroadcastContent": "none",
        "localized": {
          "title": "Kathmandu Nepal Earthquake Traffic Camera CCTV caught on camera April 25 2015 11:51 AM",
          "description": "People literally walked on their knees because they couldn't even stand straight up."
        }
      },
      "recordingDetails": {
        "location": {
          "latitude": 27.7,
          "longitude": 85.33333,
          "altitude": 0
        }
      }
    }]
  };
};

// Module definitions
module.exports.get = get;
module.exports.get_list = get_list;
module.exports.get_videos = get_videos;
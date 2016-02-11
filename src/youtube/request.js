/*global require,module*/
var request = require('request');
var qs = require('querystring');
var D = require("./../digenti");
var config = D.require('./config');

var apiBaseUrl = 'https://www.googleapis.com/youtube/v3';



/*
module.exports = function (params, callback) {


  ///////////////////
  // Videos Query
  ///////////////////

  // More info: https://developers.google.com/youtube/v3/docs/videos/list

  function queryVideos(idsArray) {

    var query = {
      part: 'id,snippet,recordingDetails',
      id: idsArray.join(',')
    };

    var queryStr = qs.stringify(query);

    console.log("Querying geolocation of " + idsArray.length + " videos...");

    request.get(apiBaseUrl + '/videos?'+queryStr+'&key='+config.youtube.key, function (error, response, body) {
      if (error)
        return callback(error);
      else if (response.statusCode != 200)
        return callback("Error " + response.statusCode);

      console.log("Geolocation successfully retrieved.\n");

      try {
        data = JSON.parse(body);
      } catch (e) {
        return callback(error);
      }

      callback(null, data);
    });
  }
}

*/



var get = function(params){

  var query = {
    part: 'snippet',
    type: 'video'
  };

  query = Object.assign(query, params); // merge two arrays
  var queryStr = qs.stringify(query);

  console.log("Youtube video search...");

  request.get(apiBaseUrl + '/search?' + queryStr+'&key=' + config.youtube.key, function (error, response, body) {
    if (error)
      D.trace("Error", error)
    else if (response.statusCode != 200)
      D.trace("Error ", response.statusCode);
    else
      D.trace("Response", body);
      
      /*
    var json = JSON.parse(body);

    console.log(json.pageInfo.totalResults + " videos found. " + json.items.length + " parsed.");

    // Loop through all videos and get IDs
    var idsArray = [];
    for (var i=0; i<json.items.length; i++) {
      idsArray.push(json.items[i].id.videoId);
    }

    queryVideos(idsArray);
    */
  });
  
  
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

module.exports.get = get;


// Google API Query
// GET https://www.googleapis.com/youtube/v3/search?part=snippet&location=27.7167%2C85.3667&locationRadius=300km&maxResults=50&publishedAfter=2015-04-24T00%3A00%3A00Z&publishedBefore=2015-06-01T00%3A00%3A00Z&q=earthquake&regionCode=np&type=video&key={YOUR_API_KEY}

// geo-search-tool Query
// https://www.googleapis.com/youtube/v3/search?location=27.7172453%2C85.3239605&locationRadius=100km&maxResults=50&order=date&part=id%2Csnippet&publishedAfter=2014-11-18T07%3A03%3A13Z&publishedBefore=2015-07-01T21%3A33%3A11Z&q=Earthquake&type=video&videoEmbeddable=any&key=AIzaSyAEcfhZe0akd47CTYaEOWQ1bLCCbLUfVEY&videoLiscense=any

// More info: https://developers.google.com/youtube/v3/docs/search/list
/*global require,module*/
var request = require("request");
var qs = require("querystring");
var R = require("ramda");
var D = require("./../digenti");
var config = require("./../config");

var apiBaseUrl = 'https://www.googleapis.com/youtube/v3';

var get_list = function(callback, params){

  var query = {
    part: 'snippet',
    type: 'video'
  };

  query = Object.assign(query, params); // merge two arrays
  var queryStr = qs.stringify(query);

  request.get(apiBaseUrl + '/search?' + queryStr+'&key=' + config.youtube.key, function (error, response, body) {
    if (error){
      D.trace("Error", error);
    }else if (response.statusCode != 200){
      D.trace("Error ", response.statusCode);
    }else{
      var mapping = R.pipe(JSON.parse, R.prop("items"), R.map(R.path(["id","videoId"])));
      callback(mapping(body));
    }
  });
  
}

var get_videos = function(callback, idsArray) {

  var query = {
    part: 'id,snippet,recordingDetails',
    id: idsArray.join(',')
  };
  
  var queryStr = qs.stringify(query);

  request.get(apiBaseUrl + '/videos?'+queryStr+'&key='+config.youtube.key, function (error, response, body) {
    if (error){
      D.trace("Error", error);
    }else if (response.statusCode != 200){
      D.trace("Error ", response.statusCode);
    }else{
      callback(JSON.parse(body));
    }
  });
  
}


var get = function(callback, params){
  get_list(function(result){
    get_videos(callback, result);
  });
};

// Module definitions
module.exports.get = get;
module.exports.get_list = get_list;
module.exports.get_videos = get_videos;
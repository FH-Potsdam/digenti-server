var R = require("ramda");
var D = require("./../digenti");

var as_search_record = function(item){
  return D.create_search_record({
    sourceId: item.id,
    requestTitle: item.snippet.title,
    description: item.snippet.description,
    latitude: item.recordingDetails.location.latitude,
    longitude: item.recordingDetails.location.longitude,
    publishedAt: item.snippet.publishedAt,
    mediaUrl: 'https://www.youtube.com/watch?v='+item.id
  });
};

var convert = function(data){
	var mapping = R.pipe(R.prop("items"), R.map(as_search_record));
	return mapping(data);
}

module.exports.convert = convert;
module.exports.as_search_record = as_search_record;
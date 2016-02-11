var R = require("ramda");
var D = require("./../digenti");

var as_search_record = function(item){
  return D.create_search_record({
    sourceId: item.id,
    requestTitle: item.snippet.title,
    description: item.snippet.description,
    latitude: R.path(["recordingDetails", "location", "latitude"], item),
    longitude: R.path(["recordingDetails", "location", "longitude"], item),
    publishedAt: item.snippet.publishedAt,
    mediaUrl: 'https://www.youtube.com/watch?v='+item.id,
    dataSource: 'youtube',
    mediaType: 'video'
  });
};

var convert = function(data){
	var mapping = R.pipe(R.prop("items"), R.map(as_search_record));
	return mapping(data);
};

module.exports.convert = convert;
module.exports.as_search_record = as_search_record;

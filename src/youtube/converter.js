/*global require,module*/
var R = require("ramda");
var D = require("./../digenti");

var datasource = "youtube";

var as_search_record = function(item){
  return D.create_search_record({
    sourceId: item.id,
    title: D.nprop("snippet.title", item),
    description: D.nprop("snippet.description", item),
    latitude: D.nprop("recordingDetails.location.latitude", item),
    longitude: D.nprop("recordingDetails.location.longitude", item),
    publishedAt: D.parse_date(D.nprop("snippet.publishedAt", item)),
    mediaUrl: 'https://www.youtube.com/watch?v='+item.id,
    provider: datasource,
    mediaType: 'video'
  });
};

var convert = function(data){
	var mapping = R.pipe(R.prop("items"), R.map(as_search_record));
	return filter(mapping(data));
};

var filter = function(items){
  var check = item => (!R.isEmpty(item.latitude) && !R.isEmpty(item.longitude));
  return R.filter(check, items);
};

module.exports.convert = convert;
module.exports.as_search_record = as_search_record;
module.exports.datasource = datasource;
module.exports.filter = filter;

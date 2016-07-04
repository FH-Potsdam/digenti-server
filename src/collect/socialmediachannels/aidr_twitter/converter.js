var R = require("ramda");
var D = require("./../../../digenti");

var provider = "aidr";

var as_search_record = function(item){
  return D.create_search_record({
    sourceId: item.properties.tweet_id,
    title: item.properties.label,
    description: item.properties.tweet_text,
    latitude: item.geometry.coordinates[1],
    longitude: item.geometry.coordinates[0],
    publishedAt: D.parse_date(item.properties.tweet_time),
    mediaUrl: item.properties.tweet_url,
    provider: provider,
    mediaType: "text",
    mediaChannel: "twitter"
  });
};

var convert = function(data){
	var mapping = R.pipe(R.prop("features"), R.map(as_search_record));
	return mapping(data);
};

module.exports.convert = convert;
module.exports.as_search_record = as_search_record;
module.exports.provider = provider;
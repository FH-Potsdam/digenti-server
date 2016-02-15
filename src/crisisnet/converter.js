var R = require("ramda");
var D = require("./../digenti");

var datasource = "crisisnet";

var as_search_record = function(item){
  return D.create_search_record({
    sourceId: item.id,
    title: item.summary,
    description: item.content,
    latitude: item.geo.coords[1],
    longitude: item.geo.coords[0],
    publishedAt: D.parse_date(item.createdAt),
    updatedAt: D.parse_date(item.updatedAt),
    provider: datasource,
    mediaType: 'text'
  });
};

var convert = function(data){
	var mapping = R.pipe(R.prop("data"), R.map(as_search_record));
	return mapping(data);
};

module.exports.convert = convert;
module.exports.as_search_record = as_search_record;
module.exports.datasource = datasource;
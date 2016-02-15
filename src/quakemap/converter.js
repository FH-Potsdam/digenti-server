var R = require("ramda");
var D = require("./../digenti");

var datasource = "quakemap";

var as_search_record = function(item){
  return D.create_search_record({
    sourceId: item.properties.id,
    title: item.properties.title,
    description: item.properties.content,
    latitude: item.geometry.coordinates[1],
    longitude: item.geometry.coordinates[0],
    locationName: item.properties.location_name,
    eventAt: D.parse_date(item.properties.date_of_incident),
    publishedAt: D.parse_date(item.properties.created),
    updatedAt: D.parse_date(item.properties.updated),
    provider: datasource,
    mediaType: 'text'
  });
};

var convert = function(data){
	var mapping = R.pipe(R.prop("features"), R.map(as_search_record));
	return mapping(data);
};

module.exports.convert = convert;
module.exports.as_search_record = as_search_record;
module.exports.datasource = datasource;
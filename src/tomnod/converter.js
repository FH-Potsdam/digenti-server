var R = require("ramda");
var D = require("./../digenti");

var as_search_record = function(item){
  return D.create_search_record({
    sourceId: item.properties.id,
    requestTitle: item.properties.tag_type,
    latitude: item.geometry.coordinates[1],
    longitude: item.geometry.coordinates[0],
    publishedAt: item.properties.created_at,
    updatedAt: item.properties.updated_at,
    mediaUrl: item.properties.chip_url,
    dataSource: 'tomnod',
    mediaType: 'image'
  });
};

var convert = function(data){
	var mapping = R.pipe(R.prop("features"), R.map(as_search_record));
	return mapping(data);
}

module.exports.convert = convert;
module.exports.as_search_record = as_search_record;
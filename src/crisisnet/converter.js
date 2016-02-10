var R = require("ramda");
var D = require("./../digenti");

var as_search_record = function(item){
  return D.create_search_record({
    sourceId: item.id,
    requestTitle: item.summary,
    description: item.content,
    latitude: item.geo.coords[1],
    longitude: item.geo.coords[0],
    publishedAt: item.createdAt,
    updatedAt: item.updatedAt,
    dataSource: 'crisisnet',
    mediaType: 'text'
  });
};

var convert = function(data){
	var mapping = R.pipe(R.prop("data"), R.map(as_search_record));
	return mapping(data);
}

module.exports.convert = convert;
module.exports.as_search_record = as_search_record;
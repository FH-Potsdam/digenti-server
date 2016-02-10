var get = function(){
	console.log("request tomnod");
	return {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [84.385697,
        28.031402]
      },
      "properties": {
        "cartodb_id": 2972,
        "id": 204272,
        "tagger_id": 14921816,
        "agreement": 1,
        "overlay_id": 3819,
        "type_id": 24,
        "tag_type": "Damaged Building",
        "chip_url": "",
        "chip_size": "",
        "score": 0.903756,
        "updated_at": "2015-05-01T14:27:02Z",
        "created_at": "2015-05-01T14:27:02Z"
      }
    }]
  };
};

module.exports.get = get;
/*global require,module*/
var D = require("./../digenti");

var get = function(callback){
	D.get_json_from_file("./../data/quakemap.geojson", callback);
};

// Module definitions
module.exports.get = get;
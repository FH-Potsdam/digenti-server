/*global require,module*/
var D = require("./../../../digenti");

var get = function(callback){
	D.get_json_from_file("./../data/vgi/aidr_twitter.geojson", callback);
};

// Module definitions
module.exports.get = get;
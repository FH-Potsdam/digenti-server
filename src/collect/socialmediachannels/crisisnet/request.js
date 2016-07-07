/*global require,module*/
var D = require("./../../../digenti");

var get = function(callback){
	D.get_json_from_file("./../data/vgi/crisisnet.json", callback);
};

// Module definitions
module.exports.get = get;
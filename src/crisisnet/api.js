var converter = require("./converter");
var request = require("./request");

var get = function(){
	console.log("collect crisisNET data");
	return converter.convert(request.get());
};

module.exports.get = get;
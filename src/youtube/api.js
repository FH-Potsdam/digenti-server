var converter = require("./converter");
var request = require("./request");

var get = function(){
	console.log("collect youtube");
	return converter.convert(request.get());
};

module.exports.get = get;
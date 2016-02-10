var converter = require("./converter");
var request = require("./request");

var get = function(){
	console.log("collect quakemap data");
	return converter.convert(request.get());
};

module.exports.get = get;
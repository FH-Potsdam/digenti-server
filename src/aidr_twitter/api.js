var converter = require("./converter");
var request = require("./request");

var get = function(){
	console.log("collect aidr_twitter");
	return converter.convert(request.get());
};

module.exports.get = get;
module.exports.datasource = converter.datasource;
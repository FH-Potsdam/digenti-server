var converter = require("./converter");
var request = require("./request");

var get = function(){
	console.log("collect tomnod data");
	return converter.convert(request.get());
};

module.exports.get = get;
module.exports.datasource = converter.datasource;
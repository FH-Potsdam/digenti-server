var converter = require("./converter");
var request = require("./request");

function get(){
	return converter.convert(request.get());
}

module.exports.get = get;
var converter = require("./converter");
var request = require("./request");
var config = require("./../config");

var get = function(callback){
	console.log("collect youtube");
  request.get(function(result){
    var search_items = converter.convert(result);
    callback(search_items);
  }, config.youtube.params);
};

module.exports.get = get;
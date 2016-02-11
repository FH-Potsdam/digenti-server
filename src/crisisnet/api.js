var converter = require("./converter");
var request = require("./request");

var get = function(callback){
	console.log("collect crisisNET data");
  request.get(function(result){
    var search_items = converter.convert(result);
    callback(search_items);
  }, {});
};

module.exports.get = get;
module.exports.datasource = converter.datasource;
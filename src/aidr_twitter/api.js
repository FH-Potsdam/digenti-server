var converter = require("./converter");
var request = require("./request");
var config = require("./../config");

var get = function(callback){
  console.log("collect aidr_twitter");
  request.get(function(result){
    var search_items = converter.convert(result);
    callback(search_items);
  }, config.twitter.params);
};

module.exports.get = get;
module.exports.provider = converter.provider;
/*global require*/
var R = require("ramda");
var D = require("./../digenti");
var db = D.require("./collect/database");
var twitter = D.require("./aidr_twitter/api");
var youtube = D.require("./youtube/api");

var collect = function(){
	R.forEach(function(channel){ 
    db.update(channel.get());
	}, [twitter, youtube]);
};

collect();

// Module definitions
module.exports.collect = collect;
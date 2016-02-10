/*global require*/
var R = require("ramda");
var D = require("./../digenti");
var db = D.require("./collect/database");
var twitter = D.require("./aidr_twitter/api");

var collect = function(){
	R.forEach(function(channel){ 
    db.update(channel.get());
	}, [twitter]);
};

collect();

// Module definitions
module.exports.collect = collect;
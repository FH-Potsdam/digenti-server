/*global require*/
var R = require("ramda");
var D = require("./../digenti");
var db = D.require("./collect/database");
var twitter = D.require("./aidr_twitter/api");
var youtube = D.require("./youtube/api");
var crisisnet = D.require("./crisisnet/api");
var quakemap = D.require("./quakemap/api");
var tomnod = D.require("./tomnod/api");

var collect = function(){
	R.forEach(function(channel){ 
    db.delete_all(channel.datasource);
    channel.get(db.update);
	}, [youtube, twitter, crisisnet, quakemap, tomnod]);
};

// Module definitions
module.exports.collect = collect;
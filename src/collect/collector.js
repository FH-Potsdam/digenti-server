/*global require*/
var R = require("ramda");
var D = require("./../digenti");
var db = D.require("./collect/database");
var twitter = D.require("./collect/socialmediachannels/aidr_twitter/api");
var youtube = D.require("./collect/socialmediachannels/youtube/api");
var crisisnet = D.require("./collect/socialmediachannels/crisisnet/api");
var quakemap = D.require("./collect/socialmediachannels/quakemap/api");
var tomnod = D.require("./collect/socialmediachannels/tomnod/api");

var prepare_database = function(){
	db.prepare_database();
};

var collect = function(){
	R.forEach(function(channel){
    db.delete_all(channel.provider, function(){
    	channel.get(db.update);
    });
	}, [youtube, twitter, crisisnet, quakemap, tomnod]);
};

// Module definitions
module.exports.collect = collect;
module.exports.prepare_database = prepare_database;

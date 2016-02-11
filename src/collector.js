var config, R, database, twitter;

// force nodejs to re-require all modules
var init = function(){
	require("./unrequire").clear();
	config = require("./config");
	R = require("ramda");
	database = require("./database");
	twitter = require("./aidr_twitter/api");
};

var collect = function(){
	init();
	R.forEach(function(channel){ 
		database.upsert(channel.get());
	}, [twitter]);
};

module.exports.collect = collect;

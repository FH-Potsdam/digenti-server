var config, R, database, twitter;

// force nodejs to re-require all modules
function init(){
	require("./unrequire").clear();
	config = require("./config");
	R = require("ramda");
	database = require("./database");
	twitter = require("./aidr_twitter/api");
}

function collect(){
	init();
	R.forEach(function(channel){ 
		console.log("calling collect");
		var data = channel.get();
		database.upsert(data);
	}, [twitter]);
}

module.exports.collect = collect;
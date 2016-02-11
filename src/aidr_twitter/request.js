/*global require,module*/
var D = require("./../digenti");
var config = D.require('./config');
var Twitter = D.require('twitter');

var client = new Twitter({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token_key: config.twitter.access_token_key,
  access_token_secret: config.twitter.access_token_secret
});

var get = function(params){
  client.get("search/tweets", params, function(err, tweets, response){
    if (err) {
      D.trace("Error", err);
    }else{
      D.trace("Response", tweets);
    }
  });

	return {
	  "type": "FeatureCollection",
	  "features": [
		{
		  "type": "Feature",
		  "properties": {
			"tweet_id": "'591906453306249216'",
			"tweet_time": "Sat Apr 25 10:07:50 +0000 2015",
			"tweet_author": "jonikanerva",
			"tweet_author_id": "13137242",
			"tweet_language": "en",
			"tweet_text": "Felt the Kathmandu earthquake here in Dengboche. Really strong. One wall and the ceiling collapsed on our guesthouse. Nobody got injured.",
			"tweet_url": "https://twitter.com/jonikanerva/status/591906453306249216",
			"label": "Infrastructure and utilities"
		  },
		  "geometry": {
			"type": "Point",
			"coordinates": [
			  86.822297,
			  27.952658
			]
		  }
		}
	  ]
	};
};

// Module definitions
module.exports.get = get;

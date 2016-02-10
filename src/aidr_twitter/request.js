var get = function(){
	console.log("request data");
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

module.exports.get = get;
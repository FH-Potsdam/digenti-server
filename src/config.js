/*global module*/
var config = {
  secret: 'QgbU4KhpGd'
};

config.db = {};
config.db.url = "postgres:postgres@moa:5434/digenti";
config.db.searchtable = "search_items";
config.server={};
config.server.port = 2305;


// Twitter API Settings
config.twitter = {};
config.twitter.consumer_key = 'YOUR_CONSUMER_KEY';
config.twitter.consumer_secret = 'YOUR_CONSUMER_SECRET';
config.twitter.access_token_key = 'YOUR_TOKEN_KEY';
config.twitter.access_token_secret = 'YOUR_TOKEN_SECRET';
config.twitter.params = {};

// Youtube API Settings
config.youtube = {};
config.youtube.key = 'AIzaSyDjy0jrxq79NkRnlC9oHYWODg9HyMaXmRA';
config.youtube.params = {
  part: 'snippet',
  location: '27.7167,85.3667',
  locationRadius: '300km',
  maxResults: 20,
  publishedAfter: '2015-04-24T00:00:00Z',
  publishedBefore: '2015-06-01T00:00:00Z',
  q: 'earthquake',
  regionCode: 'np',
  type: 'video'
};

module.exports = config;

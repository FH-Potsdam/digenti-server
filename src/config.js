/*global module*/
var config = {};

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

// Youtube API Settings
config.youtube = {};
config.youtube.key = 'AIzaSyDjy0jrxq79NkRnlC9oHYWODg9HyMaXmRA';

module.exports = config;

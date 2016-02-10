/*global module*/
var config = {};

config.db = {};
config.db.url = "postgres:postgres@moa:5434/digenti";
config.db.searchtable = "search_items";
config.server={};
config.server.port = 2305;

module.exports = config;

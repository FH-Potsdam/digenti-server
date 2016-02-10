/*global require*/
// REST API Search Server
var R = require("ramda");
var D = require("../digenti");
var db = D.require("./database");
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var config = D.require('./config');

var app = express();

///////////////////////
// Server Middleware
///////////////////////

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// CORS
// This allows client applications from other domains use the API Server
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//////////////
// REST API
//////////////
var defaultQuery = {
  maxResults: 50,
  location: "27.7167,85.3667",
  locationRadius: "300km",
  publishedAfter: "2015-04-24T00:00:00Z",
  publishedBefore: "2015-06-01T00:00:00Z",
  "q": ""
};

var search = function(req,res){
  var query = R.merge(defaultQuery,req.body);
  D.trace("query:",query);
  var keywords = db.csv_text(query.q);
  var ilike_title = db.ilike_column("requesttitle");
  var ilike_desc = db.ilike_column("description");
  var sql = "SELECT * FROM search_items WHERE "
            +ilike_title(keywords)+" OR "+ilike_desc(keywords)
            +" LIMIT "+query.maxResults+";";
  db.query(sql,function(resultSet){
    res.json({dev:{ sql: sql},query:req.body, count:resultSet.rowCount,records:resultSet.rows}); 
  });
};
//app.get("/search",search);
app.post("/search",search);

//////////////////
// Server Setup
//////////////////

// Create Express.js HTTP Server
var server = app.listen(process.argv[2] || config.server.port, function () {
  D.trace('Digenti server listening on port ', server.address().port);
});

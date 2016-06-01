/*global require*/
// REST API Search Server
var R = require("ramda");
var D = require("../digenti");
var db = D.require("./database");
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var config = D.require('./config');
var collector = D.require('./collect/collector');
var searcher = D.require('./search/searcher');
var fosqueries = D.require('./search/fosqueries');

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
var protect_by_key = R.curry(function(fun_to_protect,req,res){
  if(req.body.secret===config.secret){
    fun_to_protect();
    res.send("Success");
  }else{
    res.send("Error");
  }
});

app.get("/search/fos/point", fosqueries.searchFosByPoint);
app.get("/search/places/fos", fosqueries.searchPlacesByFos);
app.get("/search", searcher.search);

app.post("/search/fos/point", fosqueries.searchFosByPoint);
app.post("/search/places/fos", fosqueries.searchPlacesByFos);
app.post("/search", searcher.search);
app.post("/collect",protect_by_key(collector.collect));
app.post("/prepare",protect_by_key(collector.prepare_database));

//////////////////
// Server Setup
//////////////////

// Create Express.js HTTP Server
var server = app.listen(process.argv[2] || config.server.port, function () {
  D.trace('Digenti server listening on port ', server.address().port);
});

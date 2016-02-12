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
  publishedAfter: "2016-01-01T00:00:00Z", 
  publishedBefore: "2015-01-01T00:00:00Z",
  "q": ""
};

var dateQuery = function(query){
  var between_before_after = R.map(db.date_between(query.publishedBefore,query.publishedAfter));
  var or_betweens = R.compose(db.or,between_before_after);
  return or_betweens(['publishedat','eventat','updatedat']);
};

var locationQuery = function(query){
  var point = R.replace(',',' ',query.location);
  var radius = parseInt(query.locationRadius)*1000+".0";
  var result = "ST_DWithin(ST_Point(CAST(latitude as float),CAST(longitude as float))::geography,ST_GeographyFromText('SRID=4326;POINT("+point+")'),"+radius+")";
  return result;
};

var search = function(req,res){
  var query = R.merge(defaultQuery,req.body);
  D.trace("query:",query);
  var keywords = db.csv_text(query.q);
  var ilike_title = db.ilike_column("requesttitle");
  var ilike_desc = db.ilike_column("description");
  var from =" FROM "+config.db.searchtable;
  var count = "SELECT count(*)", allColumns="SELECT *";
  var where = " WHERE ("+ilike_title(keywords)+" OR "+ilike_desc(keywords)+")"
    +" AND ("+locationQuery(query)+")"
    +" AND ("+dateQuery(query)+")"
    +" LIMIT "+query.maxResults+";";
  var countSql = count+from+where;
  var allSql = allColumns+from+where;
  db.query(countSql,function(resultSet){
    var hits = resultSet.rows[0];
    db.query(allSql,function(resultSet){
      res.json({ dev: { sql: allSql}, hits: hits,query: req.body,count: resultSet.rowCount,records : resultSet.rows });
    });
  });
};
app.get("/search",search);
app.post("/search",search);

//////////////////
// Server Setup
//////////////////

// Create Express.js HTTP Server
var server = app.listen(process.argv[2] || config.server.port, function () {
  D.trace('Digenti server listening on port ', server.address().port);
});

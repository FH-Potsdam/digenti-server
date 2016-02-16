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
  offset: 0,
  location: "27.7167,85.3667",
  locationRadius: "300km",
  publishedAfter: "2016-01-01T00:00:00Z",
  publishedBefore: "2015-01-01T00:00:00Z",
  "q": ""
};

var dates = function(query){
  var between_before_after = R.compose(db.or,R.map(db.date_between(query.publishedBefore,query.publishedAfter)));
  return between_before_after(['publishedat','eventat','updatedat']);
};

var locations = function(query){
  var point = R.replace(',',' ',query.location);
  var radius = parseInt(query.locationRadius)*1000+".0";
  var result = "ST_DWithin(ST_Point(CAST(latitude as float),CAST(longitude as float))::geography,ST_GeographyFromText('SRID=4326;POINT("+point+")'),"+radius+")";
  return result;
};

var keywords = function(query){
  var keywords = db.csv_text(query.q);
  var apply_to_keywords = function(column){ return db.ilike_column(column)(keywords);};
  return db.or(R.map(apply_to_keywords,["title","description"]));
};

var search = function(req,res){
  var query = R.merge(defaultQuery,req.body);
  D.trace("query:",query);
  var where = " WHERE 1 = 1";
  var limit_and_offset = " LIMIT "+D.quote_sql(query.maxResults)+" OFFSET "+D.quote_sql(query.offset)+";";
  if(R.not(R.isNil(query.where))){
    where = " WHERE "+query.where+limit_and_offset;
  }else{
    var clauses = [keywords,locations,dates];
    where = " WHERE "+db.and(R.map(function(fun){ return fun(query);},clauses))+limit_and_offset;
  }
  var from =" FROM "+config.db.searchtable;
  var count = "SELECT count(*)", allColumns="SELECT *";
  var columns = allColumns;
  if(R.not(R.isNil(query.columns))){
    columns = "SELECT "+D.quote_sql(query.columns);
  }
  var countSql = count+from+where;
  var allSql = columns+from+where;
  db.query(countSql,function(resultSet){
    var hits = resultSet.rows[0];
    db.query(allSql,function(resultSet){
      res.json({ dev: { sql: allSql}, hits: hits,query: req.body,count: resultSet.rowCount,records : resultSet.rows });
    });
  });
};

var import_data = function(req,res){
  D.trace("Starting import data ...","");
  collector.collect();
  res.send("Imported data");
};

app.get("/search",search);
app.post("/search",search);
app.get("/wosollenwirhinziehen",import_data);

//////////////////
// Server Setup
//////////////////

// Create Express.js HTTP Server
var server = app.listen(process.argv[2] || config.server.port, function () {
  D.trace('Digenti server listening on port ', server.address().port);
});

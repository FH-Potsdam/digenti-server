/*global require*/
var R = require("ramda");
var D = require("../digenti");
var db = D.require("./database");
var config = D.require('./config');

var defaultQuery = {
  max: 10,
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
  var limit_and_offset = " LIMIT "+D.quote_sql(query.max)+" OFFSET "+D.quote_sql(query.offset)+";";
  if(R.not(R.isNil(query.where))){
    where = " WHERE "+query.where;
  }else{
    var clauses = [keywords,locations,dates];
    where = " WHERE "+db.and(R.map(function(fun){ return fun(query);},clauses));
  }
  var from =" FROM "+config.db.searchtable;
  var count = "SELECT count(*)", allColumns="SELECT title,description,relevance,locationname,latitude,longitude,eventat,publishedat,updatedat,provider,mediachannel,mediatype,mediaurl";
  var columns = allColumns;
  if(R.not(R.isNil(query.columns))){
    columns = "SELECT "+D.quote_sql(query.columns);
  }
  var countSql = count+from+where;
  var allSql = columns+from+where+limit_and_offset;
  db.query(countSql,function(hitResults){
    var hits = parseInt(hitResults.rows[0].count);
    db.query(allSql,function(queryResults){
      res.json({
        dev: { sql: allSql},
        hits: hits,
        query: req.body,
        count: queryResults.rowCount,
        records : queryResults.rows });
    });
  });
};

// Module definitions
module.exports.search = search;

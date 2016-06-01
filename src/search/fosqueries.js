/*global require*/
var R = require("ramda");
var D = require("../digenti");
var db = D.require("./database");
var config = D.require('./config');

var fos_table = "colombia_aoi_factor_of_savety";
var places_table = "places_aoi_2d";


var defaultFosByPointQuery = {
  location: "-73.0270699,10.3910411", // 1;"468769318";"Manaure Balcón del Cesar";"town";;"POINT(-73.0270699 10.3910411)"
  locationRadius: 5 // pixel
};

var defaultPlacesByFosQuery = {
	max: 5,
  offset: 0,
  fosmin: 4,
  fosmax: 5,
  locationRadius: 5 // pixel
};

var fosminmax = function(query){return stneighborhood(D.to_int(query.locationRadius), "avg") + " >= " + D.to_int(query.fosmin) + " AND " + stneighborhood(D.to_int(query.locationRadius), "avg") + " <= " + D.to_int(query.fosmax)};
var stintersects = function(query){return "ST_Intersects(geom, rast)";};
var stpoint = function(location){return "ST_GeomFromText('POINT( " + R.replace(',',' ', D.quote_sql(location)) + ")', 4326)";};
var stneighborhood = function(radius, calc){return "(SELECT " + calc + "(s) FROM UNNEST(ST_Neighborhood(rast, geom, " + radius + ", " + radius + ")) s)";};
var stneighborhood_as = R.curry(function(radius, calc){return db.as(calc, stneighborhood(radius, calc));});

var searchFosByPoint = function(req, res){
  var query = R.merge(defaultFosByPointQuery, req.body);
  D.trace("query:", query);
  
  // COLUMNS
  var subselect = stneighborhood_as(D.to_int(query.locationRadius));
  var columns = db.comma(R.map(subselect, ["avg", "sum", "max"]));
  
  // FROM
  var from =" FROM " + fos_table + ", (SELECT (" + stpoint(query.location) + ") AS geom) foo";
  
  // WHERE
  var clauses = [stintersects];
  var where = " WHERE " + db.and(R.map(function(fun){ return fun(query);}, clauses));
  
  // SELECT 
  var select = "SELECT " + columns + from + where + ";";
  
  db.query(select, function(results){
		res.json({
      dev: { sql: select},
      query: req.body,
      count: results.rowCount,
      records : results.rows 
    });
  });
};

var searchPlacesByFos = function(req, res){
  var query = R.merge(defaultPlacesByFosQuery, req.body);
  D.trace("query:", query);
  
  // COLUMNS
  var subselect = stneighborhood_as(D.to_int(query.locationRadius));
  var columns = places_table + ".*, " + db.comma(R.map(subselect, ["avg", "sum", "max"]));
  
  // FROM
  var from = " FROM " + db.comma([fos_table, places_table]);
  
  // WHERE
  var clauses = [stintersects, fosminmax];
  var where = " WHERE " + db.and(R.map(function(fun){ return fun(query);}, clauses));
  
  // LIMIT
  var limit = db.limit_and_offset(query.max, query.offset);
  
  // SELECT
  var select = "SELECT " + columns + from + where + limit + ";";
  var count = "SELECT count(*) " + from + where + ";";
    
  db.query(count, function(hits){
  	var hits = D.to_int(hits.rows[0].count);
  	db.query(select, function(results){
			res.json({
	      dev: { sql: select},
	      hits: hits,
	      query: req.body,
	      count: results.rowCount,
	      records : results.rows 
	    });
  	});
  });
};

// Module definitions
module.exports.searchFosByPoint = searchFosByPoint;
module.exports.searchPlacesByFos = searchPlacesByFos;

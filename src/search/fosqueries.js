/*global require*/
var R = require("ramda");
var D = require("../digenti");
var db = D.require("./database");
var config = D.require('./config');

var fos_table = "colombia_aoi_factor_of_savety";
var places_table = "places_aoi_2d";


var defaultFosByPointQuery = {
  location: "-73.0270699,10.3910411", // 1;"468769318";"Manaure Balcón del Cesar";"town";;"POINT(-73.0270699 10.3910411)"
  locationRadius: "5" // pixel
};

var locations = function(query){
  var point = R.replace(',',' ',query.location);
  var radius = parseInt(query.locationRadius)*1000+".0";
  var result = "ST_DWithin(ST_Point(CAST(latitude as float),CAST(longitude as float))::geography,ST_GeographyFromText('SRID=4326;POINT("+point+")'),"+radius+")";
  return result;
};

var intersects = function(query){
  return "ST_Intersects(geom, rast)";
};

var searchFosByPoint = function(req, res){
  var query = R.merge(defaultFosByPointQuery, req.body);
  D.trace("query:", query);
  
  // SELECT
  var radius = parseInt(query.locationRadius, 10);
  var subselect = function(i){return "(SELECT " + i + "(s) FROM UNNEST(ST_Neighborhood(rast, geom, " + radius + ", " + radius + ")) s) AS " + i;};
  var columns = "SELECT " + R.map(subselect, ["avg", "sum", "max"]);
  
  // FROM
  var point = R.replace(',',' ', query.location);
  var from =" FROM " + fos_table + ", (SELECT ST_GeomFromText('POINT( " + point + ")', 4326) AS geom) foo";
  
  // WHERE
  var clauses = [intersects];
  var where = " WHERE " + db.and(R.map(function(fun){ return fun(query);}, clauses));
  
  var select = columns + from + where + ";";
  
  D.trace("select:", select);
    
  db.query(select, function(queryResults){
		res.json({
      dev: { sql: select},
      query: req.body,
      count: queryResults.rowCount,
      records : queryResults.rows 
    });
  });
};

// Module definitions
module.exports.searchFosByPoint = searchFosByPoint;

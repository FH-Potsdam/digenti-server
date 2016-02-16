/*global require,module*/
var D = require("./../digenti");
var R = require("ramda");
var db = D.require("./database");
var config = D.require("./config");

var delete_all = function(provider, callback){
  if(!provider) return;
  var print_result = R.pipe(R.prop("command"), D.trace("executed"));
  db.query(delete_query(provider), function(result){
  	print_result(result);
  	if(callback) callback(result);
  });
};

var update = function(data, callback){
  var print_result = R.pipe(R.prop("command"), D.trace("executed"));
  R.forEach(function(item){
    db.query(search_record_as_sql(item),  function(result){
	  	print_result(result);
	  	if(callback) callback(result);
	  });
  }, data);
};

var create_table_for_search_record = function(){
  var print_result = R.pipe(R.prop("command"), D.trace("executed"));
  db.query(create_table_query(), print_result);
};

var search_record_as_sql = function(item){
  var columns = R.pipe(R.keys,D.join_with_comma);
  var values = R.pipe(R.values,R.map(D.sql_str_value),D.join_with_comma);
  return "INSERT INTO " + config.db.searchtable + " ("+columns(item)+") VALUES (" + values(item) + ");";
};

var delete_query = function(provider){
  return "DELETE FROM " + config.db.searchtable + " WHERE provider LIKE '" + provider + "';"; 
};

var create_table_query = function(){
  var sqlColumns = R.pipe(R.keys,R.map(D.suffix(" text")),D.join_with_comma);
  var freetextColumn = ", freetext tsvector";
  return "CREATE TABLE IF NOT EXISTS " + config.db.searchtable + " (" + sqlColumns(D.search_record) + freetextColumn + ");";
};

var totsvector = function(language, fields){
	return "to_tsvector('" + language + "', concat_ws(' ', " + fields.join(",") + "))";
};

// Module definitions
module.exports.update = update;
module.exports.delete_all = delete_all;
module.exports.create_table_for_search_record = create_table_for_search_record;
module.exports.create_table_query = create_table_query;
module.exports.totsvector = totsvector;
module.exports.search_record_as_sql = search_record_as_sql;
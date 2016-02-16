/*global require,module*/
var D = require("./../digenti");
var R = require("ramda");
var db = D.require("./database");
var config = D.require("./config");


var prepare_database = function(callback){
	var query = drop_table_query() + create_table_query() + trigger_query() + create_index_query();
	db.query(query, function(result){
  	if(callback) callback(result);
  });
}

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

var drop_table_query = function(){
  return "DROP TABLE IF EXISTS " + config.db.searchtable + ";";
};

var totsvector = function(language, fields){
	return "to_tsvector('" + language + "', concat_ws(' ', " + fields.join(",") + "))";
};

var update_tsvector = R.curry(function(table,lang,tsvector_column,src_columns){
  var sql = "UPDATE " + table + " SET " + tsvector_column + " = " + totsvector(lang, src_columns) + ";";
  query(sql,D.trace("Updated by "+sql));
});

// Usage for example: update_freetext(['title','description','locationname','provider','mediaurl']);
var update_freetext = update_tsvector(config.db.searchtable,'english','freetext');

// TODO: use parameters/config
var trigger_query = function(){
	var str = `
		CREATE OR REPLACE FUNCTION update_search_items_freetext()
  	RETURNS trigger AS
		$BODY$
		BEGIN
 			NEW.freetext = to_tsvector('english', concat_ws(' ', NEW.title, NEW.description, NEW.locationname, NEW.provider, NEW.mediaurl));
 			RETURN NEW;
		END 
		$BODY$  LANGUAGE plpgsql;
		DROP TRIGGER IF EXISTS search_items_freetext ON search_items;
		CREATE TRIGGER search_items_freetext BEfORE INSERT OR UPDATE ON search_items
  	FOR EACH ROW
  	EXECUTE PROCEDURE update_search_items_freetext();
  `;
  return str;
};

// TODO: use parameters/config
var create_index_query = function(){
	return "CREATE INDEX search_items_freetext_idx ON search_items USING gin(freetext)";
};


// Module definitions
module.exports.update = update;
module.exports.delete_all = delete_all;
module.exports.create_table_for_search_record = create_table_for_search_record;
module.exports.create_table_query = create_table_query;
module.exports.totsvector = totsvector;
module.exports.search_record_as_sql = search_record_as_sql;
module.exports.prepare_database = prepare_database;
module.exports.update_tsvector = update_tsvector;
module.exports.update_freetext = update_freetext;
/*global require,module*/
var D = require("./../digenti");
var R = require("ramda");
var db = D.require("./database");
var config = D.require("./config");

var delete_all = function(datasource){
  if(!datasource) return;
  var print_result = R.pipe(R.prop("command"), D.trace("executed"));
  db.query(delete_query(datasource), print_result);
}

var update = function(data){
  var print_result = R.pipe(R.prop("command"), D.trace("executed"));
  R.forEach(function(item){
    db.query(search_record_as_sql(item), print_result);
  }, data);
};

var search_record_as_sql = function(item){
  var columns = R.pipe(R.keys,D.join_with_comma);
  var values = R.pipe(R.values,R.map(D.sql_str_value),D.join_with_comma);
  return "INSERT INTO " + config.db.searchtable + " ("+columns(item)+") VALUES ("+values(item)+");";
};

var delete_query = function(datasource){
  return "DELETE FROM " + config.db.searchtable + " WHERE datasource LIKE '" + datasource + "';"; 
}

// Module definitions
module.exports.update = update;
module.exports.delete_all = delete_all;
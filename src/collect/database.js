/*global require,module*/
var D = require("./../digenti");
var R = require("ramda");
var db = D.require("./database");
var config = D.require("./config");

var update = function(data){
	D.trace("performing database ops. ");
  var print_result = R.pipe(R.prop("command"), D.trace("executed "));
  R.forEach(function(item){
    db.query(search_record_as_sql(item), print_result);
  }, data);
};

var search_record_as_sql = function(item){
  var columns = R.pipe(R.keys,D.join_with_comma);
  var values = R.pipe(R.values,R.map(D.sql_str_value),D.join_with_comma);
  return "INSERT INTO " + config.db.searchtable + " ("+columns(item)+") VALUES ("+values(item)+");";
};

// Module definitions
module.exports.update = update;
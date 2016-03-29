/*global require*/
var fs = require('fs');
var R = require("ramda");
var D = require("./../digenti");
var converter = require("./converter");

var json_to_sql = function(filename){
  var json_to_sql = R.pipe(converter.as_search_record,D.search_record_as_sql);
  var sql_str =  R.pipe(D.from_json,R.prop("features"),R.map(json_to_sql),R.join("\n"));
  fs.readFile(filename, 'utf8', function (err, lines) {
    if (err) throw err;
    var sql = D.create_table_for_search_record()+"\n"+sql_str(lines);
    fs.writeFile(filename+'.sql', sql, function (err) {
      if (err) throw err;
    });
  });
};

// Module definitions
exports.json_to_sql = json_to_sql;
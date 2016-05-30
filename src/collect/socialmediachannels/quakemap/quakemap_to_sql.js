/*global require*/
var fs = require('fs');
var R = require("ramda");
var D = require("./digenti");

var as_search_record = function(item){
  return R.merge(R.clone(D.search_record),{
    sourceId: item.properties.id,
    requestTitle: item.properties.title,
    description: item.properties.content,
    latitude: item.geometry.coordinates[1],
    longitude: item.geometry.coordinates[0],
	locationName: item.properties.location_name,
	eventAt: item.properties.date_of_incident,
    publishedAt: item.properties.created,
	updatedAt: item.properties.updated,
	dataSource: 'quakemap',
	mediaType: 'text'
  });
};

var json_to_sql = function(filename){
  var json_to_sql = R.pipe(as_search_record,D.search_record_as_sql);
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
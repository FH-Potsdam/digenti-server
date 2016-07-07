/*global require*/
var fs = require('fs');
var R = require("ramda");
var D = require("./digenti");

var youtube_as_search_record = function(item){
  return R.merge(R.clone(D.search_record),{
    sourceId: item.id,
    requestTitle: item.snippet.title,
    description: item.snippet.description,
    latitude: item.recordingDetails.location.latitude,
    longitude: item.recordingDetails.location.longitude,
    publishedAt: item.snippet.publishedAt,
    mediaUrl: 'https://www.youtube.com/watch?v='+item.id
  });
};

var youtube_json_to_sql = function(filename){
  var json_to_sql = R.pipe(youtube_as_search_record,D.search_record_as_sql);
  var sql_str =  R.pipe(D.from_json,R.prop("items"),R.map(json_to_sql),R.join("\n"));
  fs.readFile(filename, 'utf8', function (err, lines) {
    if (err) throw err;
    var sql = D.create_table_for_search_record()+"\n"+sql_str(lines);
    fs.writeFile(filename+'.sql', sql, function (err) {
      if (err) throw err;
    });
  });
};

// Module definitions
exports.json_to_sql = youtube_json_to_sql;
/* Example: reads videos.json and write videos.json.sql
var y = require("../data/vgi/youtube_to_sql");
y.json_to_sql('videos.json');
*/

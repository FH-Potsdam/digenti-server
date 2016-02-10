/*global require*/
// See also: https://www.npmjs.com/package/pg
var pg = require('pg');
var con_url = "postgres://postgres:postgres@moa:5434/digenti";

var client = new pg.Client(con_url);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT ST_AsText(ST_MakePoint(1.0, 2.0));', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0]);
    client.end();
  });
});


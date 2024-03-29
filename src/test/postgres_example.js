/*global require*/
// See also: https://www.npmjs.com/package/pg
var pg = require('pg');
var D = require("./../digenti");
var db_url = require("./../config").db.url;

var client = new pg.Client(db_url);
client.connect(function(err) {
  if(err) {
     D.error('could not connect to postgres', err);
  }
  client.query('SELECT ST_AsText(ST_MakePoint(1.0, 2.0));', function(err, result) {
    if(err) {
      D.error('error running query', err);
    }
    D.trace("Result:",result.rows[0]);
    client.end();
  });
});


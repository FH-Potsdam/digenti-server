/*global require,module*/
var D = require("./digenti");
var pg = D.require("pg");
var config = D.require("./config");

var upsert = function(data){
	D.trace("performing database ops. ", data);
};

var query = function(sql,resultFun){
  var client = new pg.Client(config.db.url);
  client.connect(function(err){
    if(err) {
      D.error('could not connect to postgres', err);
    }
    client.query(sql, function(err, result) {
      if(err) {
        D.error('error running query', err);
      }
      D.trace("Query result for "+sql,result);
      client.end();
      resultFun(result);
    });
  });
};
// Module definitions
module.exports.upsert = upsert;
module.exports.query = query;

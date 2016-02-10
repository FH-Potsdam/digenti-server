/*global require,module*/
var R = require("ramda");
var D = require("./digenti");
var pg = D.require("pg");
var config = D.require("./config");

var query = function(sql, resultFun){
  var client = new pg.Client(config.db.url);
  client.connect(function(err){
    if(err) {
      D.error('could not connect to postgres', err);
    }
    client.query(sql, function(err, result) {
      if(err) {
        D.error('error running query', err);
      }
      //D.trace("Query result for "+sql,result);
      client.end();
      resultFun(result);
    });
  });
};

var ilike = R.curry(function(column,str){ return column+" ilike '%"+D.quote_sql(str.trim())+"%'";});
var or = R.join(" OR ");
var ilike_column = function(column){ return R.pipe(R.map(ilike(column)),or); };
var csv_text = R.split(/\s*,s*/);

// Module definitions
module.exports.query = query;
module.exports.ilike = ilike;
module.exports.ilike_column = ilike_column;
module.exports.or = or;
module.exports.csv_text = csv_text;

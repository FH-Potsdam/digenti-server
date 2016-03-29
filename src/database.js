/*global require,module*/
var R = require("ramda");
var D = require("./digenti");
var pg = D.require("pg");
var config = D.require("./config");

var query = function(sql,resultFun){
  pg.connect(config.db.url,function(err,client,done){
    if(err){
      D.trace("Error in connecting db: ",err);
      return;
    }
    var result_handler = function(error,result){
      done();
      if(error){
        D.trace("Error in query db:",error);
        return;
      }
      resultFun(result);
    };
    client.query(sql,result_handler);
  });
};

var ilike = R.curry(function(column,str){ return column+" ilike '%"+D.quote_sql(str.trim())+"%'";});
var or = R.join(" OR ");
var and = R.join(" AND ");
var sql_date = function(date_str_or_column){ return "to_date("+date_str_or_column+",'YYYY-MM-DDTHH:MI:SS.MSZ')";};
var sql_date_between = R.curry(function(before,after,current){ return sql_date(current)+" BETWEEN "+sql_date("'"+before+"'")+" AND "+sql_date("'"+after+"'");});
var ilike_column = function(column){ return R.pipe(R.map(ilike(column)),or); };
var csv_text = R.split(/\s*,\s*/);

// Module definitions
module.exports.query = query;
module.exports.ilike = ilike;
module.exports.ilike_column = ilike_column;
module.exports.or = or;
module.exports.and = and;
module.exports.date = sql_date;
module.exports.date_between = sql_date_between;
module.exports.csv_text = csv_text;

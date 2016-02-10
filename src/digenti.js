/*global require,exports*/
var R = require('ramda');

var requireWithoutCache = function(moduleSpec,shallow){
  var deleteModuleCache = function(key){ delete require.cache[key];};
  if(shallow){
    deleteModuleCache(moduleSpec);
  }else{
    var deleteAll = R.pipe(R.keys,deleteModuleCache);
    deleteAll(require.cache);
  }
  return require(moduleSpec);
};

var trace = R.curry(function(msg,what){
  console.log(msg,what);
  return what;
});

var to_str = function(obj){ return ""+obj;};
var quote_sql = R.pipe(to_str,R.replace(/\'/g,'\'\''));
var wrap_with_str = R.curry(function(str,obj){ return str+obj+str;});
var sql_str_value = R.pipe(quote_sql,wrap_with_str("'"));
var join_with_comma = R.join(",");
var suffix = R.curry(function(suffix,obj){return obj+suffix;});

var from_json = JSON.parse;

var search_record = {
  sourceId: '',
  requestTitle: '',
  description: '',
  latitude: '',
  longitude: '',
  locationName: '',
  eventAt: '',
  publishedAt: '',
  updatedAt: '',
  dataSource: '',
  mediaType: '',
  mediaUrl: ''
};

var create_table_for_search_record = function(){
  var sqlColumns = R.pipe(R.keys,R.map(suffix(" text")),join_with_comma);
  return "CREATE TABLE IF NOT EXISTS search_items ("+sqlColumns(search_record)+");";
};

var create_search_record = function(item){
  return R.merge(R.clone(search_record), item);
};

// Module definitions:
exports.trace = trace;
exports.error = trace;
exports.to_str = to_str;
exports.wrap_with_str = wrap_with_str;
exports.join_with_comma = join_with_comma;
exports.suffix = suffix;
exports.from_json = from_json;
exports.require = requireWithoutCache;

// sql stuff - TODO: create an own module ?
exports.quote_sql = quote_sql;
exports.sql_str_value = sql_str_value;
// search record stuff
exports.search_record = search_record;
exports.create_table_for_search_record = create_table_for_search_record;
exports.create_search_record = create_search_record;

/*global require,module*/
var clear = function(){
	Object.keys(require.cache).forEach(function(key) { delete require.cache[key]; }) ;
};

module.exports.clear = clear;

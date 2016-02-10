/*global require,module*/
function clear(){
	Object.keys(require.cache).forEach(function(key) { delete require.cache[key]; }) ;
}

module.exports.clear = clear;

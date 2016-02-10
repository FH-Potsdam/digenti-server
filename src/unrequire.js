/*global require,module*/

var unrequire = function(moduleSpec,shallow){
  if(shallow){
    delete require.cache[moduleSpec];    
  }else{
    clear();
  }
  return require(moduleSpec);
};

var clear = function(){
	Object.keys(require.cache).forEach(function(key) { delete require.cache[key]; }) ;
};

module.exports.clear = clear;
module.exports.require = unrequire;

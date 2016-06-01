/*global require*/
var R = require("ramda");
var D = require("./../../digenti");
var fos = require("./../../search/fosqueries");

var mockReq = {body:{}};
var mockRes = {json:D.trace("result:")};

var test_searchFosByPoint = function(){
  fos.searchFosByPoint(mockReq, mockRes);
};
var test_searchPlaceByFos = function(){
  fos.searchPlacesByFos(mockReq, mockRes);
};

test_searchFosByPoint();
test_searchPlaceByFos();

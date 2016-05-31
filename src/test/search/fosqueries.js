/*global require*/
var R = require("ramda");
var D = require("./../../digenti");
var fos = require("./../../search/fosqueries");

var mockReq = {body:{}};
var mockRes = {json:D.trace("result:")};

var test_searchFosByPoint = function(){
  fos.searchFosByPoint(mockReq, mockRes);
};

test_searchFosByPoint();
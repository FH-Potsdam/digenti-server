/*global require*/
var D = require("./../../digenti");
var surface = require("./../../search/surface");

var mockReq = {body:{}};
var mockRes = {json:D.trace("result:")};

var test_elevateLine = function(){
  surface.elevateLine(mockReq, mockRes);
};

test_elevateLine();
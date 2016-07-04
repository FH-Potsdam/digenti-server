/*global require*/
var R = require("ramda");
var D = require("./../digenti");

var test_date = function(){
  var dates = [
    "2015-05-01T01:09:00.000Z",
    "Sat Apr 25 10:07:50 +0000 2015",
    "2015-09-30T03:02:23+00:00",
    "2015-05-16T16:08:41.646922",
    "2015-05-01T14:27:02Z",
    "", null, undefined, 0, "test"
  ];
  R.forEach(R.pipe(D.parse_date, D.trace("test_date")), dates);
};

var test_nprop = function(){
  D.trace("1", D.nprop("a.b.c", {a:{b:{c:1}}}));
  D.trace("", D.nprop("a.b.d", {a:{b:{c:1}}}));
  D.trace("", D.nprop("a.b.c.e", {a:{b:{c:1}}}));
  D.trace("{c:1}", D.nprop("a.b", {a:{b:{c:1}}}));
};

var test_json_from_file = function(filename){
	D.get_json_from_file(filename, D.trace("FeatureCollection"));
};

test_date();
test_nprop();
test_json_from_file("./../data/aidr_twitter.geojson");

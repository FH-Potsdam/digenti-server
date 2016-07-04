/*global require*/
var R = require("ramda");
var D = require("../digenti");
var db = D.require("./database");
var config = D.require('./config');

var dem_table = "colombia_aoi_tandem_wgs84_tiled";

var defaultSurfaceQuery = {
  location: "MULTILINESTRING((-73.0522968502338 10.3512061642851,-73.0523881415379 10.3512067166042,-73.0524794328472 10.3512072688974,-73.0525707241616 10.3512078211647,-73.0526620154812 10.3512083734062,-73.0527533068059 10.3512089256219,-73.0528451558083 10.3511190865568,-73.0529364471172 10.3511196387158,-73.0530277384312 10.351120190849,-73.0531190297503 10.3511207429563,-73.0532103210745 10.3511212950378,-73.0533016124039 10.3511218470934,-73.0533934612493 10.3510320078382,-73.0534853100425 10.3509421685468,-73.053485867517 10.3508517772558,-73.0535777162268 10.3507619379227,-73.0536690074723 10.3507624898552,-73.0537602987229 10.3507630417619,-73.0538515899787 10.3507635936428,-73.0539428812396 10.3507641454978,-73.0540347298133 10.3506743060053,-73.0541260210583 10.3506748578037,-73.0542178695588 10.3505850182443,-73.0543091607881 10.350585569986,-73.0543998948244 10.3506765130437,-73.0544917432619 10.350586673392,-73.0545835916473 10.3504968337041,-73.0546754399804 10.3504069939799,-73.0545847059133 10.3503160509981,-73.0545852630386 10.3502256596443,-73.0546771112781 10.3501358199038,-73.0547689594653 10.350045980127,-73.0548602505687 10.3500465316841,-73.0549515416772 10.3500470832154,-73.0550433897703 10.3499572433409,-73.0551352378111 10.3498674034302,-73.0552270857998 10.3497775634832,-73.0553189337363 10.3496877235,-73.0554107816205 10.3495978834806,-73.0555020726293 10.3495984348323,-73.055592806841 10.3496893775697,-73.0556840978861 10.3496899288746,-73.0557759456865 10.3496000887321,-73.0558677934346 10.3495102485534,-73.0559596411306 10.3494204083386,-73.0560514887743 10.3493305680875,-73.0561433363659 10.3492407278001,-73.0562346273113 10.3492412789254,-73.0563264748297 10.3491514385711,-73.0564177657592 10.3491519896397,-73.0565090566939 10.3491525406824,-73.0566003476337 10.3491530916994,-73.056692195037 10.3490632512166,-73.056783485961 10.3490638021769))"
};

var elevateLine = function(req, res){
  var query = R.merge(defaultSurfaceQuery, req.body);
  D.trace("query:", query);
  
  var select = "WITH line AS (SELECT ST_DumpPoints(ST_SetSRID(ST_GeomFromText('" + query.location + "'), 4326)) AS gdump) SELECT lid, ST_AsText(ST_MakeLine(point)) AS geom FROM (SELECT (gdump).path[1] AS lid,  (gdump).path[2] AS pid, ST_Translate(ST_Force3D((gdump).geom),0,0,(SELECT ST_Value(rast, (gdump).geom) FROM " + dem_table + " WHERE ST_Intersects(rast, (gdump).geom))) AS point FROM line) AS foo GROUP BY lid;";

  db.query(select, function(results){
		res.json({
      dev: { sql: select},
      query: req.body,
      count: results.rowCount,
      records : results.rows 
    });
  });
};

// Module definitions
module.exports.elevateLine = elevateLine;
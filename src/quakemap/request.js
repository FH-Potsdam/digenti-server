var get = function(){
	console.log("request quakemap");
	return {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [85.312454,
        27.454806]
      },
      "properties": {
        "id": 538,
        "url": "https://quakemap.api.ushahidi.io/api/v3/posts/538",
        "title": "Need Help - Asrang, Gorkha",
        "content": "Asrang VDC of Gorkha hasn't received any help yet. Need relief efforts. Contact Navaraj : 9856040010",
        "date_of_incident": "2015-04-26 00:00:00",
        "most_affected_district": "Gorkha",
        "phone_number": "9856040010",
        "location_name": "Ashrang, Gorkha, Western Region, Nepal",
        "name": "Navaraj",
        "tags": ["Sanitation / hygiene",
        "Water / Food",
        "Shelter"],
        "created": "2015-09-30T03:02:23+00:00",
        "updated": "2015-09-30T04:15:51+00:00"
      }
    }]
  };
};

module.exports.get = get;
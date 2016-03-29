/*global require*/
var D = require("./../../digenti");
var database = require("./../../collect/database");

var test_create_table = function(){
	database.create_table_for_search_record();
};

var test_update = function(){
	var item = D.create_search_record({
		title : "test",
		sourceId : "17",
		provider : "testprovider"
	});
	database.update([item], function(result){
		database.delete_all("testprovider");	
	});
};

var test_totsvector = function(){
	D.trace(
		"to_tsvector('english', concat_ws(' ', title, description, locationname, provider, mediaurl))", 
		database.totsvector('english', ['title', 'description', 'locationname', 'provider', 'mediaurl'])
	);
};

var test_insertquery = function(){
	D.trace("test_insertquery", database.search_record_as_sql({
	  sourceId: '13',
	  title: 'test',
	  description: 'test hello world',
	  relevance: '',
	  latitude: '',
	  longitude: '',
	  locationName: '',
	  eventAt: '',
	  publishedAt: '',
	  updatedAt: '',
	  provider: '',
	  mediaChannel: '',
	  mediaType: '',
	  mediaUrl: ''
	}));
};

var test_update_freetext = function(){
	database.update_freetext(['title','description','locationname','provider','mediaurl']);
};

//test_create_table();
//test_update();
//test_totsvector();
//test_insertquery();
test_update_freetext();

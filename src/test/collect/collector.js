/*global require*/
var D = require("./../../digenti");
var collector = require("./../../collect/collector");

collector.prepare_database(D.trace("prepared database\n"));
collector.collect();
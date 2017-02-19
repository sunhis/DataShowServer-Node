"use strict";


var Q = require("q");
var debug = require("debug")("app:prepare");

var db = require("../db/db");
var config = require("./config");


function all() {
    var dfd = Q.defer();

    Q.all([config.loadConfig("DataShowServer.conf","c")]).spread(function(configData)
    {
        global.CONFIG = configData;

        console.log("=== configData.db ===", configData.db);

        db.init(configData.db);

        dfd.resolve(configData);
    }).fail(
        function(err)
        {
            logger.error.error("ERROR when prepare data",err);
            dfd.reject(err);
        }

    ).done();

    return dfd.promise;
}


module.exports = {
    all: all
};
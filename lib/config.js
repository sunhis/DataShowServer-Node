var config = {};
var Q = require("q");
var ConfigParser = require('@taf/taf-utils').Config;
exports = module.exports = config;

config.loadConfig = function(filename,configFormat){
    var dfd = Q.defer();
    if (process.env.TAF_CONFIG) {
        //代表不是本地应用
        var tafConfigHelper = require("@taf/taf-config");
        var helper = new tafConfigHelper();

        helper.loadConfig(filename,configFormat).then(function(data) {

                data = parseConf(data,configFormat);
                global.CONFIG = data;

                dfd.resolve(data);

            },
            function(err) {
                dfd.reject("loadConfig file error");
            });
    } else {
        var fs = require("fs");
        fs.readFile(filename, {
                encoding: "utf-8"
            },
            function(err, data) {
                if (err) {
                    dfd.reject(err);
                } else {

                    data = parseConf(data,configFormat);
                    global.CONFIG = data;
                    dfd.resolve(data);
                }
            });
    }
    return dfd.promise;
}

function parseConf(content, configFormat) {

    var ret = content;
    if (configFormat == "c") {
        var configParser = new ConfigParser();
        configParser.parseText(content, 'utf8');
        ret = configParser.data;
    }
    else if (configFormat == "json") {
        ret = JSON.parse(content);
    }
    return ret;
}

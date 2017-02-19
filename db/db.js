var Sequelize = require("sequelize");
var isInit = false;
var sequelize;
var db = {};

db.init = function(dbConfig)
{
    console.log("-----------------------" + dbConfig + "--------------------");

    sequelize = new Sequelize(dbConfig.dbname, dbConfig.dbuser, dbConfig.dbpass, {
        host: dbConfig.dbhost,
        dialect: "mysql",
        port: dbConfig.dbport
    });


    console.log("-----------------------" + sequelize + "--------------------");

    isInit = true;
    setModules(sequelize);
};

function setModules(seq)
{

    db.sequelize = seq;
    db.test = seq.import(__dirname + "/table/test");
    db.t_stat_tmp_log_name = seq.import(__dirname + "/table/t_stat_tmp_log_name");
    db.t_stat_con_log = seq.import(__dirname + "/table/t_stat_con_log");
    db.t_stat_event = seq.import(__dirname + "/table/t_stat_event");
    db.t_stat_column = seq.import(__dirname + "/table/t_stat_column");
    db.t_stat_bus = seq.import(__dirname + "/table/t_stat_bus");
    db.t_static_day = seq.import(__dirname + "/table/t_static_day");
    db.t_static_active = seq.import(__dirname + "/table/t_static_active");
    db.t_static_remain = seq.import(__dirname + "/table/t_static_remain");
    db.t_crash_summery = seq.import(__dirname + "/table/t_crash_summery");


}

module.exports  = db;
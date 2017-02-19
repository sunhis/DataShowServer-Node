var express = require('express');
var router = express.Router();
//var commonHandler = require('../common');
var qs = require("querystring");
var db = require("../../db/db");//引入数据库表
var Sequelize = require("sequelize");//通过实例来创建或定义Model（模型）、执行查询、同步数据库结构等操作。
var Q = require("q");


function getVersion(req, res)
{
    var queryObj = req.query || {};

    var app = queryObj["app"];//从表里查到的字段数据
    var plat= queryObj["plat"];
    var channel = queryObj["channel"];//

    if(app == undefined)
    {
        res.json({code: -1, msg: " please select app error "});
        return;
    }

    var sql = "select distinct version from t_static_day where app='" + app + "'";

    if(plat != undefined)
    {
        sql += "  and plat = '" + plat + "' ";
    }

    if(channel != undefined)
    {
        sql +=  " and channel = '" + channel + "' ";
    }

    var versionModel = db.sequelize.define('version', {
        version: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        }
    });

    db.sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT, model: versionModel}).then(function(result)
    {
        console.log(result);

        var data = {
            code: "0",
            list: []
        };

        result.forEach(function(value, index){
            var item = value.get();
            data.list.push(item["version"]);
        });

        res.json(data);

    },function(err){
        console.log("eee error: " + err);

        res.json({code: -1, msg: " get version error "});
    }).done();
}

function getChannel(req, res)
{
    var queryObj = req.query || {};

    var app = queryObj["app"];
    var plat= queryObj["plat"];
    var version = queryObj["version"];

    if(app == undefined)
    {
        res.json({code: -1, msg: " please select app error "});
        return;
    }

    var sql = "select distinct channel from t_static_day where app='" + app + "'";

    if(plat != undefined)
    {
        sql += "  and plat = '" + plat + "' ";
    }

    if(version != undefined)
    {
        sql +=  " and version = '" + version + "' ";
    }

    var channelModel = db.sequelize.define('channel', {
        channel: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        }
    });

    db.sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT, model: channelModel}).then(function(result)
    {
        console.log(result);

        var data = {
            code: "0",
            list: []
        };

        result.forEach(function(value, index){
            var item = value.get();
            data.list.push(item["channel"]);
        });

        res.json(data);

    },function(err){
        console.log("eee error: " + err);

        res.json({code: -1, msg: " get version error "});
    }).done();
}

function getBaseStatData(req, res)
{
    var queryObj = req.query || {};

    var where = {};

    where.app = queryObj.app != undefined ? queryObj.app : "-1";
    where.plat = queryObj.plat != undefined ? queryObj.plat : "-1";
    where.channel = queryObj.channel != undefined ? queryObj.channel:"-1";
    where.version  = queryObj.version != undefined ? queryObj.version:"-1";

    var startday = queryObj["startday"];

    var endday   = queryObj["endday"];

    if(startday == undefined || endday == undefined)
    {
        res.json({code: -1, msg: " 请选择日期！"});
        return;
    }

    where.day_time={
        '$lte': endday,
        '$gte': startday
    };

    console.log(" get base stat list start -------------");

    db.t_static_day.findAndCountAll({
        where: where,
        order: [['day_time', 'asc']]
    }, {raw: false}).then(function(result)
    {
        var data = {
            code:0,
            list: []
        };
        result.rows.forEach(function(value, index){
            var item = value.get();
            data.list.push(item);
        });

       res.json(data);

    },function(err){
        var data = {"code":-1, "msg":"query db error"};
        res.json(data);
    }).done();
}

function getConActive(req, res)
{
    var queryObj = req.query || {};

    var where = {};

    where.app = queryObj.app != undefined ? queryObj.app : "-1";
    where.plat = queryObj.plat != undefined ? queryObj.plat : "-1";
    where.channel = queryObj.channel != undefined ? queryObj.channel:"-1";
    where.version  = queryObj.version != undefined ? queryObj.version:"-1";

    var startday = queryObj["startday"];

    var endday   = queryObj["endday"];

    if(startday == undefined || endday == undefined)
    {
        res.json({code: -1, msg: " 请选择日期！"});
        return;
    }

    where.day_time={
        '$lte': endday,
        '$gte': startday
    };

    console.log(" get base stat list start -------------");

    db.t_static_active.findAndCountAll({
        where: where,
        order: [['day_time', 'asc']]
    }, {raw: false}).then(function(result)
    {
        var data = {
            code:0,
            list: []
        };
        result.rows.forEach(function(value, index){
            var item = value.get();
            data.list.push(item);
        });

        res.json(data);

    },function(err){
        var data = {"code":-1, "msg":"query db error"};
        res.json(data);
    }).done();
}

function getConRemain(req, res)
{
    var queryObj = req.query || {};

    var where = {};

    where.app = queryObj.app != undefined ? queryObj.app : "-1";
    where.plat = queryObj.plat != undefined ? queryObj.plat : "-1";
    where.channel = queryObj.channel != undefined ? queryObj.channel:"-1";
    where.version  = queryObj.version != undefined ? queryObj.version:"-1";

    var startday = queryObj["startday"];

    var endday   = queryObj["endday"];

    if(startday == undefined || endday == undefined)
    {
        res.json({code: -1, msg: " 请选择日期！"});
        return;
    }

    where.day_time={
        '$lte': endday,
        '$gte': startday
    };

    console.log(" get base stat list start -------------");

    db.t_static_remain.findAndCountAll({
        where: where,
        order: [['day_time', 'asc']]
    }, {raw: false}).then(function(result)
    {
        var data = {
            code:0,
            list: []
        };
        result.rows.forEach(function(value, index){
            var item = value.get();
            data.list.push(item);
        });

        res.json(data);

    },function(err){
        var data = {"code":-1, "msg":"query db error"};
        res.json(data);
    }).done();
}


function getError(req, res)
{
    var queryObj = req.query || {};

    var where = {};

    where.app = queryObj.app != undefined ? queryObj.app : "-1";
    where.plat = queryObj.plat != undefined ? queryObj.plat : "-1";
    where.version  = queryObj.version != undefined ? queryObj.version:"-1";
    where.machine  = queryObj.machie != undefined ? queryObj.machie:"-1";
    where.os  = queryObj.os != undefined ? queryObj.os:"-1";


    var startday = queryObj["startday"];

    var endday   = queryObj["endday"];

    if(startday == undefined || endday == undefined)
    {
        res.json({code: -1, msg: " 请选择日期！"});
        return;
    }

    where.day_time={
        '$lte': endday,
        '$gte': startday
    };

    console.log(" get base stat list start -------------", where);

    db.t_crash_summery.findAndCountAll({
        where: where,
        order: [['day_time', 'asc']]
    }, {raw: false}).then(function(result)
    {
        var data = {
            code:0,
            list: []
        };
        result.rows.forEach(function(value, index){
            var item = value.get();
            data.list.push(item);
        });

        res.json(data);

    },function(err){
        var data = {"code":-1, "msg":"query db error"};
        res.json(data);
    }).done();

}

/*function getBid(req, res)
{
    var queryObj = req.query || {};

    var app = queryObj["app"];

    if(app == undefined)
    {
        res.json({code: -1, msg: " please select app error "});
        return;
    }

    var sql = "select id, bname from t_stat_bus where bus_product='" + app + "' and status >= 1";


    var bid_model = db.sequelize.define('bid_model', {
        version: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        }
    });

    db.sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT, model: bid_model}).then(function(result)
    {
        console.log(result);

        var data = {
            code: "0",
            list: []
        };

        result.forEach(function(value, index){
            var item = value.get();
            data.list.push({id:item["id"], bname:item["bname"]});
        });

        res.json(data);

    },function(err){
        console.log("eee error: " + err);

        res.json({code: -1, msg: " get bid error "});
    }).done();
}*/
//t_stat_bus数据库方法
function getbusstat(req, res)
{
    var sql = "select * from t_stat_bus ";

    var bid_model = db.sequelize.define('bid_model', {  //对应数据库中字段
        id: {
            type: Sequelize.INTEGER,
            allowNull: false, //是否允许为空
            primaryKey: true,
            autoIncrement: true
        },
        bname: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        bus_des: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        status: {
            type: Sequelize.INTEGER,
            allowNull: false //是否允许为空
        },
        last_user: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        }
    });

    db.sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT, model:bid_model}).then(function(result)
    {
        //console.log(result);

        var busdata = {  //json对象
            code: "0",
            list: []
        };

        result.forEach(function(value, index){
            var item = value.get();
            busdata.list.push({id:item["id"], bname:item["bname"],bus_des:item["bus_des"],status:item["status"],last_user:item["last_user"]});
        });
        console.log("+++++", result);
        res.json(busdata);

    },function(err){
        console.log("eee error: " + err);
        res.json({code: -1, msg: " get bid error "});
    }).done();
}


//column表数据展示
function getcolumnstat(req, res)
{
    var sql = "select * from t_stat_column ";

    var bid_model = db.sequelize.define('bid_model', {  //对应数据库中字段
        id: {
            type: Sequelize.INTEGER,
            allowNull: false, //是否允许为空
            primaryKey: true,
            autoIncrement: true
        },
        bid: {
            type: Sequelize.INTEGER,
            allowNull: false //是否允许为空
        },
        column_name: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        column_desc: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        stat_type: {
            type: Sequelize.INTEGER,
            allowNull: false //是否允许为空
        },
        column_order: {
            type: Sequelize.INTEGER,
            allowNull: false //是否允许为空
        },
        status: {

            type: Sequelize.INTEGER,
            allowNull: true //是否允许为空
        },
        last_user: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        }
    });

    db.sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT, model:bid_model}).then(function(result)
    {
        //console.log(result);

        var columndata = {  //json对象
            code: "0",
            list: []
        };

        result.forEach(function(value, index){
            var item = value.get();
            columndata.list.push({id:item["id"], bid:item["bid"],column_name:item["column_name"],column_desc:item["column_desc"],stat_type:item["stat_type"],column_order:item["column_order"],status:item["status"],last_user:item["last_user"]});
        });
        console.log("+++++", result);
        res.json(columndata);

    },function(err){
        console.log("eee error: " + err);
        res.json({code: -1, msg: " get bid error "});
    }).done();
}
//column表添加数据
function column_add(req, res){

    var queryObj = req.query || {};

    var action = queryObj["action"];

    var bid = queryObj["bid"];
    var column_name= queryObj["column_name"];
    var column_desc = queryObj["column_desc"];
    var stat_type = queryObj["stat_type"];
    var column_order = queryObj["column_order"];
    var status = queryObj["status"];
    var last_user = queryObj["last_user"];
    db.t_stat_column.create({
        bid:bid,
        column_name:column_name,
        column_desc:column_desc,
        stat_type:stat_type,
        column_order:column_order,
        status:status,
        last_user:last_user,
    }).then(function(result){
        res.send('you dian diao')
    }).catch(function(err){
        console.log('inserted XiaoMing error');
        console.log(err.message);
    });
}
//删除column表一条数据
function column_delete(req, res){
    var queryObj = req.query || {};
    var action = queryObj["action"];
    var id = queryObj["id"];

    db.t_stat_column.update({
        status: '-1'
    },{
        where:{
            id:{
                $like:id
            }
        }
    }).then(function(result){
        res.send('success');
    }).catch(function(err) {
        console.log('inserted XiaoMing error');
        console.log(err.message);
    });
}
//修改column表数据
function column_update(req,res){
    var queryObj = req.query || {};
    var action = queryObj["action"];
    var id = queryObj["id"];
    var bid = queryObj["bid"];
    var column_name = queryObj["column_name"];
    var column_desc = queryObj["column_desc"];
    var stat_type = queryObj["stat_type"];
    var column_order = queryObj["column_order"];
    var last_user = queryObj["last_user"];
    var status = queryObj["status"];
    db.t_stat_column.update({
        bid:bid,
        column_name:column_name,
        column_desc:column_desc,
        stat_type:stat_type,
        column_order:column_order,
        last_user:last_user,
        status:status
    },{
        where:{
            id:{
                $like:id
            }
        }
    }).then(function(result){
        res.send('success');
    }).catch(function(err) {
        console.log('inserted XiaoMing error');
        console.log(err.message);
    });
}
/*
* t-stat_con_log_name表数据增删改查开始
* */

function getlognamestat(req, res)
{
    var sql = "select * from t_stat_tmp_log_name ";

    var bid_model = db.sequelize.define('bid_model', {  //对应数据库中字段
        id: {
            type: Sequelize.INTEGER,
            allowNull: false, //是否允许为空
            primaryKey: true,
            autoIncrement: true
        },
        app: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        server: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        log_name: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        last_user: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        }
    });

    db.sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT, model:bid_model}).then(function(result)
    {
        //console.log(result);

        var datalogname = {  //json对象
            code: "0",
            list: []
        };

        result.forEach(function(value, index){
            var item = value.get();
            datalogname.list.push({id:item["id"], app:item["app"],server:item["server"],log_name:item["log_name"],last_user:item["last_user"],status:item["status"]});
        });
        console.log("+++++", result);
        res.json(datalogname);

    },function(err){
        console.log("eee error: " + err);
        res.json({code: -1, msg: " get bid error "});
    }).done();
}
//column表添加数据
function logname_add(req, res){

    var queryObj = req.query || {};

    var action = queryObj["action"];

    var app = queryObj["app"];
    var server= queryObj["server"];
    var log_name = queryObj["log_name"];
    var last_user = queryObj["last_user"];
    var status = queryObj["status"];
    db.t_stat_tmp_log_name.create({
        app:app,
        server:server,
        log_name:log_name,
        last_user:last_user,
        status:status,
    }).then(function(result){
        res.send('you dian diao')
    }).catch(function(err){
        console.log('inserted XiaoMing error');
        console.log(err.message);
    });
}
//删除column表一条数据
function logname_delete(req, res){
    var queryObj = req.query || {};
    var action = queryObj["action"];
    var id = queryObj["id"];

    db.t_stat_tmp_log_name.update({
        status: '-1'
    },{
        where:{
            id:{
                $like:id
            }
        }
    }).then(function(result){
        res.send('success');
    }).catch(function(err) {
        console.log('inserted XiaoMing error');
        console.log(err.message);
    });
}
//logname修改
function logname_update(req,res){
    var queryObj = req.query || {};
    var action = queryObj["action"];
    var id = queryObj["id"];
    var app = queryObj["app"];
    var server = queryObj["server"];
    var log_name = queryObj["log_name"];
    var last_user = queryObj["last_user"];
    var status = queryObj["status"];
    db.t_stat_tmp_log_name.update({
        app:app,
        server:server,
        log_name:log_name,
        last_user:last_user,
        status:status,
    },{
        where:{
            id:{
                $like:id
            }
        }
    }).then(function(result){
        res.send('success');
    }).catch(function(err) {
        console.log('inserted XiaoMing error');
        console.log(err.message);
    });
}
/*
* t-stat_tmp_log_name表增删改查操作结束
* */

/*
test表操作
*/


function gettestdata(req, res)
{
    var sql = "select * from test ";

    var bid_model = db.sequelize.define('bid_model', {  //对应数据库中字段
        id: {
            type: Sequelize.INTEGER,
            allowNull: false, //是否允许为空
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        age: {
            type: Sequelize.INTEGER,
            allowNull: false //是否允许为空
        }
    });

    db.sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT, model:bid_model}).then(function(result)
    {
        //console.log(result);

        var datalogname = {  //json对象
            code: "0",
            list: []
        };

        result.forEach(function(value, index){
            var item = value.get();
            testname.list.push({id:item["id"], name:item["name"],age:item["age"]});
        });
        console.log("+++++", result);
        res.json(testname);

    },function(err){
        console.log("eee error: " + err);
        res.json({code: -1, msg: " get bid error "});
    }).done();
}
//column表添加数据
function test_add(req, res){

    var queryObj = req.query || {};
    var action = queryObj["action"];
    var id = queryObj["id"];
    var name= queryObj["name"];
    var age = queryObj["age"];
    db.t_stat_tmp_log_name.create({
        id:id,
        name:name,
        age:age,
    }).then(function(result){
        res.send('you dian diao')
    }).catch(function(err){
        console.log('inserted XiaoMing error');
        console.log(err.message);
    });
}
//删除column表一条数据
function test_delete(req, res){
    var queryObj = req.query || {};
    var action = queryObj["action"];
    var id = queryObj["id"];

    db.test.update({
        status: '-1'
    },{
        where:{
            id:{
                $like:id
            }
        }
    }).then(function(result){
        res.send('success');
    }).catch(function(err) {
        console.log('inserted XiaoMing error');
        console.log(err.message);
    });
}
//logname修改
function test_update(req,res){
    var queryObj = req.query || {};
    var action = queryObj["action"];
    var id = queryObj["id"];
    var name = queryObj["name"];
    var age = queryObj["age"];
    db.test.update({
        name:name,
        age:age,
    },{
        where:{
            id:{
                $like:id
            }
        }
    }).then(function(result){
        res.send('success');
    }).catch(function(err) {
        console.log('inserted XiaoMing error');
        console.log(err.message);
    });
}
/*
test表操作结束
*/


/*con_log表操作开始*/

//column表数据展示
function getconlogstat(req, res)
{
    var sql = "select * from t_stat_con_log ";

    var bid_model = db.sequelize.define('bid_model', {  //对应数据库中字段
        id: {
            type: Sequelize.INTEGER,
            allowNull: false, //是否允许为空
            primaryKey: true,
            autoIncrement: true
        },
        app: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        server: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        log_name: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        log_type: {
            type: Sequelize.STRING,
            allowNull: true //是否允许为空
        },
        last_user: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        con_type: {

            type: Sequelize.INTEGER,
            allowNull: true //是否允许为空
        },
        tran_type: {
            type: Sequelize.INTEGER,
            allowNull: true //是否允许为空
        },
        speed_type: {

            type: Sequelize.INTEGER,
            allowNull: true //是否允许为空
        },
        status: {

            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        }
    });

    db.sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT, model:bid_model}).then(function(result)
    {
        //console.log(result);

        var dataconlog = {  //json对象
            code: "0",
            list: []
        };

        result.forEach(function(value, index){
            var item = value.get();
            dataconlog.list.push({id:item["id"], app:item["app"],server:item["server"],log_name:item["log_name"],log_type:item["log_type"],last_user:item["last_user"],con_type:item["con_type"],tran_type:item["tran_type"],speed_type:item["speed_type"],status:item["status"]});
        });
        console.log("+++++", result);
        res.json(dataconlog);

    },function(err){
        console.log("eee error: " + err);
        res.json({code: -1, msg: " get bid error "});
    }).done();
}
//conlog添加数据
function conlog_add(req, res){

    var queryObj = req.query || {};

    var action = queryObj["action"];

    var app = queryObj["app"];
    var server= queryObj["server"];
    var log_name = queryObj["log_name"];
    var log_type = queryObj["log_type"];
    var last_user = queryObj["last_user"];
    var con_type = queryObj["con_type"];
    var tran_type = queryObj["tran_type"];
    var speed_type = queryObj["speed_type"];
    var status = queryObj["status"];
    db.t_stat_con_log.create({
        app:app,
        server:server,
        log_name:log_name,
        log_type:log_type,
        last_user:last_user,
        con_type:con_type,
        tran_type:tran_type,
        speed_type:speed_type,
        status:status
    }).then(function(result){
        res.send('success');
    }).catch(function(err){
        console.log('inserted XiaoMing error');
        console.log(err.message);
    });
}
//删除column表一条数据
function conlog_delete(req, res){
    var queryObj = req.query || {};
    var action = queryObj["action"];
    var id = queryObj["id"];

    db.t_stat_con_log.update({
        status: '-1'
    },{
        where:{
            id:{
                $like:id
            }
        }
    }).then(function(result){
        res.send('success');
    }).catch(function(err) {
        console.log('inserted XiaoMing error');
        console.log(err.message);
    });
}
//修改conlogn表数据
function conlog_update(req,res){
    var queryObj = req.query || {};
    var action = queryObj["action"];
    var id = queryObj["id"];
    var app = queryObj["app"];
    var server = queryObj["server"];
    var log_name = queryObj["log_name"];
    var log_type = queryObj["log_type"];
    var last_user = queryObj["last_user"];
    var con_type = queryObj["con_type"];
    var tran_type = queryObj["tran_type"];
    var speed_type = queryObj["speed_type"];
    var status = queryObj["status"];
    db.t_stat_con_log.update({
        app:app,
        server:server,
        log_name:log_name,
        log_type:log_type,
        last_user:last_user,
        con_type:con_type,
        tran_type:tran_type,
        speed_type:speed_type,
        status:status
    },{
        where:{
            id:{
                $like:id
            }
        }
    }).then(function(result){
        res.send('success');
    }).catch(function(err) {
        console.log('inserted XiaoMing error');
        console.log(err.message);
    });
}
/*con_log表操作结束*/




//event表数据展示
function geteventstat(req, res)
{
    var sql = "select * from t_stat_event ";

    var bid_model = db.sequelize.define('bid_model', {  //对应数据库中字段
        id: {
            type: Sequelize.INTEGER,
            allowNull: false, //是否允许为空
            primaryKey: true,
            autoIncrement: true
        },
        bid: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        event_name: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        event_desc: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        event_title: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        last_user: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        status: {

            type: Sequelize.INTEGER,
            allowNull: true //是否允许为空
        }
    });

    db.sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT, model:bid_model}).then(function(result)
    {
        //console.log(result);

        var eventdata = {  //json对象
            code: "0",
            list: []
        };

        result.forEach(function(value, index){
            var item = value.get();
            eventdata.list.push({id:item["id"], bid:item["bid"],event_name:item["event_name"],event_desc:item["event_desc"],event_title:item["event_title"],last_user:item["last_user"],status:item["status"]});
        });
        console.log("+++++", result);
        res.json(eventdata);

    },function(err){
        console.log("eee error: " + err);
        res.json({code: -1, msg: " get bid error "});
    }).done();
}
//stat_event添加数据
function event_add(req, res){

    var queryObj = req.query || {};

    var action = queryObj["action"];

    var bid = queryObj["bid"];
    var event_name= queryObj["event_name"];
    var event_desc = queryObj["event_desc"];
    var event_title = queryObj["event_title"];
    var last_user = queryObj["last_user"];
    var status = queryObj["status"];

    db.t_stat_event.create({
        bid:bid,
        event_name:event_name,
        event_desc:event_desc,
        event_title:event_title,
        last_user:last_user,
        status:status
    }).then(function(result){
        res.send('you dian diao')
    }).catch(function(err){
        console.log('inserted XiaoMing error');
        console.log(err.message);
    });
}
//删除event表一条数据
function event_delete(req, res){
    var queryObj = req.query || {};
    var action = queryObj["action"];
    var id = queryObj["id"];

    db.t_stat_event.update({
        status: '-1'
    },{
        where:{
            id:{
                $like:id
            }
        }
    }).then(function(result){
        res.send('success');
    }).catch(function(err) {
        console.log('inserted XiaoMing error');
        console.log(err.message);
    });
}
//修改event表数据
function event_update(req,res){
    var queryObj = req.query || {};
    var action = queryObj["action"];
    var id = queryObj["id"];
    var bid = queryObj["bid"];
    var event_name = queryObj["event_name"];
    var event_desc = queryObj["event_desc"];
    var event_title = queryObj["event_title"];
    var last_user = queryObj["last_user"];
    var status = queryObj["status"];
    db.t_stat_event.update({
        bid:bid,
        event_name:event_name,
        event_desc:event_desc,
        event_title:event_title,
        last_user:last_user,
        status:status
    },{
        where:{
            id:{
                $like:id
            }
        }
    }).then(function(result){
        res.send('success');
    }).catch(function(err) {
        console.log('inserted XiaoMing error');
        console.log(err.message);
    });
}

//stat_bus添加数据
function bus_add(req, res){

    var queryObj = req.query || {};

    var action = queryObj["action"];

    var bname = queryObj["bname"];
    var bus_des= queryObj["bus_des"];
    var status = queryObj["status"];
    var last_user = queryObj["last_user"];

    db.t_stat_bus.create({
        bname: bname,
        bus_des:bus_des,
        status: status,
        last_user: last_user
    }).then(function(result){
        res.send('insert is ok')
    }).catch(function(err){
        console.log('inserted XiaoMing error');
        console.log(err.message);
    });
}
//删除bus表一条数据
function bus_delete(req, res){
    var queryObj = req.query || {};
    var action = queryObj["action"];
    var id = queryObj["id"];
    var bname = queryObj["bname"];
    var status = queryObj["status"];
    var last_user = queryObj["last_user"];
    db.t_stat_bus.update({
        status: '-1'
    },{
        where:{
            id:{
                $like:id
            }
        }
    }).then(function(result){
        res.send('success');
    }).catch(function(err) {
        console.log('inserted XiaoMing error');
        console.log(err.message);
    });
}

//修改bus表其中一条数据
function bus_update(req,res){
    var queryObj = req.query || {};
    var action = queryObj["action"];
    var id = queryObj["id"];
    var bname = queryObj["bname"];
    var bus_des = queryObj["bus_des"];
    var status = queryObj["status"];
    var last_user = queryObj["last_user"];
    db.t_stat_bus.update({
        status: 1,
        bname:bname,
        bus_des:bus_des,
        last_user:last_user
    },{
        where:{
            id:{
                $like:id
            }
        }
    }).then(function(result){
        res.send('success');
    }).catch(function(err) {
        console.log('inserted XiaoMing error');
        console.log(err.message);
    });
}

function getEventKey(req, res)
{
    var queryObj = req.query || {};

    var bid = queryObj["bid"];

    if(bid == undefined)
    {
        res.json({code: -1, msg: " please select bid error "});
        return;
    }

    var sql = "select event_name, event_title from t_stat_event where bid='" + bid + "' ";


    var stat_key_model = db.sequelize.define('stat_key_model', {
        column_name: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        }
    });

    db.sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT, model: stat_key_model}).then(function(result)
    {
        var data = {
            code: "0",
            list: []
        };

        result.forEach(function(value, index){
            var item = value.get();
            var obj={};
            obj["event_name"] = item["event_name"];
            obj["event_title"] = item["event_title"];
            data.list.push(obj);
        });

        res.json(data);

    },function(err){
        console.log("eee error: " + err);

        res.json({code: -1, msg: " get bid error "});
    }).done();
}

function getDataByEventKey(req, res)
{
    var queryObj = req.query || {};

    var day= queryObj["day"];
    var bid = queryObj["bid"];
    var app = queryObj["app"];
    var plat= queryObj["plat"];
    var channel = (queryObj["channel"] == undefined ? "-1":queryObj["channel"]);
    var version = (queryObj["version"] == undefined ? "-1":queryObj["version"]);

    var eventkey=queryObj["eventkey"];

    if(day == undefined)
    {
        res.json({code: -1, msg: " please select day error "});
        return;
    }

    if(bid == undefined)
    {
        res.json({code: -1, msg: " please select bid error "});
        return;
    }

    if(app == undefined)
    {
        res.json({code: -1, msg: " please select app error "});
        return;
    }

    if(eventkey == undefined)
    {
        res.json({code: -1, msg: " please select event error "});
        return;
    }

    var table = "t_app_event_"+day;

    var sql = "select a.stat_type, a.stat_key, a.stat_sub_key, a.total_value, a.total_times, a.total_users, b.column_name, b.column_title from " + table
        + " as a , t_stat_column as b  where a.stat_bid='" + bid + "' and a.app='" + app + "' and a.plat='" + plat + "' and a.channel='" + channel + "' and a.version='" + version +  "' and a.stat_key='"+eventkey+"' and a.stat_bid=b.bid and a.stat_key=b.event_name and a.stat_sub_key=b.column_name  order by total_value desc ";

    console.log(sql);

    var stat_event_model = db.sequelize.define('stat_event_model', {
        stat_type: {
            type: Sequelize.INTEGER,
            allowNull: false //是否允许为空
        },
        stat_key: {
            type: Sequelize.STRING,
            allowNull: false //是否允许为空
        },
        stat_sub_key:{
            type: Sequelize.STRING,
            allowNull: true //是否允许为空
        },
        total_value:{
            type: Sequelize.INTEGER,
            allowNull: false //是否允许为空
        },
        total_times:{
            type: Sequelize.INTEGER,
            allowNull: false //是否允许为空
        },
        total_users:
        {
            type: Sequelize.INTEGER,
            allowNull: false //是否允许为空
        }
    });

    db.sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT, model: stat_event_model}).then(function(result)
    {
        //console.log(result);

        var data = {
            code: "0",
            list: []
        };

        result.forEach(function(value, index){
            var item = value.get();

            var obj = {};

            if(parseInt(item["stat_type"]) >= 3 && item["stat_sub_key"] == "")
            {
                return;
            }

            obj["stat_type"] = item["stat_type"] ;
            obj["stat_key"] = item["stat_key"] ;
            obj["stat_sub_key"] = item["stat_sub_key"] ;
            obj["total_value"] = item["total_value"] ;
            obj["total_times"] = item["total_times"] ;
            obj["total_users"] = item["total_users"] ;
            obj["column_title"] = item["column_title"];

            data.list.push(obj);
        });

        res.json(data);

    },function(err){
        console.log("eee error: " + err);

        res.json({code: -1, msg: " get bid error "});
    }).done();
}


function getBetweenDay(start, end)
{
    var days = [];

    var startDay = start.substr(0, 4) + "-" + start.substr(4, 2) + "-" + start.substr(6,8);
    console.log(startDay);

    var endDay   = end.substr(0, 4) + "-" + end.substr(4, 2) + "-" + end.substr(6,8);
    console.log(endDay);

    var startTime = new Date(startDay);
    var endTime   = new Date(endDay);
    var daySeconds = 24*3600*1000;

    console.log("++++ " + startTime.getTime() + " end : " + endTime.getTime());

    curTime = startTime;

    while(curTime <= endTime)
    {
        var curDay = curTime.getFullTime();
        days.push(curDay);

        curTime  = new Date(curTime.getTime() + daySeconds);

        console.log(curDay);
    }

    //days.push(endDay);

    console.log(days);

    return days;
}

function getMutliDataByEventKey(req, res)
{
    var queryObj = req.query || {};

    var startday= queryObj["startday"];
    var endday= queryObj["endday"];

    var bid = queryObj["bid"];
    var app = queryObj["app"];
    var plat= queryObj["plat"];
    var channel = (queryObj["channel"] == undefined ? "-1":queryObj["channel"]);
    var version = (queryObj["version"] == undefined ? "-1":queryObj["version"]);

    var eventkey=queryObj["eventkey"];
    var subeventkey=queryObj["subeventkey"];
    var eventtype=queryObj["eventtype"];

    if(startday == undefined || endday ==undefined)
    {
        res.json({code: -1, msg: " please select day error "});
        return;
    }

    if(eventtype >= 3 && subeventkey == undefined)
    {
        res.json({code: -1, msg: " please select static key error "});
        return;
    }

    if(bid == undefined)
    {
        res.json({code: -1, msg: " please select bid error "});
        return;
    }

    if(app == undefined)
    {
        res.json({code: -1, msg: " please select app error "});
        return;
    }

    if(eventkey == undefined)
    {
        res.json({code: -1, msg: " please select event error "});
        return;
    }

    var days = getBetweenDay(startday, endday);

    var getDataFromTable = function(day){
        var deferred = Q.defer();

        var table = "t_app_event_" + day;
        var sql = "select stat_type, stat_key, stat_sub_key, total_value, total_times, total_users from " + table
            + " where stat_bid='" + bid + "' and app='" + app + "' and channel='" + channel + "' and version='" + version +  "' and stat_key='" + eventkey + "' ";

        if(eventtype > 3)
        {
            sql += " and stat_sub_key='" + subeventkey + "'";
        }

        sql += " order by total_value desc ";

        console.log(sql);
        var stat_event_model = db.sequelize.define('stat_event_model', {
            stat_type: {
                type: Sequelize.INTEGER,
                allowNull: false //是否允许为空
            },
            stat_key: {
                type: Sequelize.STRING,
                allowNull: false //是否允许为空
            },
            stat_sub_key:{
                type: Sequelize.STRING,
                allowNull: true //是否允许为空
            },
            total_value:{
                type: Sequelize.INTEGER,
                allowNull: false //是否允许为空
            },
            total_times:{
                type: Sequelize.INTEGER,
                allowNull: false //是否允许为空
            },
            total_users:
            {
                type: Sequelize.INTEGER,
                allowNull: false //是否允许为空
            }
        });

        db.sequelize.query(sql, { type: Sequelize.QueryTypes.SELECT, model: stat_event_model}).then(function(result)
        {
            //console.log(result);

            var data = {
                code: "0",
                day:day,
                list: []
            };

            result.forEach(function(value, index){
                var item = value.get();

                if(parseInt(item["stat_type"]) >= 3 && item["stat_sub_key"] == "")
                {
                    return;
                }

                var obj = {};

                obj["stat_type"] = item["stat_type"] ;
                obj["stat_key"] = item["stat_key"] ;
                obj["stat_sub_key"] = item["stat_sub_key"] ;
                obj["total_value"] = item["total_value"] ;
                obj["total_times"] = item["total_times"] ;
                obj["total_users"] = item["total_users"] ;

                data.list.push(obj);
            });

            deferred.resolve(data);
        },function(err){
            console.log("eee error: " + err);

            deferred.resolve({code: -1, day:day, msg: " get data from mysql error "});
        });

        return deferred.promise;
    };

    var task = [];

    for(var i = 0 ; i < days.length; i++)
    {
        task.push(getDataFromTable(days[i]))
    }

    Q.all(task).spread(function(){
        console.log(arguments);//获得的参数为('test1 fun1', 'test2 fun2', 'test3 fun3' )
        res.send({code:0, list:arguments});
    });
}

function doAction(req, res, next)
{
    var queryObj = req.query || {};

    var action = queryObj["action"];

    if(action == "getVersion")
    {
        //拉取版本信息
        getVersion(req, res);
    }
    else if(action == "getChannel")
    {
        //拉取渠道信息
        getChannel(req, res);
    }
    else if(action == "getBaseStatData")
    {
        //根据具体的条件拉取数据
        getBaseStatData(req, res);
    }
    else if(action == "getConActive")
    {
        getConActive(req, res);
    }
    else if(action == "getConRemain")
    {
        getConRemain(req, res);
    }
    else if(action == "getError")
    {
        getError(req, res);
    }
    else if(action == "getBid")
    {
        //获取统计模块
        getBid(req, res);
    }
    else if(action == "getEventKey")
    {
        //获取统计的功能模块
        getEventKey(req, res);
    }
    else if(action == "getSubEventKey")
    {
        //获取统计的功能点对应的key
    }
    else if(action == "getDataByEventKey")
    {
        //获取一天的功能模块的统计数据
        getDataByEventKey(req, res);
    }
    else if(action == "getMutliDataByEventKey")
    {
        //获取某一个统计点的统计数据
        getMutliDataByEventKey(req, res);
    }
    else if(action == "getbusstat")
    {
        //取得stat_bus里的数据
        getbusstat(req, res);
    }
    else if(action == "bus_add")
    {
        //stat_bus里添加数据
        bus_add(req, res);
    }
    else if(action == "bus_delete")
    {
        //stat_bus里删除数据
        bus_delete(req, res);
    }
    else if(action == "bus_update")
    {
        //stat_bus里删除数据
        bus_update(req, res);
    }
    else if(action == "geteventstat")
    {
        //取得stat_bus里的数据
        geteventstat(req, res);
    }
    else if(action == "event_add")
    {
        //stat_event里删除数据
        event_add(req, res);
    }
    else if(action == "event_delete")
    {
        //event删除数据
        event_delete(req, res);
    }
    else if(action == "event_update")
    {
        //stat_event里删除数据
        event_update(req, res);
    }

/*
*
* conlog表增删改查
* */

    else if(action == "getconlogstat")
    {
        //取得stat_bus里的数据
        getconlogstat(req, res);
    }
    else if(action == "conlog_add")
    {
        //stat_event里删除数据
        conlog_add(req, res);
    }
    else if(action == "conlog_delete")
    {
        //event删除数据
        conlog_delete(req, res);
    }
    else if(action == "conlog_update")
    {
        //stat_event里删除数据
        conlog_update(req, res);
    }





    else if(action == "getcolumnstat")
    {
        //取得stat_bus里的数据
        getcolumnstat(req, res);
    }
    else if(action == "column_add")
    {
        //stat_event里删除数据
        column_add(req, res);
    }
    else if(action == "column_delete")
    {
        //event删除数据
        column_delete(req, res);
    }
    else if(action == "column_update")
    {
        //stat_bus里删除数据
        column_update(req, res);
    }



    else if(action == "getlognamestat")
    {
        //取得stat_bus里的数据
        getlognamestat(req, res);
    }
    else if(action == "logname_add")
    {
        //stat_event里删除数据
        logname_add(req, res);
    }
    else if(action == "logname_delete")
    {
        //event删除数据
        logname_delete(req, res);
    }
    else if(action == "logname_update")
    {
        //stat_bus里删除数据
       logname_update(req, res);
    }



    else
    {
        var data = {"code":-1, msg:" no such action "};
        res.json(data);
    }

    return;
}

/* GET home page. */
router.get('/', doAction);
router.post('/', doAction);



module.exports = router;
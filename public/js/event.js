
function conEventData(datalist)
{
    if(datalist.length == 0)
    {
        alert("没有查询到数据");
        return;
    }

    var data = {x:[], y:[]};

    var times = {"name":"次数", "data":[], "yAxis": 0, type:"column"};
    var users = {"name":"人数", "data":[], "yAxis": 1, type:"spline"};

    for(var i = 0 ; i < datalist.length && i < 30; i++)
    {
        var tmp = datalist[i];

        data.x.push(tmp.column_title);

        times.data.push(tmp.total_value);
        users.data.push(tmp.total_users);
    }

    data.y.push(times);
    data.y.push(users);

    console.log(" log type : " + data);

    return data;
}

function showTopEventData4Chart(eventkey, list)
{
    if(list.length == 0)
    {
        return;
    }

    eventName = $("#eventkey option[value='" + eventkey+ "']")[0].text;

    var data = conEventData(list);

    console.log(data);

    $('#chart').highcharts({
        title: {
            text: "事件类型:" + eventName,
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            categories:data.x
        },
        yAxis: [{
            title: {
                text: '次数'
            },
            style: {
                color: '#89A54E'
            }
        },
            {
                title: {
                    text: '人数'
                },
                style: {
                    color: '#4572A7'
                },
                opposite: true
            }],
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series:data.y
    });
}

function showSubEvent(stat_type, stat_key, stat_sub_key, column_title)
{
    $("#myModalLabel").text(column_title+"|"+stat_sub_key + "详情");

    var curDay=$("#day").val();

    //var formatDay = curDay.substr(0,4) + "-" + curDay.substr(4, 6) + "-" + curDay.substr(6,8);

    var beforeDay = getBeforeDayStrByCurDay(curDay, 7);

    console.log(beforeDay);

    $("#startday").val(beforeDay);
    $("#endday").val(curDay);
    $("#hstat_type").val(stat_type);
    $("#hstat_key").val(stat_key);
    $("#hstat_sub_key").val(stat_sub_key);

    getContinueEventData(stat_type, stat_key, stat_sub_key);

    $('#myModal').modal({});
}

function showEventData4Table(datalist)
{
    $("#list").empty();

    var html = "<table class='table table-hover'> <thead> <tr> <th>事件名称</th> <th>统计类型</th> <th>统计数值</th> <th>统计人数</th><th>客户端发生数</th><th>查看详情</th></tr></thead>";

    for(var i = 0 ; i < datalist.length; i++)
    {
        var dayData = datalist[i];

        var tr = "<tr>";

        tr += "<td>" + dayData.column_title+"|" + dayData.stat_sub_key + "</td>";

        tr +="<td>" + dayData.stat_type + "</td>";
        tr +="<td>" + dayData.total_value + "</td>";
        tr +="<td>" + dayData.total_users + "</td>";
        tr +="<td>" + dayData.total_times + "</td>";
        tr +="<td><a href='javascript:showSubEvent(\"" + dayData.stat_type + "\",\"" + dayData.stat_key + "\",\""  + dayData.stat_sub_key + "\",\"" + dayData.column_title +  "\")' class='showmodel'>查看详情</a></td>";
        tr += "</tr>";

        html += tr;
    }

    html += "</table>";

    $("#list").append(html);
}

function showContinueEventData(list)
{
    var data = {x:[], y:[]};

    var times = {"name":"次数", "data":[], "yAxis": 0, type:"column"};
    var users = {"name":"人数", "data":[], "yAxis": 1, type:"spline"};

    for( key in list)
    {
        var item = list[key];

        data.x.push(item.day);

        if(item.code == 0 && item.list.length > 0)
        {
            times.data.push(item.list[0].total_value);
            users.data.push(item.list[0].total_users);
        }
        else
        {
            times.data.push(0);
            users.data.push(0);
        }
    }

    data.y.push(times);
    data.y.push(users);

    $('#subkeychart').highcharts({
        title: {
            text: "事件" ,
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            categories:data.x
        },
        yAxis: [{
            title: {
                text: '次数'
            },
            style: {
                color: '#89A54E'
            }
        },
            {
                title: {
                    text: '人数'
                },
                style: {
                    color: '#4572A7'
                },
                opposite: true
            }],
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series:data.y
    });
}

function getContinueEventData(stat_type, stat_key, stat_sub_key)
{
    var startDay = $("#startday").val();
    var endDay = $("#endday").val();

    var param={};
    param["action"]="getMutliDataByEventKey";
    param["app"]=$("#app").val();
    param["plat"]=$("#plat").val();
    param["version"]=$("#version").val();
    param["channel"]=$("#channel").val();
    param["bid"] = $("#bid option:selected").text();
    param["startday"] = startDay;
    param["endday"] = endDay;
    param["eventkey"] = stat_key;
    param["subeventkey"] = stat_sub_key;
    param["eventtype"] = stat_type;

    var params = composeParam(param);

    console.log(params);

    var url = "/basestat/ajax?";

    url += params;

    $.get(url, {}, function(data){

        if(data.code != 0)
        {
            alert(" 出错了：" + data.msg);
        }
        else
        {
            showContinueEventData(data.list);
        }
    });


}

function getBaseStat4Show()
{
    var app = $("#app").val();
    var plat = $("#plat").val();
    var version = $("#version").val();
    var channel=$("#channel").val();
    var bid = $("#bid option:selected").text();
    var eventkey=$("#eventkey").val();
    var day   = $("#day").val();

    if(app == undefined )
    {
        alert("请选择产品");
        return;
    }

    if(day == undefined)
    {
        alert("请选择日期");
        return;
    }

    var url = "/basestat/ajax?";

    var param = {};

    param["action"] = "getDataByEventKey";
    param["app"] = app;
    param["plat"] = plat;
    param["version"] = version;
    param["channel"] = channel;
    param["bid"] = bid;
    param["eventkey"] = eventkey;

    param["day"] = day;

    var params = composeParam(param);

    console.log(params);

    url += params;

    $.get(url, {}, function(data){

        if(data.code != 0)
        {
            alert(" 出错了：" + data.msg);
        }
        else
        {
            showTopEventData4Chart(eventkey, data.list);

            showEventData4Table(data.list);
        }
    });
}

function initMySelect(key)
{
    var app = $("#app").val();
    var plat=$("#plat").val();

    var version = $("#version").val();

    var param = {};

   if(key == "version")
    {
        param["action"] = "getVersion";
    }
    else if(key == "channel")
   {
       param["action"] = "getChannel";
   }
    else {
        console.log(" stat key : " + key);
    }

    param["app"] = app;
    param["plat"] = plat;

    var params = composeParam(param);

    var url = "/basestat/ajax?"+ params;

    $.get(url, {}, function(data){
        //data = Json.parse(data);

        if(data.code != 0)
        {
            alert(" 出错了：" + data.msg);
        }
        else
        {
            $("#"+ key +" option").each(function(){
                if( $(this).val() != '-1'){
                    $(this).remove();
                }
            });

            for(var i = 0; i < data.list.length; i++)
            {
                if(data.list[i] != "-1") {
                    $("#" + key).append("<option value='" + data.list[i] + "'>" + data.list[i] + "</option>");
                }
            }
        }
    });

}


function initMyPlat()
{
    var app = $("#app").val();

    $("#plat option").each(function(){
        $(this).remove();
    });

    if(app=="stockpc")
    {

        $("#plat").append("<option value='WIN'>PC</option>");
    }
    else
    {
        $("#plat").append("<option value='ADR'>Android</option>");
        $("#plat").append("<option value='IOS'>IOS</option>");

        $("#plat").val("ADR");
    }
}

function initBidSelect()
{
    var param={};
    param["action"] = "getBid";
    param["app"] = $("#app").val();

    var params = composeParam(param);

    var url = "/basestat/ajax?"+ params;

    $.get(url, {}, function(data){
        //data = Json.parse(data);

        if(data.code != 0)
        {
            alert(" 出错了：" + data.msg);
        }
        else
        {
            $("#bid").empty();

            for(var i = 0; i < data.list.length; i++)
            {
                    $("#bid").append("<option value='" + data.list[i].bname + "'>" + data.list[i].bname + "</option>");
            }

            initEventSelect();
        }
    });

}

function initEventSelect()
{
    var bid=$("#bid").val();

    var param={};
    param["action"] = "getEventKey";
    param["app"] = $("#app").val();
    param["day"] = $("#day").val();
    param["bid"] = $("#bid").val();

    var params = composeParam(param);

    var url = "/basestat/ajax?"+ params;

    $.get(url, {}, function(data){

        if(data.code != 0)
        {
            alert(" 出错了：" + data.msg);
        }
        else
        {
            $("#eventkey").empty();

            for(var i = 0; i < data.list.length; i++)
            {
                var event_title=data.list[i].event_title;
                var event_name=data.list[i].event_name;
                $("#eventkey").append("<option value='" + event_name + "' selected>" + event_title + "</option>");
            }

            getBaseStat4Show();
        }
    });
}

function initMyBar()
{
    //初始化toolbar，相关事件
    $("#app").bind("click", function(){
        initBidSelect();
        initMyPlat();
        initMySelect("version");
        initMySelect("channel");
    });

    $("#plat").bind("click", function(){
        initMySelect("version");
        initMySelect("channel");
    });


    $("#btsubmit").bind("click", function(){
        getBaseStat4Show();
    });

    var todayDate = getBeforeDayStr(1);
    var lastDate = getBeforeDayStr(7);


    console.log(todayDate);

    $("#day").datepicker({"dateFormat":"yymmdd", defaultDate : todayDate});
    $("#day").val(todayDate);

    $("#startday").datepicker({"dateFormat":"yymmdd", defaultDate : todayDate});
    $("#startday").val(todayDate);

    $("#endday").datepicker({"dateFormat":"yymmdd", defaultDate : lastDate});
    $("#endday").val(lastDate);

    initSelect("version");
    initSelect("channel");

    initBidSelect();

    $("#bid").bind("click", function(){
        initEventSelect();
    });

    $("#btsubmit2").bind("click", function(){
        var stat_type=$("#hstat_type").val();
        var stat_key=$("#hstat_key").val();
        var stat_sub_key=$("#hstat_sub_key").val();

        getContinueEventData(stat_type, stat_key, stat_sub_key);
    });


}

$(document).ready(function(){
    initMyBar();
});



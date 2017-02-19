/**
 * Created by 99162 on 2016/10/13.
 */
var G_URL = "/basestat/ajax?";

function composeParam(param)
{
    var params = "";

    for(key in param)
    {
        if(params == "")
        {
            params = key + "=" + param[key];
        }
        else
        {
            params += "&" + key + "=" + param[key];
        }
    }

    return params;
}


function convertData2Chart(datalist, showType)
{
    var data = {
        x:[],
        y:[]
    };

    var y = [];
    for(var i = 0 ; i < datalist.length; i++)
    {
        var item = datalist[i];

        var value = 0;

        if(showType == "lnewall")
        {
            value = item.new_user + item.update_user;
        }
        else if(showType == "lnew")
        {
            value = item.new_user;
        }
        else if(showType == "lupdate")
        {
            value = item.update_user;
        }
        else if(showType == "lactive")
        {
            value = item.active_user;
        }
        else if(showType == "ltotal")
        {
            value = item.total_user;
        }

        data.x.push(item.day_time);
        data.y.push(value);
    }

    console.log(data);

    return data;
}

function showChartData(label, list, id)
{

    $('#' + id).highcharts({
        title: {
            text: label,
            x: -20 //center
        },
        subtitle: {
            text: '',
            x: -20
        },
        xAxis: {
            categories:list.x
        },
        yAxis: {
            title: {
                text: '数量'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ''
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series:[{name:label, data:list.y}]
    });
}




function initSelect(key)
{
    var app = $("#app").val();
    var plat=$("#plat").val();

    var version = $("#version").val();
    var channel = $("#channel").val();

    var param = {};

    if(key == "channel")
    {
        param["action"] = "getChannel";
        param["version"] = version;
    }
    else if(key == "version")
    {
        param["action"] = "getVersion";
        param["channel"] = channel;
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

function initPlat()
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
        $("#plat").append("<option value='-1'>ALL</option>");
        $("#plat").append("<option value='ADR'>Android</option>");
        $("#plat").append("<option value='IOS'>IOS</option>");

        $("#plat").val("-1");
    }
}

function initToolBar()
{
    //初始化toolbar，相关事件
    $("#app").bind("click", function(){
        initPlat();
        initSelect("version");
        initSelect("channel");
    });

    $("#plat").bind("click", function(){
        initSelect("version");
        initSelect("channel");
    });

    $("#version").bind("click", function(){
        initSelect("channel");
    });


    $("#btsubmit").bind("click", function(){
        getBaseStat4Show();
    });

    $("#bus_submit").bind("click", function(){
        addbusline();
    });
    $("#updatebusline").bind("click", function(){
        getupdatebusline(sid,sbname,sstatus,slast_user);
    });
    $("#updateeventline").bind("click", function(){
        getupdateeventline(sid,sbid,sevent_name,sevent_desc,sevent_title,slast_user,sstatus);
    });
    $("#event_submit").bind("click", function(){
        addeventline();
    });
    $("#updatecolumnline").bind("click", function(){
        getupdatecolumnline(sid,sbid,scolumn_name,scolumn_desc,sstat_type,scolumn_order,sstatus,slast_user);
    });
    /*$("#column_submit").bind("click", function(){
        addcolumnline(bid,column_name,column_desc,stat_type,column_order,status,last_user);
    });
*/
    $("#button_bussubmit").bind("click", function(){
        test();
    });


    var todayDate = getBeforeDayStr(1);
    var lastDate = getBeforeDayStr(7);

    console.log(todayDate);

    $("#startday").datepicker({"dateFormat":"yymmdd", defaultDate : lastDate});
    $("#startday").val(lastDate);

    $("#endday").datepicker({"dateFormat":"yymmdd", defaultDate : todayDate});
    $("#endday").val(todayDate);

    initSelect("version");
    initSelect("channel");
}

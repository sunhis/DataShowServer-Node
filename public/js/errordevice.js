function showBaseStatData(datalist)
{
    if(datalist.length == 0)
    {
        alert("没有查询到数据");
        return;
    }

    $("#tblist  tr:not(:first)").empty();

    for(var i = 0 ; i < datalist.length; i++)
    {
        var dayData = datalist[i];

        var tr = "<tr>";
        tr +="<td>" + dayData.day_time + "</td>";
        tr +="<td>" + dayData.crash_times + "</td>";
        tr +="<td>" + dayData.crash_users + "</td>";
        tr += "</tr>";

        $("#tblist").append(tr);
    }
}

function getBaseStat4Show()
{
    var app = $("#app").val();
    var plat = $("#plat").val();
    var version = $("#version").val();
    /*var machine = $("#machine").val();
    var os = $("#os").val();*/

    var startday = $("#startday").val();
    var endday   = $("#endday").val();

    if(app == undefined )
    {
        alert("请选择产品");
        return;
    }

    if(startday == undefined )
    {
        alert("请选择开始日期");
        return;
    }

    if(endday == undefined)
    {
        alert("请选择结束日期");
        return;
    }

    if(endday < startday)
    {
        alert("结束日期小于开始日期");
        return;
    }

    var url = "/basestat/ajax?";

    var param = {};

    param["action"] = "getError";
    param["app"] = app;
    param["plat"] = plat;
    param["version"] = version;
    param["startday"] = startday;
    param["endday"] = endday;

    var params = composeParam(param);

    url += params;

    $.get(url, {}, function(data){

        if(data.code != 0)
        {
            alert(" 出错了：" + data.msg);
        }
        else
        {
            showBaseStatData(data.list);
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

function initMyBar()
{
    //初始化toolbar，相关事件
    $("#app").bind("click", function(){
        initMyPlat();
        initMySelect("version");
    });

    $("#plat").bind("click", function(){
        initMySelect("version");
    });


    $("#btsubmit").bind("click", function(){
        getBaseStat4Show();
    });

    var todayDate = getBeforeDayStr(1);
    var lastDate = getBeforeDayStr(7);

    console.log(todayDate);

    $("#startday").datepicker({"dateFormat":"yymmdd", defaultDate : lastDate});
    $("#startday").val(lastDate);

    $("#endday").datepicker({"dateFormat":"yymmdd", defaultDate : todayDate});
    $("#endday").val(todayDate);

    initSelect("version");
}

$(document).ready(function(){
    initMyBar();
    getBaseStat4Show(showBaseStatData);
});



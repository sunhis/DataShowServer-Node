


function showAllBastStatData(datalist)
{
    if(datalist.length == 0)
    {
        alert("没有查询到数据");
        return;
    }

    var showLabel = [{type:"lnewall", label:"新增"},
                     {type:"lnew", label:"新增(去重)"},
                     {type:"lupdate", label:"更新"},
                     {type:"ltotal", label:"累计"}];

    for(var i = 0 ; i < showLabel.length; i++)
    {
        var showItem = showLabel[i];

        var type = showItem.type;
        var data = convertData2Chart(datalist, type);

        showChartData(showItem.label, data, type+"-chart");
    }

}

function getBaseStat4Show()
{
    var app = $("#app").val();
    var plat = $("#plat").val();
    var version = $("#version").val();
    var channel = $("#channel").val();

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

    param["action"] = "getBaseStatData";
    param["app"] = app;
    param["plat"] = plat;
    param["version"] = version;
    param["channel"] = channel;
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
            showAllBastStatData(data.list);
        }
    });
}

$(document).ready(function(){
    initToolBar();
    getBaseStat4Show();
});



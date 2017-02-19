function showBaseStatData(datalist)   //从getBaseStat4Show的异步函数里传的data获取的数据


{
    if(datalist.length == 0)
    {
        alert("没有查询到数据");
        return;
    }

    $("#tblist  tr:not(:first)").empty();  //这句话有什么用，tblist哪里来的

    for(var i = 0 ; i < datalist.length; i++)
    {
        var dayData = datalist[i];

        var tr = "<tr>";
        tr +="<td>" + dayData.day_time + "</td>";
        tr +="<td>" + parseFloat(dayData.remain_1_rate*100).toFixed(2) + "%(" + dayData.remain_1 + ")</td>";
        tr +="<td>" + parseFloat(dayData.remain_2_rate*100).toFixed(2) + "%(" + dayData.remain_2 + ")</td>";
        tr +="<td>" + parseFloat(dayData.remain_3_rate*100).toFixed(2) + "%(" + dayData.remain_3 + ")</td>";
        tr +="<td>" + parseFloat(dayData.remain_4_rate*100).toFixed(2) + "%(" + dayData.remain_4 + ")</td>";
        tr +="<td>" + parseFloat(dayData.remain_5_rate*100).toFixed(2) + "%(" + dayData.remain_5 + ")</td>";
        tr +="<td>" + parseFloat(dayData.remain_6_rate*100).toFixed(2) + "%(" + dayData.remain_6 + ")</td>";
        tr += "</tr>";

        $("#tblist").append(tr);
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

    param["action"] = "getConRemain";
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
            showBaseStatData(data.list);
        }
    });
}

$(document).ready(function(){
    initToolBar();
    getBaseStat4Show(showBaseStatData);
});



/*
function showTopBannerData(lastDayData)
{
    $("#lnewall").text(lastDayData.new_user + lastDayData.update_user);
    $("#lnew").text(lastDayData.new_user);
    $("#lupdate").text(lastDayData.update_user);
    $("#lactive").text(lastDayData.active_user);
}

function showBaseStatData(datalist)
{
    if(datalist.length == 0)
    {

        return;
    }

    var lastData = datalist[ datalist.length - 1];

    var type = $(".span1.stat.checkcard").find("span")[1].id;
    var label = $(".span1.stat.checkcard").find("span")[0].innerText;

    console.log("type:" + type + "; label: " + label);

    showTopBannerData(lastData);

    var showData = convertData2Chart(datalist, type);

    showChartData(label, showData, "statsChart");


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
            showBaseStatData(data.list);
        }
    });
}

function initBannerTip()
{
    $(".span1.stat").each(function(index, item)
    {
        console.log(item);
        $(item).bind("click", function(e){
            $(".span1.stat").each(function(i,tmp){
                $(tmp).removeClass("checkcard");
            });

            $(this).addClass("checkcard");

            getBaseStat4Show();
        })
    });
}

$(document).ready(function(){
    initToolBar();
    initBannerTip();
    getBaseStat4Show(showBaseStatData);
});


*/

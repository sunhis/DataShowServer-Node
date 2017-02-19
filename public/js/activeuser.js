
function showChartData(label, xAxis, list, id)
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
            categories:xAxis
        },
        yAxis: [{
            title: {
                text: '数量'
            },
            style: {
                color: '#89A54E'
            }
        },
            {
                title: {
                    text: '活跃比%'
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
        series:list
    });
}

function showActiveData(datalist)
{
    if(datalist.length == 0)
    {
        alert("没有查询到数据");
        return;
    }

    var showItem = {type:"lactive", label:"活跃数"};

    var type = showItem.type;
    var data = convertData2Chart(datalist, type);

    console.log("asdasdasda" + data.y.toString());

    var list = new Array();

    var active = {"name":showItem.label, "data":data.y, "yAxis": 0};

    list.push(active);

    var xAxis = data.x;

    var total = convertData2Chart(datalist, "ltotal");

    var rate = {"name":"活跃比", "data":[], "yAxis": 1,  "tooltip": {
        valueSuffix: ' %'}};

    for(var i = 0 ; i < data.y.length; i++)
    {
        if(total.y[i] == 0)
        {
            rate.data.push(0);
        }
        else
        {
            var value = data.y[i]* 100 / total.y[i];
            console.log(value + "|" + value.toFixed(2));

            rate.data.push(parseFloat(value.toFixed(2)));
        }
    }

    list.push(rate);

    console.log(list);

    showChartData(showItem.label, xAxis, list, showItem.type+"-chart");
}


function getPer(value, sum){
    if(sum == 0)
    {
        return 0;
    }
    else
    {
        return parseFloat((value*100/sum).toFixed(2));
    }
}

function conDat2ConActive(list)
{
    var result={};

    result.x = [];

    var keyResult =  {"active_1":{"name":"活跃1-2天", data:[]},
                "active_2":{"name":"活跃3-4天", data:[]},
                "active_3":{"name":"活跃5-9天", data:[]},
                "active_4":{"name":"活跃10-14天", data:[]},
                "active_5":{"name":"活跃15-30天", data:[]},
                "active_6":{"name":"大于30天", data:[]}
              };


    for(var i = 0 ; i < list.length; i++)
    {
        var tmp = list[i];

        result.x.push(tmp.day_time);

        var num = tmp.active_1 + tmp.active_2+tmp.active_3+tmp.active_4+tmp.active_5+tmp.active_6;

        keyResult.active_1.data.push(getPer(tmp.active_1, num));
        keyResult.active_2.data.push(getPer(tmp.active_2, num));
        keyResult.active_3.data.push(getPer(tmp.active_3, num));
        keyResult.active_4.data.push(getPer(tmp.active_4, num));
        keyResult.active_5.data.push(getPer(tmp.active_5, num));
        keyResult.active_6.data.push(getPer(tmp.active_6, num));
    }

    result.y = [];

    for(key in keyResult)
    {
        result.y.push(keyResult[key]);
    }

    return result;
}


function showConActiveData(list)
{
   var data = conDat2ConActive(list);

    $('#lconactive-chart').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '活跃度'
        },
        xAxis: {
            categories: data.x
        },
        yAxis: {
            min: 0,
            title: {
                text: '连续活跃占比'
            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }
        },
        legend: {
            align: 'right',
            layout:'vertical',
            x:10,
            verticalAlign: 'top',
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}%<br/>'
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
                }
            }
        },
        series: data.y
    });
}

function getConActive(param)
{
    param["action"] = "getConActive";

    var params = composeParam(param);

    var tmpurl = G_URL + params;

    $.get(tmpurl, {}, function(data){

        if(data.code != 0)
        {
            alert(" 出错了：" + data.msg);
        }
        else
        {
            showConActiveData(data.list);
        }
    });
}

function getActive(param)
{
    param["action"] = "getBaseStatData";

    var params = composeParam(param);

    var tmpurl = G_URL + params;

    $.get(tmpurl, {}, function(data){

        if(data.code != 0)
        {
            alert(" 出错了：" + data.msg);
        }
        else
        {
            showActiveData(data.list);
        }
    });
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

    var param = {};

    param["app"] = app;
    param["plat"] = plat;
    param["version"] = version;
    param["channel"] = channel;
    param["startday"] = startday;
    param["endday"] = endday;

    getActive(param);

    getConActive(param);
}


$(document).ready(function(){
    initToolBar();
    getBaseStat4Show();
});



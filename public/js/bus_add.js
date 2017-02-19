
function showbusStatData(busdatalist)  //从stat_bus数据库读取的数据进行处理
{


    if(busdatalist.length == 0)
    {
        alert("没有查询到数据");
        return;
    }

    $("#buslist  tr:not(:first)").empty();

    for(var i = 0 ; i < busdatalist.length; i++)
    {
        var bus = busdatalist[i];
        var tr = "<tr>";
        tr +="<td>" + bus.id + "</td>";
        tr +="<td>" + bus.bname+"</td>";
        tr +="<td>" + bus.bus_des+"</td>";
        tr +="<td>" + bus.status+"</td>";
        tr +="<td>" + bus.last_user+"</td>";
        tr +="<td>" + "<a href='javascript:delbusline(\"" + bus.id + "\")'>删除</a>" +"</td>";
        tr +="<td>" + "<a href='javascript:updatebusline(\"" + bus.id + "\",\"" + bus.bname + "\",\"" + bus.bus_des+ "\",\""  + bus.status + "\",\"" + bus.last_user +  "\")'>修改</a>"+"</td>";
        tr+="</tr>";
        $("#buslist").append(tr);
    }
}

function test(){
    $("#myModalLabel").text("添加数据");

    $("#sid").val("");
    $("#sbname").val("");
    $("#sbus_des").val("");
    $("#sstatus").val("");
    $("#slast_user").val("");
    $('#myModal').modal({});
}
//修改一条数据
function updatebusline(id,bname,bus_des,status,last_user){
    alert("good")

console.log(id+bname)

   $("#myModalLabel").text("当前数据id="+id)

    $("#sid").val(id);
    $("#sbname").val(bname);
    $("#sbus_des").val(bus_des);
    $("#sstatus").val(status);
    $("#slast_user").val(last_user);
    console.log("what"+id+bname+status+last_user);


    $('#myModal').modal({});
}
function getupdatebusline(){

    var id = $("#sid").val();
    var bname = $("#sbname").val();
    var bus_des = $("#sbus_des").val();
    var status = $("#sstatus").val();
    var last_user=$("#slast_user").val();

    var param = {};
    param["id"] = id;
    param["bname"] = bname;
    param["bus_des"] = bus_des;
    param["status"] = status;
    param["last_user"] = last_user;
    var url1 ="/basestat/ajax?action=bus_update&"
    var params = composeParam(param);

    console.log(params)
    url1 += params;

    var url2 ="/basestat/ajax?action=bus_add&";
    url2 += params;
    if(id==undefined || id == "")
    {

        $.get(url2,function(){
            getbusStatShow();
        });
    }
    else
    {
    $.get(url1,function(){
        getbusStatShow();
    });
    }
}



function getbusStatShow()
{

    var url = "/basestat/ajax?action=getbusstat";
    $.get(url, {}, function(busdata){

        if(busdata.code != 0)
        {
            alert(" 出错了：" + busdata.msg);
        }
        else
        {
            showbusStatData(busdata.list);
        }
    });
}

$(document).ready(function(){
    $("#bus_submit").bind("click", function(){
        addbusline();
    });
    $("#updatebusline").bind("click", function(){
        getupdatebusline();
    });
    $("#button_bussubmit").bind("click", function(){
        test();
    });
    getbusStatShow(showbusStatData);
});
//添加bus表里一行数据
function addbusline(){

    var bname = $("#bname").val();
    var bus_des= $("#bus_des").val();
    var status = $("#status").val();
    var last_user = $("#last_user").val();

    var param = {};
    param["action"] = "bus_add";
    param["bname"] = bname;
    param["bus_des"] = bus_des;
    param["status"] = status;
    param["last_user"] = last_user;

    var params = composeParam(param);
    var url ="/basestat/ajax?"
    console.log(params)
    url += params;

    $.get(url,{}, function (databus) {
        if(databus.code != 0)
        {
            alert(" 出错了：" + databus.msg);
        }
        else
        {


            console.log("hao hao ahao ");
        }

    });
}
//删除bus表数据
function delbusline(id){

    alert("ok");

    var url ="/basestat/ajax?action=bus_delete&&id="+id;

    //url += params;
    $.get(url,function(){
        getbusStatShow();
    });

}



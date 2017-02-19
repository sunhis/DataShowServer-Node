
function showlognameData(datalognamelist)  //从conlog数据库读取的数据进行处理
{


    if(datalognamelist.length == 0)
    {
        alert("没有查询到数据");
        return;
    }

    $("#lognamelist  tr:not(:first)").empty();

    for(var i = 0 ; i < datalognamelist.length; i++)
    {
        var bus = datalognamelist[i];
        var tr = "<tr>";
        tr +="<td>" + bus.id + "</td>";
        tr +="<td>" + bus.app+"</td>";
        tr +="<td>" + bus.server+"</td>";
        tr +="<td>" + bus.log_name+"</td>";
        tr +="<td>" + bus.last_user+"</td>";
        tr +="<td>" + bus.status+"</td>";
        tr +="<td>" + "<a href='javascript:dellognameline(\"" + bus.id + "\")'>删除</a>" +"</td>";
        tr +="<td>" + "<a href='javascript:updatelognameline(\"" + bus.id + "\",\"" + bus.app + "\",\"" + bus.server+ "\",\""  + bus.log_name + "\",\"" + bus.last_user +  "\",\"" + bus.status +  "\")'>修改</a>"+"</td>";
        tr+="</tr>";
        $("#lognamelist").append(tr);
    }
}

function test(){
    $("#myModalLabel").text("添加数据");

    $("#sid").val("");
    $("#sapp").val("");
    $("#sserver").val("");
    $("#slog_name").val("");
    $("#slast_user").val("");
    $("#sstatus").val("");
    $('#myModal').modal({});
}
//修改一条数据
function updatelognameline(id,app,server,log_name,last_user,status){
    alert("good")


    $("#myModalLabel").text("当前数据id="+id)

    $("#sid").val(id);
    $("#sapp").val(app);
    $("#sserver").val(server);
    $("#slog_name").val(log_name);
    $("#slast_user").val(last_user);
    $("#sstatus").val(status);

    $('#myModal').modal({});
}
function getupdatelognameline(sid,sapp,sserver,slog_name,slast_user){
    var id = $("#sid").val();
    var app= $("#sapp").val();
    var server=$("#sserver").val();
    var log_name=$("#slog_name").val();
    var  last_user = $("#slast_user").val();
    var  status = $("#sstatus").val();

    var param = {};
    param["id"] = id;
    param["app"] = app;
    param["server"] = server;
    param["log_name"] = log_name;
    param["last_user"] = last_user;
    param["status"] = status;
    var url1 ="/basestat/ajax?action=logname_update&"
    var params = composeParam(param);

    console.log(params)
    url1 += params;

    var url2 ="/basestat/ajax?action=logname_add&";
    url2 +=params;
    if(id==undefined || id == "")
    {

        $.get(url2,function(){
            getlognameShow();
        });
    }
    else
    {
        $.get(url1,function(){
            getlognameShow();
        });
    }
}



function getlognameShow()
{

    var url = "/basestat/ajax?action=getlognamestat";
    $.get(url, {}, function(datalogname){

        if(datalogname.code != 0)
        {
            alert(" 出错了：" + datalogname.msg);
        }
        else
        {
            showlognameData(datalogname.list);
        }
    });
}

$(document).ready(function(){
    $("#button_bussubmit").bind("click", function(){
        test();
    });
    $("#updatelognameline").bind("click", function(){
        getupdatelognameline(sid,sapp,sserver,slog_name,slast_user)
    });
    getlognameShow(showlognameData);
});
//添加conlog表里一行数据
/*function addconlogline(){

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
 }*/
//删除bus表数据
function dellognameline(id){

    alert("ok");

    var url ="/basestat/ajax?action=logname_delete&&id="+id;

    //url += params;
    $.get(url,function(){
        getlognameShow();
    });

}



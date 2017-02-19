
function showconlogData(dataconloglist)  //从conlog数据库读取的数据进行处理
{


    if(dataconloglist.length == 0)
    {
      //  alert("没有查询到数据");
        return;
    }

    $("#conloglist  tr:not(:first)").empty();

    for(var i = 0 ; i < dataconloglist.length; i++)
    {
        var bus = dataconloglist[i];
        var tr = "<tr>";
        tr +="<td>" + bus.id + "</td>";
        tr +="<td>" + bus.app+"</td>";
        tr +="<td>" + bus.server+"</td>";
        tr +="<td>" + bus.log_name+"</td>";
        tr +="<td>" + bus.log_type+"</td>";
        tr +="<td>" + bus.last_user+"</td>";
        tr +="<td>" + bus.con_type+"</td>";
        tr +="<td>" + bus.tran_type+"</td>";
        tr +="<td>" + bus.speed_type+"</td>";
        tr +="<td>" + bus.status+"</td>";
        tr +="<td>" + "<a href='javascript:delconlogline(\"" + bus.id + "\")'>删除</a>" +"</td>";
        tr +="<td>" + "<a href='javascript:updateconlogline(\"" + bus.id + "\",\"" + bus.app + "\",\"" + bus.server+ "\",\""  + bus.log_name + "\",\"" + bus.log_type +  "\",\"" + bus.last_user +  "\",\"" + bus.con_type +  "\",\"" + bus.tran_type +  "\",\"" + bus.speed_type +  "\")'>修改</a>"+"</td>";
        tr+="</tr>";
        $("#conloglist").append(tr);
    }
}

function test(){
    $("#myModalLabel").text("添加数据");

    $("#sid").val("");
    $("#sapp").val("");
    $("#sserver").val("");
    $("#slog_name").val("");
    $("#slog_type").val("");
    $("#slast_user").val("");
    $("#scon_type").val("");
    $("#stran_type").val("");
    $("#sspeed_type").val("");
    $("#sstatus").val("");
    $('#myModal').modal({});
}
//修改一条数据
function updateconlogline(id,app,server,log_name,log_type,last_user,con_type,tran_type,speed_type){
    alert("good")


    $("#myModalLabel").text("当前数据id="+id)

    $("#sid").val(id);
    $("#sapp").val(app);
    $("#sserver").val(server);
    $("#slog_name").val(log_name);
    $("#slog_type").val(log_type);
    $("#slast_user").val(last_user);
    $("#scon_type").val(con_type);
    $("#stran_type").val(tran_type);
    $("#sspeed_type").val(speed_type);
    $("#sstatus").val(status);


   // getupdateconlogline();

    $('#myModal').modal({});
}
function getupdateconlogline(){

    var id = $("#sid").val();
    var app= $("#sapp").val();
    var server=$("#sserver").val();
    var log_name=$("#slog_name").val();
    var log_type = $("#slog_type").val();
    var  last_user = $("#slast_user").val();
    var  con_type = $("#scon_type").val();
    var tran_type =  $("#stran_type").val();
    var  speed_type =  $("#sspeed_type").val();
    var  status =  $("#sstatus").val();

    var param = {};
    param["id"] = id;
    param["app"] = app;
    param["server"] = server;
    param["log_name"] = log_name;
    param["log_type"] = log_type;
    param["last_user"] = last_user;
    param["con_type"] = con_type;
    param["tran_type"] = tran_type;
    param["speed_type"] = speed_type;
    param["status"] = status;
    var url1 ="/basestat/ajax?action=conlog_update&"
    var params = composeParam(param);

    console.log(params)
    url1 += params;

    var url2 ="/basestat/ajax?action=conlog_add&";
    url2 +=params;
    if(id==undefined || id == "")
    {
        $.get(url2,function(){
            getconlogShow();
        });
    }
    else
    {
        $.get(url1,function(){
            getconlogShow();
        });
    }
}


//展示数据
function getconlogShow()
{

    var url = "/basestat/ajax?action=getconlogstat";
    $.get(url, {}, function(dataconlog){

        if(dataconlog.code != 0)
        {
            alert(" 出错了：" + dataconlog.msg);
        }
        else
        {
            showconlogData(dataconlog.list);
        }
    });
}


$(document).ready(function(){
    $("#button_bussubmit").bind("click", function(){
        test();
    });
    $("#updateconlogline").bind("click", function(){
        getupdateconlogline();
    });
    getconlogShow(showconlogData);
});

//删除bus表数据
function delconlogline(id){


    var url ="/basestat/ajax?action=conlog_delete&&id="+id;

    //url += params;
    $.get(url,function(){
        getconlogShow();
    });

}



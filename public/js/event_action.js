function showeventStatData(eventdatalist)  //从stat_event数据库读取的数据进行处理
{


    if(eventdatalist.length == 0)
    {
        alert("没有查询到数据");
        return;
    }

    $("#eventlist  tr:not(:first)").empty();

    for(var i = 0 ; i < eventdatalist.length; i++)
    {
        var bus = eventdatalist[i];
        var tr = "<tr>";
        tr +="<td>" + bus.id + "</td>";
        tr +="<td>" + bus.bid + "</td>";
        tr +="<td>" + bus.event_name+"</td>";
        tr +="<td>" + bus.event_desc+"</td>";
        tr +="<td>" + bus.event_title+"</td>";
        tr +="<td>" + bus.last_user+"</td>";
        tr +="<td>" + bus.status+"</td>";
        tr +="<td>" + "<a href='javascript:deleventline(\"" + bus.id + "\")'>删除</a>" +"</td>";
        tr +="<td>" + "<a href='javascript:updateeventline(\"" + bus.id + "\",\"" + bus.bid + "\",\"" + bus.event_name+ "\",\""  + bus.event_desc + "\",\"" + bus.event_title +  "\",\"" + bus.last_user + "\",\"" + bus.status + "\")'>修改</a>"+"</td>";
        tr+="</tr>";
        $("#eventlist").append(tr);
    }
}
function test(){

    $("#sid").val("");
    $("#sbid").val("");
    $("#sevent_name").val("");
    $("#sevent_desc").val("");
    $("#sevent_title").val("");
    $("#slast_user").val("");
    $("#sstatus").val("");
    $('#myModal').modal({});
}

//修改一条数据
function updateeventline(id,bid,event_name,event_desc,event_title,last_user,status){
    alert("good")

    console.log(id+event_name)

    $("#myModalLabel").text("当前数据id="+id)
    $("#sid").val(id);
    $("#sbid").val(bid);
    $("#sevent_name").val(event_name);
    $("#sevent_desc").val(event_desc);
    $("#sevent_title").val(event_title);
    $("#slast_user").val(last_user);
    $("#sstatus").val(status);
    console.log("what"+id+status+last_user);
    $('#myModal').modal({});
}
function getupdateeventline(){

    var id = $("#sid").val();
    var bid = $("#sbid").val();
    var event_name = $("#sevent_name").val();
    var event_desc = $("#sevent_desc").val();
    var event_title=$("#sevent_title").val();
    var last_user=$("#slast_user").val();
    var status=$("#sstatus").val();

    var param = {};
    //param["action"] = "event_update";
    param["id"] = id;
    param["bid"] = bid;
    param["event_name"] = event_name;
    param["event_desc"] = event_desc;
    param["event_title"] = event_title;
    param["last_user"] = last_user;
    param["status"] = status;

    var params = composeParam(param);
    var url1 ="/basestat/ajax?action=event_update&";
    url1 += params;

    if (id==undefined || id == ""){
        var url2 ="/basestat/ajax?action=event_add&";
        console.log(params)
        url2 += params;
        $.get(url2,function(){
            geteventStatShow();
        });

    }
    else{

    $.get(url1,function(){
        geteventStatShow();
    });
    }
}



//展示数据
function geteventStatShow()
{

    var url = "/basestat/ajax?action=geteventstat";
    $.get(url, {}, function(eventdata){

        if(eventdata.code != 0)
        {
            alert(" 出错了：" + eventdata.msg);
        }
        else
        {
            showeventStatData(eventdata.list);
        }
    });
}

$(document).ready(function(){
    $("#event_submit").bind("click", function(){
        addeventline();
    });

    $("#updateeventline").bind("click", function(){
        getupdateeventline();
    });
    $("#button_bussubmit").bind("click", function(){
        test();
    });

    geteventStatShow(showeventStatData);
});


//event表添加数据
/*function addeventline(){

    var bid = $("#bid").val();
    var event_name= $("#event_name").val();
    var event_desc = $("#event_desc").val();
    var event_title = $("#event_title").val();
    var last_user = $("#last_user").val();
    var status = $("#status").val();

    var param = {};
    param["action"] = "event_add";
    param["bid"] = bid;
    param["event_name"] = event_name;
    param["event_desc"] = event_desc;
    param["event_title"] = event_title;
    param["last_user"] = last_user;
    param["status"] = status;
    var params = composeParam(param);
    var url ="/basestat/ajax?"
    console.log(params)
    url += params;

    $.get(url,{}, function (eventdata) {
        if(eventdata.code != 0)
        {
            alert(" 出错了：" + eventdata.msg);
        }
        else
        {


            console.log("hao hao ahao ");
        }

    });
}*/
//删除event数据
function deleventline(id){

    alert("ok");

    var url ="/basestat/ajax?action=event_delete&&id="+id;

    //url += params;
    $.get(url,{}, function (eventdata) {
        if(eventdata.code != 0)
        {
            alert(" 出错了：" + eventdata.msg);
        }
        else
        {

            //需要重新加载数据
            console.log("hao hao ahao ");
        }

    });

}

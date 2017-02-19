function showcolumnStatData(columntdatalist)  //从stat_event数据库读取的数据进行处理
{


    if(columntdatalist.length == 0)
    {
        alert("没有查询到数据");
        return;
    }

    $("#columnlist  tr:not(:first)").empty();

    for(var i = 0 ; i < columntdatalist.length; i++)
    {
        var bus = columntdatalist[i];
        var tr = "<tr>";
        tr +="<td>" + bus.id + "</td>";
        tr +="<td>" + bus.bid + "</td>";
        tr +="<td>" + bus.column_name+"</td>";
        tr +="<td>" + bus.column_desc+"</td>";
        tr +="<td>" + bus.stat_type+"</td>";
        tr +="<td>" + bus.column_order+"</td>";
        tr +="<td>" + bus.status+"</td>";
        tr +="<td>" + bus.last_user+"</td>";
        tr +="<td>" + "<a href='javascript:delcolumnline(\"" + bus.id + "\")'>删除</a>" +"</td>";
        tr +="<td>" + "<a href='javascript:updatecolumnline(\"" + bus.id + "\",\"" + bus.bid + "\",\"" + bus.column_name+ "\",\""  + bus.column_desc + "\",\"" + bus.stat_type +  "\",\"" + bus.column_order + "\",\"" + bus.status + "\",\"" + bus.last_user + "\")'>修改</a>"+"</td>";
        tr+="</tr>";
        $("#columnlist").append(tr);
    }
}

//修改一条数据
function updatecolumnline(id,bid,column_name,column_desc,stat_type,column_order,status,last_user){

    console.log(id+column_name)
    $("#myModalLabel").text("当前数据id="+id)
    $("#sid").val(id);
    $("#sbid").val(bid);
    $("#scolumn_name").val(column_name);
    $("#scolumn_desc").val(column_desc);
    $("#sstat_type").val(stat_type);
    $("#scolumn_order").val(column_order);
    $("#sstatus").val(status);
    $("#slast_user").val(last_user);
    console.log("what"+id+status+last_user);


    $('#myModal').modal({});
}


//新增
function test(){

    $("#sid").val("");
    $("#sbid").val("");
    $("#scolumn_name").val("");
    $("#scolumn_desc").val("");
    $("#sstat_type").val("");
    $("#scolumn_order").val("");
    $("#sstatus").val("");
    $("#slast_user").val("");


    $('#myModal').modal({});
}


function getupdatecolumnline(){

    var id = $("#sid").val();
    var bid = $("#sbid").val();
    var column_name = $("#scolumn_name").val();
    var column_desc = $("#scolumn_desc").val();
    var stat_type=$("#sstat_type").val();
    var column_order=$("#scolumn_order").val();
    var status=$("#sstatus").val();
    var last_user=$("#slast_user").val();


    var param = {};
    //param["action"] = "column_update";
    param["id"] = id;
    param["bid"] = bid;
    param["column_name"] = column_name;
    param["column_desc"] = column_desc;
    param["stat_type"] = stat_type;
    param["column_order"] = column_order;
    param["status"] = status;
    param["last_user"] = last_user;


    var params = composeParam(param);
    var url1 ="/basestat/ajax?action=column_update&";
    url1 += params;
    var url2 ="/basestat/ajax?action=column_add&";
    url2 += params;
    if(id==undefined || id == "")
    {
        console.log(url2);
        $.get(url2,function(){
            getcolumnStatShow();
        });
    }
    else {

        $.get(url1,function(){
            getcolumnStatShow();
        });
    }
}

//展示数据
function getcolumnStatShow()
{

    var url = "/basestat/ajax?action=getcolumnstat";
    $.get(url, {}, function(columndata){

        if(columndata.code != 0)
        {
            alert(" 出错了：" + columndata.msg);
        }
        else
        {
            showcolumnStatData(columndata.list);
        }
    });
}

$(document).ready(function(){
   /* $("#column_submit").bind("click", function(){
        addcolumnline(bid,column_name,column_desc,stat_type,column_order,status,last_user);
    });*/

    $("#updatecolumnline").bind("click", function(){
        getupdatecolumnline();
    });
    $("#button_bussubmit").bind("click", function(){
        test();
    });
    getcolumnStatShow(showcolumnStatData);
});

//删除event数据
function delcolumnline(id){

    alert("ok");

    var url ="/basestat/ajax?action=column_delete&&id="+id;

    //url += params;
    $.get(url,function(){
        getcolumnStatShow();
    });
}

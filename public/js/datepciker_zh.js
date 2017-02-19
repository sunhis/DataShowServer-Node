$.datepicker.regional['zh-CN'] = {
    clearText: '清除',
    clearStatus: '清除已选日期',
    closeText: '关闭',
    closeStatus: '不改变当前选择',
    prevText: '<上月',
    prevStatus: '显示上月',
    prevBigText: '<<',
    prevBigStatus: '显示上一年',
    nextText: '下月>',
    nextStatus: '显示下月',
    nextBigText: '>>',
    nextBigStatus: '显示下一年',
    currentText: '今天',
    currentStatus: '显示本月',
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthNamesShort: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
    monthStatus: '选择月份',
    yearStatus: '选择年份',
    weekHeader: '周',
    weekStatus: '年内周次',
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
    dayStatus: '设置 DD 为一周起始',
    dateStatus: '选择 m月 d日, DD',
    dateFormat: 'yymmdd',
    firstDay: 1,
    initStatus: '请选择日期',
    isRTL: false
};
$.datepicker.setDefaults($.datepicker.regional['zh-CN']);/**
 * Created by 99162 on 2016/10/13.
 */

function getDayStr(date)
{
    var BaseYear = 1900;
    var BaseMonth = 1;
    console.log(date.getYear()+BaseYear);
    var month = date.getMonth() + BaseMonth;
    var day   = date.getDate();

    if(month < 10)
    {
        month = "0" + month;
    }

    if(day < 10)
    {
        day = "0" + day;
    }

    return (date.getYear()+BaseYear) + (month).toString()+ (day).toString();
}

function  getBeforeDayStr(index)
{
    var t = new Date();

    if(index == 0)
    {
        return getDayStr(t);
    }
    else
    {
        var lastDate = new Date(t.getTime() - 86400000*index);
        return getDayStr(lastDate);
    }
}

function formatDay(curDay)
{
    var year  = curDay.substr(0, 4);
    var month = curDay.substr(4,2);
    var day   = curDay.substr(6,2);

    if(parseInt(month) < 10)
    {
        month = "0" + month;
    }

    if(parseInt(day) < 10)
    {
        day = "0" + day;
    }

    return year + "-" + month + "-" + day;
}

function getBeforeDayStrByCurDay(curDay, index)
{
    var day= formatDay(curDay);

    console.log(curDay + "|" + day);

    var t = new Date(day);

    if(index == 0)
    {
        return curDay;
    }
    else
    {
        var lastDate = new Date(t.getTime() - 86400000*index);
        return getDayStr(lastDate);
    }
}

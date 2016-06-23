/**
 * Created by Administrator on 2016/6/19 0019.
 */
$(function (){
    var timer = null;
    var arrDay = ['日','一','二','三','四','五','六'];
    var num = 0;

    //生成时钟
    function  setTime(){
        var oDate = new Date();
        var oYear = oDate.getFullYear();
        var oMonth = oDate.getMonth()+1;
        var oDa = oDate.getDate();
        var oDay = oDate.getDay();
        var oHour = oDate.getHours();
        var oMinute = oDate.getMinutes();
        var oSecond = oDate.getSeconds();

        $('#time1').html(toDouble(oHour) + ':' + toDouble(oMinute) + ':' + toDouble(oSecond));
        $('#time2').html(oYear + '年' + toDouble(oMonth) + '月' + toDouble(oDa) + '日，星期' + arrDay[oDay]);
    }
    setTime();
    timer = setInterval(setTime,1000);

    //生成星期
    function creatDay(){
        var str = '';
        $.each(arrDay,function (i,ele){
            str += '<li>'+arrDay[i]+'</li>';
        })
        $('#dayBox').html(str);
    }
    creatDay();

    //生成日期
    function creatDate(){
        $('#dateBox').html('');
        var oDate = new Date();
        //设置月份
        oDate.setMonth(oDate.getMonth() + num);

        var oYear = oDate.getFullYear();
        var oMonth = oDate.getMonth()+1;
        console.log(oDate)
        var oDa = oDate.getDate();
        //var oDay = oDate.getDay();
        $('#time3').html(toDouble(oYear) + '年' + toDouble(oMonth) + '月');

        oDate.setDate(1);
        var m = oDate.getDay();
        console.log(oDate)
        if(m == 7){
            m = 0;
        }
        //上个月
        var preL = DayNumOfMonth(oYear,oMonth-1);
        for(var i=0;i<m;i++){
            var li = document.createElement('li');
            li.className = 'gray';
            $(li).html(preL-m+1+i);
            $('#dateBox').append(li);
        }

        //本月
        var length = DayNumOfMonth(oYear,oMonth);
        console.log(oMonth,length)
        for (var i = 0;i < length;i++){
            li = document.createElement('li');
            if (num ==0 && i == oDa - 1){
                li.className = 'active';
            }
            $(li).html(i+1);
            $('#dateBox').append(li);
        }

        //下个月
        var nextL = DayNumOfMonth(oYear,oMonth+1);
        var n = 42 - length - m;
        for(var i=0;i<n;i++){
            var li = document.createElement('li');
            li.className = 'gray';
            $(li).html(i+1);
            $('#dateBox').append(li);
        }
    }
    creatDate();

    $('#porn').find('span').eq(0).on('click',function (){
        num--;
        creatDate();
    });
    $('#porn').find('span').eq(1).on('click',function (){
        num++;
        creatDate();
    });

    //获取一个月天数
    function DayNumOfMonth(Year,Month)
    {
        var d = new Date(Year,Month,0);
        return d.getDate();
    }

    //补位
    function toDouble(num){
        return num<10? '0' + num : '' + num;
    };
})
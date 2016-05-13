/**
 * Created by Administrator on 2016/5/13.
 */
$(function(){
    $('#aomuntmoney').click( function(){
        $('#treelist_dummy').focus()
    });
    var i = Math.floor($('#treelist>li').length/2),
        j = Math.floor($('#treelist>li').eq(i).find('ul li').length /2);
    $("#treelist").mobiscroll().treelist({
        theme:"android-ics light",
        lang:"zh",
        defaultValue:[i,j],
        cancelText:null,
//            placeholder:"借款金额",
        headerText:function(valueText){return "借款金额";},
        formatResult:function(array){
            var text = $('#treelist>li').eq(array[0]).find('ul li').eq(array[1]).text().trim(' ');
            if(text=="万"){
                var w = 1;
            }else if(text == "十万"){
                var w = 10;
            }else if(text =="百万"){
                var  w = 100;
            }else if(text == "千万"){
                var w = 1000;
            }else if(text =="亿"){
                var w =10000
            }
            $('#amount').val($('#treelist>li').eq(array[0]).children('span').text()*w);
            console.log($('#amount').val())
         
        }

    })
    /*console.log($('#treelist_dummy').val())*/

})
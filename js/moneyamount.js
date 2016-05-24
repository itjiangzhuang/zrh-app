/**
 * Created by Administrator on 2016/5/13.
 */
$(function(){
	$.fn.aomuntmoney = function(){
        /*添加选取金额的布局*/  
        var txt1 = '<li><span></span><ul><li>万</li><li>十万</li><li>百万</li><li>千万</li><li>亿</li></ul></li>'
        for (var i = 0; i < 10; i++) {
            $("#treelist").append(txt1);
            $("#treelist span").eq(i).text(i + 1);
        }
		
		$('#aomuntmoney').click( function(){
	        $('#treelist_dummy').focus()
	    });
		 /*console.log($('#treelist_dummy').val())*/
	    var i = Math.floor($('#treelist>li').length/2),
	        j = Math.floor($('#treelist>li').eq(i).find('ul li').length /2);
	    $("#treelist").mobiscroll().treelist({
	        theme:"android-ics light",
	        lang:"zh",
			display:'bottom',
	        defaultValue:[i,j],
	        cancelText:null,
	//            placeholder:"借款金额",
	//        headerText:function(valueText){return "借款金额";},
			headerText:null,
	        formatResult:function(array){
	            var text = $('#treelist>li').eq(array[0]).find('ul li').eq(array[1]).text().trim(' ');
	            console.log(text);
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
	            $('#loanValue').val($('#treelist>li').eq(array[0]).children('span').text()*w);
//	            $('#loanValue').change();
	        },
	        onValueFill:function(array){
	        	$('#loanValue').change();
	        }
	    });
	}

   
})
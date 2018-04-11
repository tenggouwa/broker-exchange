(function($){
	$.fn.mailAutoComplete = function(options){
		var defaults = {
			boxStyle: "border:1px solid #ddd; background:#fff;position:absolute;left:-6000px;padding:5px 0px;text-align:left;", //外部box样式
			listStyle: "padding:3px 15px;cursor:pointer;white-space:nowrap;", //默认的列表样式
			focusStyle: "padding:8px 15px;cursor:pointer;white-space:nowrap;background:rgba(124, 161, 194, 0.4);color:white;font-size:15px;", //列表选样式中
			markStyle: "position:static;color:#666", //高亮样式
			zIndex: 1,
			mailArr: ["","@qq.com","@163.com","@126.com","@sina.com","@gmail.com","@foxmail.com","@sohu.com","@vip.qq.com","@hotmail.com","@163.net","@sina.com.cn","@139.com","@189.cn","@33.cn"], //邮件数组
			focusColor: "#fff", //获取焦点时的颜色
			blurColor: "#fff" //失去焦点时的颜色
		};
		var settings = $.extend({}, defaults, options || {});
		var boxStyle = settings.boxStyle, listStyle = settings.listStyle, focusStyle = settings.focusStyle, markStyle = settings.markStyle; //插件的class变量
		var zIndex = settings.zIndex, newArr = mailArr = settings.mailArr.concat(), hint = settings.textHint, text = settings.hintText, focusColor = settings.focusColor, blurColor = settings.blurColor;
		function createHtml(str, arr, cur){
			var mailHtml = "";
			if($.isArray(arr)){
				$.each(arr, function(i, n){
					if(i === cur){
						mailHtml += '<div class="mailHover mailFocus" style="'+focusStyle+'" id="mailList_'+i+'"><span style="'+markStyle+'">'+str+'</span>'+(arr[i] == 'autoCompletePhone' ? '': (''+arr[i]))+'</div>';
					}else{
						mailHtml += '<div class="mailHover" style="'+listStyle+'" id="mailList_'+i+'"><span style="'+markStyle+'">'+str+'</span>'+(arr[i] == 'autoCompletePhone' ? '': (arr[i]))+'</div>';
					}
				});
			}
			return mailHtml;
		}

		function complete(selector, mailListBox){
			$(selector).css("color", blurColor).off("keyup").parent().css("z-index",0);
			mailListBox.css("left", "-6000px");
			if(/@$/.test($(selector).val())){
				return $(selector).focus();
			}
			var nextInput = $(selector).nextAll('input[type=text],textarea');
			nextInput.length > 0 ? nextInput.eq(0).focus() : nextInput = $(selector).parent().find('input[type=text],textarea').not(selector);
			return nextInput.length > 0 ? nextInput.eq(0).focus() : false;
		}
		/*
	   * phone(integer phone)
	   * 校验是否是合法的手机号码
	   * 现在是只支持校验国内的手机号码，国际的目测是会校验不过的。
	   * return 合法的手机号 => true;不合法的手机号 => false;
	   * @author Verdient。
	   */
	  function phone(phone) {
	      phone = phone.toString();
	      var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1}))+\d{8})$/;      
	      if (phone.length != 11) {
	          return false;
	      } else if (!reg.test(phone)) {
	          return false;
	      } else {
	          return true;
	      }
	  }
		$(this).each(function(){
			if($(this).attr('class').indexOf('mailAutoCompleted') != -1){
				return false;
			}
			var that = $(this); 
			// var i = $('.mailAutoComplete').size();
			var i=10;
			var w = that.outerWidth(true), h = that.outerHeight(true), height = that.position().top, left = that.position().left; //获取当前对象（即文本框）的宽高
			that.addClass('mailAutoCompleted');
			that.after('<span style="position:absolute;left:'+left+'px;top:'+(h+height)+'px;display:block;z-index:10000;"><div id="mailListBox_'+i+'" class="mailAutoComplete" style="'+boxStyle+'min-width:'+(w-2)+'px;width:'+w+'px;top:0px;z-index:'+zIndex+';"></div></span>');
			var mailListBox = $("#mailListBox_" + i), liveValue; //列表框对象
			that.focus(function(){
				var index = -1, s = '', v='';
				$(this).css("color", focusColor).parent().css("z-index", zIndex);
				$(this).off('keyup');
				$(this).on('keyup', function(e){
					s = v = $.trim($(this).val()).toLowerCase();
					if(/@/.test(v)){
						s = v.replace(/@.*/, "");
					}
					if(v.length > 0){
						if(e.keyCode === 38){ //向上
							index <= 0 ? index = (newArr.length - 1) : index--;
							$(this).val($('#mailListBox_'+i).children('#mailList_'+index).text());
						}else if(e.keyCode === 40){ //向下
							index >= (newArr.length - 1) ? index = 0 :  index++;
							$(this).val($('#mailListBox_'+i).children('#mailList_'+index).text());
						}else if(e.keyCode === 13){ //回车
							complete(this,mailListBox);
							return $(this).blur();
						}else{
							if(/@/.test(v)){
								index = -1;
								var site = v.replace(/.*@/, "");
								newArr = $.map(mailArr, function(n){
									var reg = new RegExp(site);
									if(reg.test(n)){
										return n;
									}
								});
							}else{
								newArr = mailArr.concat();
								if(phone(s)){
									newArr.unshift('autoCompletePhone');
								}
							}
						}
						if(newArr.length>0){
							mailListBox.html(createHtml(s, newArr, index)).css("left", 0);
						}else{
							mailListBox.css("left", "-6000px");
						}

					}else{
						mailListBox.css("left", "-6000px");
					}
				}).blur(function(){
					complete(this,mailListBox);
					return $(this).val($.trim($(this).val()).toLowerCase());
				});

				$('body').on("mouseover", '.mailHover', function(){
					index = Number($(this).attr("id").split("_")[1]);
					liveValue = $('#mailListBox_'+i).children("#mailList_"+index).text();
					that.val(liveValue);
					s = v = $.trim(liveValue).toLowerCase();
					$(this).siblings().attr('style',listStyle);
					$(this).attr('style',focusStyle);
				});
			});
		});
	};
})(jQuery);
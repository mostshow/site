
if(LS.$B.client.browser.ie){
		if(LS.$B.client.browser.ver < 9){
			if(confirm('您的浏览器是IE'+LS.$B.client.browser.ver+'，不支持新特性以及存在一些兼容还未处理，建议您用ie9+,opera,firefox,safari,chrome体验更好，是否要继续浏览?')){
				}else{
				window.location = "http://"+window.location.host+"/index.php";
			}
		}
}else{
window.onbeforeunload = function(){return "您确定要离开QQ Desktop吗?";};
}

LS.$(window).bind('load',
	function() {
		//document.documentElement.mozRequestFullScreen();
		typeof progress=="function"&&progress("Ready");
		typeof progress=="function"&&progress("newObject s");

		
		new AppIcon({ulCont:'#web_content_cn',ulMenu:'#foucs1',client_but:'#client_but',icon_but:'#icon_but'});
		new MenuZoom({oDiv:'#web_menu',obj:'img'});
		new Clock();
		new ajax('#reg_button',{Form : '#myform_regs',url:'reg_ok.php',error:'#re_err_m',s_box:'#re_ui_boxy',getImg:'#re_imgVerify'});
		new ajax('#login_button',{Form : '#myform',url:'login_ok.php',error:'#err_m',s_box:'#ui_boxy',getImg:'#imgVerify'});
		new SelectCity('#weather_menu',{});
		var oBox =new AlertBox('#box1',{oTitle :'#boxTitle',oHref:'#boxHref',oDrag:'#web_top_c',boxBtn :'#web_box_wiw',oNarrow:'#task_x'});
		var oBoxBg =new AlertBox('#box2',{oDrag:'#web_top_cBg',boxBtn :'#web_box_wiw1'});
		var oBoxUp=new AlertBox('#box3',{oDrag:'#web_top_up',boxBtn :'#web_box_wiw2'});
		var oBoxQQ =new AlertQbox('#ui_boxy',{oDrag:'#login_logo_qq',boxBtn :'#ui_boxyClose',getImg:'#imgVerify'});
		var oRE_BoxQQ =new AlertQbox('#re_ui_boxy',{oDrag:'#re_login_logo_qq',boxBtn :'#re_ui_boxyClose',getImg:'#re_imgVerify'});
		var fu = new FileUpload("#uploadForm", "#idFile", { ExtIn: ["gif","jpg"]});
		typeof progress=="function"&&progress("newObject e");
		typeof progress=="function"&&progress("pageBasic s");
		LS.$('#reload').click(function(){
			location.reload();
		});
		LS.$('#upFile').click(function(){
			oBoxUp.show();
		});
		LS.$("#reg-btn").click(function(){
				oBoxQQ.hide();
				oRE_BoxQQ.show();
		});
		LS.$('#web_menu').find('.li').bind('click',function(){
			
			var iHttp=[
						'','case/index.html','case/index.html',
						 'case/index.html','case/index.html',
						 'case/index.html'			
					  ]
			oBox.show(iHttp[LS.$(this).index()],this.title);
		});
		LS.$('#q_Login').click(function(){
			if(LS.$('#Q_person_drag').elements[0] !=  null){
				Q_person.show()
				LS.$('#bottomBar').hide();
			}else{
				oBoxQQ.show();
			}
		});
		LS.$('#web_content_cn').find('li').bind('click',function(){
			var iHttp=[
						'case/index.html','case/index.html','case/index.html','yz/tem/index.html',
						'http://www.chinaweiyu.com','handbook/index.html','case/index.html','case/index.html',
						'case/index.html','case/index.html','case/index.html',
						'case/index.html','case/index.html','case/index.html','case/index.html','case/index.html','case/index.html','case/index.html','case/index.html',
						'case/index.html','case/index.html','case/index.html',
						'case/index.html','case/index.html',
						'case/index.html'
					  ]
			if(this.getAttribute('acc') == 'false'){
				oBox.show(iHttp[LS.$(this).index()],this.title);
			 }
		});
		LS.$('#menu_focus4').bind('click',function(){
			oBoxBg.show('','默认主题');
		});
		LS.$('#menu_bottom').click(function(){
			LS.$('#web_content_cn').find('li').css('opacity',0);
			LS.$('#web_content_cn').find('li').startMove({opacity:100});
		});
		LS.$('#Theme').bind('click',function(){
			oBoxBg.show('','默认主题');
		});
		LS.$('#changeimg_link').click(function(){
			LS.$('#imgVerify').attr('src', 'getVerifyCode.php?t='+Math.random()*10000);
		});
		LS.$('#re_changeimg_link').click(function(){
			LS.$('#re_imgVerify').attr('src', 'getVerifyCode.php?t='+Math.random()*10000);
		});
		LS.$B.ui.dragZ(LS.$('#web_titles').elements[0]);
		LS.$B.ui.drag(LS.$('#weather_s').elements[0],LS.$('#weather').elements[0]);
		(function(){
				var oBg=LS.$('#web_bg'),
					  oTextMenu = LS.$('#text_menu'),
					  iNow = 0,
					  oPerson = LS.$('#person_shadow_bg'),
					  oPersonClose = oPerson.find('span');
				if(LS.$B.cookies.getCookie('bg')){
					oBg.attr('src',LS.$B.cookies.getCookie('bg'));
				}
				LS.$('#skin_img').find('img').click(function(){
					oBg.attr('src',LS.$(this).attr('src'));
					LS.$B.cookies.setCookie('bg',LS.$(this).attr('src'),5)
				});
				LS.$(document).bind('contextmenu',function(ev){
					var ev = LS.$E.getEvent(ev);
					oTextMenu.css({'left':ev.clientX+'px','top':ev.clientY+'px'}).show().startMove({opacity:100});
					return false;
				}).bind('click',function(){
					oTextMenu.startMove({opacity:0},function(){oTextMenu.hide()});
				});
				LS.$('#text_menu_ul').find('li').hover(function(){
					var childUl = LS.$(this).find('ul'),
							that = this;
					if(childUl.elements[0]){
						clearTimeout(childUl.elements[0].timer);
						childUl.show();
					};
				},function(){
					var childUl = LS.$(this).find('ul');
					if(childUl.elements[0]){
						childUl.elements[0].timer=setTimeout(function(){
							childUl.hide();
						},300)
					};
				});
				oPerson.click(function(){
					oPerson.find('div').show();
					LS.$('#fast_bg').css('zIndex','1000').show();
					oPerson.flex({right: 63, top: 33},{right:parseInt(LS.$B.dom.vieW()/2),top:300},function(now){
						this.style.right=now.right+'px';
						this.style.top=now.top+'px';
					},function(){
						oPerson.find('div').eq(0).startMoveF({height:187,opacity:100},function(){
							oPerson.find('div').eq(1).startMoveF({width:305,opacity:100},function(){
								oPerson.find('div').eq(2).startMoveF({height:190,opacity:100},function(){
									oPerson.find('div').eq(3).startMoveF({width:301,opacity:100},function(){
										oPersonClose.show();
									})
								})
							})
						})
					})
				});
				oPersonClose.click(function(ev){
					var ev = LS.$E.getEvent(ev);
					ev.cancelBubble=true;
					oPersonClose.hide();
					oPerson.find('div').eq(3).startMoveF({width:0,opacity:0},function(){
						oPerson.find('div').eq(2).startMoveF({height:0,opacity:0},function(){
							oPerson.find('div').eq(1).startMoveF({width:0,opacity:0},function(){
								oPerson.find('div').eq(0).startMoveF({height:0,opacity:0},function(){
									oPerson.flex({right:parseInt(LS.$B.dom.vieW()/2),top:300},{right:63,top:33},
										function(now){
											this.style.right=now.right+'px';
											this.style.top=now.top+'px';
										}
									);
									LS.$('#fast_bg').css('zIndex','100').hide();
								})
							})
						})
					})			
				});

				
		})();
		LS.$("#idLimit").html(fu.Limit);
		LS.$("#idExt").html(fu.ExtIn.join("，"));
		LS.$("#idBtndel").click(function(){ fu.Clear(); }); 
		LS.$("#idBtnupload").click(function(){
			//显示文件列表
			var arrRows = [];
			LS.$B.fn.each(fu.Files, function(o){ arrRows.push([o.value, "&nbsp;"]); });
			fu.AddList(arrRows);
			
			fu.Folder.style.display = "none";
			LS.$("#idProcess").show();
			LS.$("#idMsg").html("正在添加文件到服务器，请稍候……<br />有可能因为网络问题，出现程序长时间无响应，请点击“<a href='?'><font color='red'>取消</font></a>”重新上传文件");
			fu.Form.submit();
		});

});
typeof progress=="function"&&progress("pageBasic e");
typeof progress=="function"&&progress("createObject s");
//在iframe通过window.parent来访问主页面的函数
function Finish(msg){ alert(msg); location.href=location.href; }
var Class = {
  create: function() {
    return function() {
      this._initialize.apply(this, arguments);
    }
  }
}
var MenuZoom = Class.create();
MenuZoom.prototype ={
	_initialize : function(options){
		var that = this;
		this._setOptions(options);

		LS.$(document).bind('mousemove',function(ev){
			var oEvent=LS.$E.getEvent(ev);
			that.toBig(oEvent);
		});


		this.oDiv = LS.$(this.options.oDiv).elements[0];
		this.obj = LS.$(this.options.oDiv).find(this.options.obj);
		this.d = this.options.d;
		this.iMax = this.options.iMax;
	},
	_setOptions : function(options){
		this.options = {
			 oDIv:null,
			 obj:null
		};
		return LS.$B.object.extend(this.options,options || {});

	},
	getDistance : function(obj,oDiv,oEvent){
		return Math.sqrt
		(
			Math.pow(obj.offsetLeft+oDiv.offsetLeft-oEvent.clientX+obj.offsetWidth/2, 2)+
			Math.pow(obj.offsetTop+oDiv.offsetTop-oEvent.clientY+obj.offsetHeight/2, 2)
		);
	},
	toBig : function(oEvent){
		var that = this,
				subFn = function(el,oDiv){
					var scale = 0.8 - that.getDistance(el,oDiv,oEvent)/200;
					if(scale < 0.5){
						scale = 0.5;
					}
					el.width= scale * 68;
					el.height= scale * 68;
				}
		this.obj.each(function(el){
			subFn(el,that.oDiv);
			}
		);

	}

};
var AlertBox = Class.create();
AlertBox.prototype = {
	_initialize : function(box,options){
		var that = this;
		this.box = LS.$(box);
		this._setOptions(options);
		this.sHref = this.options.sHref;
		this.sTitle = this.options.sTitle;
		this.oTitle = LS.$(this.options.oTitle);
		this.oHref = LS.$(this.options.oHref);
		this.oDrag = LS.$(this.options.oDrag).elements[0];
		this.boxBtn = LS.$(this.options.boxBtn).find('a');
		this.oNarrow = LS.$(this.options.oNarrow);
		
		this.flag = true;
		if(this.boxBtn.elements[2]){
			LS.$E.myAddEvent(this.boxBtn.elements[2],'click',function(){that.box.startMove({height:0,opacity:0},function(){
				that.flag = true;
				that.boxBtn.elements[1].className ='magnify'
				that.box.hide();
				that.oTitle.html('加载中...');
				that.oHref.attr('src','case/loading.html');
				})
			});
			LS.$E.myAddEvent(this.boxBtn.elements[1],'click',function(){that.resize(that,this);	});
			LS.$E.myAddEvent(this.oDrag,'dblclick',function(){that.resize(that,that.boxBtn.elements[1]);	});
			LS.$E.myAddEvent(this.boxBtn.elements[0],'click',function(){that.dispose();	});
			this.oNarrow.hover(function(){
				LS.$(this).find('div').startMove({top:-30})
			},function(){
				LS.$(this).find('div').startMove({top: 0})
			})
		}else{
			LS.$E.myAddEvent(this.boxBtn.elements[0],'click',function(){that.box.startMove({height:0,opacity:0},function(){
				that.box.hide();
				that.oTitle.html('加载中...');
				that.oHref.attr('src','case/loading.html');
				})
			});
		}

	},
	_setOptions : function(options){
		this.options ={
			sHref : '#',
			boxBtn : '',
			oTitle : '',
			oHref : '',
			oDrag : '',
			oNarrow : '',
			getImg:''
		}
		return LS.$B.object.extend(this.options,options || {});
	},
	show : function (sHref,sTitle){

		this.oTitle.html(sTitle);
		this.oHref.attr('src',sHref);
		this.box.stop().css({'opacity':100,'height':'400px','width':'800px'}).show();
		var L = (LS.$B.dom.vieW()-this.box.elements[0].offsetWidth)/2;
		var T = (LS.$B.dom.vieH()-this.box.elements[0].offsetHeight)/2;
		if(T<0){T=0;};
		if(L<0){L=0;};
		this.box.css({'left':L+'px','top':T+'px'});

		this.drag(this.oDrag,this.box.elements[0]);
	},
	hide : function(){
		this.box.hide();
	},
	drag : function(oDIv,dragDiv){
		LS.$B.ui.drag(oDIv,dragDiv);
	},
	resize : function(that,obj){
		if(that.flag){
			obj.className='active';
			that.box.startMove({left:0,top:0,width:LS.$B.dom.vieW(),height:LS.$B.dom.vieH()})
			that.flag = !that.flag;
		}else{
			obj.className ='magnify'
			var T=(LS.$B.dom.vieH()-400)/2;
			var L = (LS.$B.dom.vieW()-800)/2;
			T = T > 0 ? Math.ceil(T) : Math.floor(T);
			L = L > 0 ? Math.ceil(L) : Math.floor(L);
			if(T<0){
				T=0;
			};
			if(L<0){
				L=0;
			};
			that.flag = !that.flag;
			that.box.startMove({width:800,height:400,left:L,top:T})
		}
	},
	dispose : function (){
		var T =  this.box.elements[0].offsetTop,
			  sT = this.box.elements[0].offsetHeight,
			  that = this;
		this.box.startMove({height:0,opacity:0,top:T+sT});
		var sTitle = this.oTitle.html();
		this.oNarrow.find('h4').html(sTitle);
		this.oNarrow.show().startMove({width:100});
		this.oNarrow.find('.task_max').bind('click',function(){
			that.box.startMove({top:T,height:sT,opacity:100});
			that.oNarrow.startMove({width:0},function(){
				that.oNarrow.hide();
			});
		})
		this.oNarrow.find('.task_close').bind('click',function(){
			that.flag = true;
			that.boxBtn.elements[1].className ='magnify'
			that.oNarrow.flex({width:0},function(){
				that.oNarrow.hide();
			});
		})
	}
}
var AlertQbox = Class.create();
LS.$B.fn.classExtend(AlertQbox,AlertBox);


AlertQbox.prototype.show = function(sLeft,sTop,z){
		this.getImg.attr('src', 'getVerifyCode.php?t='+Math.random()*10000);//获取验证码
		this.box.show();
		var L = (LS.$B.dom.vieW()-this.box.elements[0].offsetWidth)/2;
		var T = (LS.$B.dom.vieH()-this.box.elements[0].offsetHeight)/2;
		if(T<0){T=0;};
		if(L<0){L=0;};
		if(sLeft || sTop){
			this.box.css({'left':L+sLeft+'px','top':T+sTop+'px',zIndex:z});
		}else{
			this.box.css({'left':L+'px','top':T+'px'});
		}
		this.drag(this.oDrag,this.box.elements[0]);
}
AlertQbox.prototype._initialize = function(box,options){
		var that = this;
		this.box = LS.$(box);
		this._setOptions(options);
		this.oDrag = LS.$(this.options.oDrag).elements[0];
		this.boxBtn = LS.$(this.options.boxBtn).elements[0];
		this.getImg = LS.$(this.options.getImg);
		this.flag = true;
		LS.$E.myAddEvent(this.boxBtn,'click',function(){that.box.hide();});
}
var AlertQboxTwo = Class.create();
LS.$B.fn.classExtend(AlertQboxTwo,AlertQbox);
AlertQboxTwo.prototype._initialize = function(box,options){
		var that = this;
		this.box = LS.$(box);
		this._setOptions(options);
		this.oDrag = LS.$(this.options.oDrag).elements[0];
		this.boxBtn = LS.$(this.options.boxBtn).elements[0];
		this.flag = true;
		LS.$E.myAddEvent(this.boxBtn,'click',function(){
			//if(confirm("确定退出吗？")){
				//LS.$B.ajax.get('login_out.php',function(str){
						//alert(str);
						//that.box.html('');
				//});
				//clearInterval(Q_person.timer);
				//var script = LS.$('#JSONP').elements[0];
				//script.parentNode.removeChild(script);
				 //浏览器不会回收这些属性所指向的对象.
				//手动删除它以免内存泄漏.
				//for (var prop in script) {
				//	delete script[prop];
				//} 
			//}
		

			location.href = location.href;
		});
}

AlertQboxTwo.prototype.show = function(){
		this.box.show();
		var L = LS.$B.dom.vieW()-this.box.elements[0].offsetWidth;
		var T = 0;
		if(T<0){T=0;};
		if(L<0){L=0;};
		this.box.css({'left':L+'px','top':T+'px'});
		this.drag(this.oDrag,this.box.elements[0]);
}

var AppIcon = Class.create();
AppIcon.prototype = {
	_initialize : function(options){
		var that = this,
			  i = 0,
			  k = 0;
		this._setOptions(options);
		this.ulCont = LS.$(this.options.ulCont).find('ul');
		this.ulCont_li = LS.$(this.options.ulCont).find('li')
		this.ulMenu = LS.$(this.options.ulMenu).find('li');
		this.client_but_li = LS.$(this.options.client_but).find('li');
		this.icon_but_li = LS.$(this.options.icon_but).find('li');
		this.iWidth = this.ulCont.elements[0].offsetWidth;
		this.iLiW = 86;
		this.iLiH = 88;
		this.iNow = 0;
		this.iNum1 = 140;
		this.iNum2 = 117;
		this.flag = 1;
		this.zIndex = 2;
		this.ArrLi(this.ulCont.elements);
		LS.$(window).bind('resize',function(){that.ArrLi(that.ulCont.elements);});
		LS.$(this.icon_but_li.elements[0]).click(function(){
			that.icon_but_li.removeClass('active');
			LS.$(this).addClass('active');
			that.iNum1 = 111;
			that.iNum2 = 78;
			that.ulCont.find('li').css({height:'70px',width:'70px'}).removeClass('hover').addClass('hover');
			that.ArrLi(that.ulCont.elements);
		});
		LS.$(this.icon_but_li.elements[1]).click(function(){
			that.icon_but_li.removeClass('active');
			LS.$(this).addClass('active');
			that.iNum1 = 140;
			that.iNum2 = 117;

			that.ulCont.find('li').css({height:'88px',width:'88px'}).removeClass('hover');
			that.ArrLi(that.ulCont.elements);
		});
		LS.$(this.icon_but_li.elements[2]).click(function(){
			that.icon_but_li.removeClass('active');
			LS.$(this).addClass('active');
			that.iNum1 = 171;
			that.iNum2 = 147;
			that.ulCont.find('li').css({height:'126px',width:'128px'}).removeClass('hover').addClass('hover');
			that.ArrLi(that.ulCont.elements);
		});
		LS.$(this.client_but_li.elements[0]).click(function(){
			that.client_but_li.removeClass('active');
			LS.$(this).addClass('active');
			that.ArrLi(that.ulCont.elements,2);
		});
		LS.$(this.client_but_li.elements[1]).click(function(){
			that.client_but_li.removeClass('active');
			LS.$(this).addClass('active');
			that.ArrLi(that.ulCont.elements,1);
		});
		LS.$(this.client_but_li.elements[2]).click(function(){
			that.client_but_li.removeClass('active');
			LS.$(this).addClass('active');
			that.ArrLi(that.ulCont.elements,3);
		});
		this.ulMenu.click(function(ev){
				var iCurIndex =  LS.$(this).index();
				that.ulMenu.removeClass('active');
				LS.$(this).addClass('active');
				if(iCurIndex>that.iNow){
					that.ulCont.elements[iCurIndex].style.left=-that.iWidth+'px';
					LS.$(that.ulCont.elements[that.iNow]).startMove({left:that.iWidth,opacity:0});
				}else if(iCurIndex<that.iNow){
					that.ulCont.elements[iCurIndex].style.left=that.iWidth+'px';
					LS.$(that.ulCont.elements[that.iNow]).startMove({left:-that.iWidth,opacity:0});
				}
					LS.$(that.ulCont.elements[iCurIndex]).startMove({left:0,opacity:100});
					that.iNow = iCurIndex;
		})

	},
	_setOptions : function(options){
		this.options = {
			ulCont : '',
			ulMenu:'',
			client_but: '',
			icon_but :''
		
		};
		return LS.$B.object.extend(this.options,options || {});
	},
	show : function(oParent){
		var that = this,
			 arr = [],
			 iNum1=this.iNum1,
			 iNum2=this.iNum2,
			 aLi=LS.$(oParent).find('li');
		function clientXt(){
			var vH = LS.$B.dom.vieH(),
				  vW = LS.$B.dom.vieW();
			if(that.flag == 1){
				var iCellCount = Math.floor(vH / iNum1);
				for(var i=0;i<aLi.elements.length;i++){
					LS.$(aLi.elements[i]).startMove({top:iNum2 * (i%iCellCount),left:iNum2 * Math.floor(i/iCellCount)});
					aLi.elements[i].index = i;
					arr.push( [ iNum2*(i%iCellCount),iNum2 * Math.floor(i/iCellCount) ] );
					that.drag(aLi.elements[i],arr,aLi);
				}
			}else if(that.flag == 2){
				var iCellCount = Math.floor(500 / 140);
				for(var i=0;i<aLi.elements.length;i++){
					LS.$(aLi.elements[i]).startMove({top:iNum2 * Math.floor(i/iCellCount),left:iNum2* (i%iCellCount)})
					arr.push( [iNum2 * Math.floor(i/iCellCount),iNum2 * (i%iCellCount) ] );	
					aLi.elements[i].index = i;
					that.drag(aLi.elements[i],arr,aLi);
				}
			}else{
				//var iCellCount = Math.floor(500 / 140);
				for(var i=0;i<aLi.elements.length;i++){
					//LS.$(aLi.elements[i]).startMove({top:iNum2 * Math.floor(i/iCellCount),left:iNum2* (i%iCellCount)})
					//arr.push( [iNum2 * Math.floor(i/iCellCount),iNum2 * (i%iCellCount) ] );	
					//aLi.elements[i].index = i;
					that.drag(aLi.elements[i],arr,aLi,true);
				}
			}
		}
		clientXt(this.flag);//加载自动排列
	},
	slideUl : function(obj,iWidth){
		LS.$(obj).css('left',iWidth);
	},
	ArrLi : function(aLi,flag){
		if(flag){
			if(this.flag != flag){this.flag = flag};//改变排列标志
		};
		for(var i = 0; i< aLi.length;i++){
			this.show(aLi[i]);
			if(i ==this.iNow){
				continue;
			}else{
				this.slideUl(aLi[i],'-1500px');
			}
		}
	},
	drag : function(oDiv,arr,aLi,auto){
			var that = this;
			oDiv.onmousedown=function (ev){
				var oEvent=ev||event,
					 disX=oEvent.clientX-oDiv.offsetLeft,
					 disY=oEvent.clientY-oDiv.offsetTop,
					 iX=oEvent.clientX,
					 iY=oEvent.clientY;
					oDiv.style.zIndex = that.zIndex++;
					oDiv.setAttribute('acc','false');
				if(oDiv.setCapture){
					oDiv.onmousemove=fnMove;
					oDiv.onmouseup=fnUp;
					oDiv.setCapture();
				}else{
					document.onmousemove=fnMove;
					document.onmouseup=fnUp;
				};
				function fnMove(ev){
					var oEvent=ev||event,
						   L = oEvent.clientX-disX,
						   T = oEvent.clientY-disY;
					if(Math.abs(oEvent.clientX-iX)>5||Math.abs(oEvent.clientY-iY)>5){
						oDiv.setAttribute('acc','true');
					}
					var oNear=that.findNearest(oDiv,aLi);
					if(oNear){
						//oNear.className='active';
					}
					window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
					oDiv.style.left=L+'px';
					oDiv.style.top=T+'px';
					return false;
					};
				function fnUp(){
					var oNear=that.findNearest(oDiv,aLi);
					this.onmousemove=null;
					this.onmouseup=null;
					if(auto){

					}else{
						if(oNear){
							oNear.style.zIndex=that.zIndex++;
							oDiv.style.zIndex=that.zIndex++;
							LS.$(oNear).startMove({top:arr[oDiv.index][0],left:arr[oDiv.index][1]});
							LS.$(oDiv).startMove({top:arr[oNear.index][0],left:arr[oNear.index][1]});
							var tmp=0;
							tmp=oDiv.index;
							oDiv.index=oNear.index;
							oNear.index=tmp;
						}else{
							LS.$(oDiv).startMove({top:arr[oDiv.index][0],left:arr[oDiv.index][1]});
						}

					}
	
					if(this.releaseCapture){
						this.releaseCapture();
					};
				return false;
				};
				
				return false;
			};
	},
	findNearest : function(obj,aLi){
		var iMin=999999999,
			  iMinIndex = -1;
		for(i=0;i<aLi.elements.length;i++){
			if(obj==aLi.elements[i])continue;

			if(this.cdTest(obj,aLi.elements[i])){
				var dis=this.getDis(obj, aLi.elements[i]);
				if(iMin>dis){
					iMin=dis;
					iMinIndex=i;
				}
			}
		}
		if(iMinIndex==-1){
			return null;
		}else{
			return aLi.elements[iMinIndex];
		}
	},
	getDis : function(obj1, obj2){
		var a=obj1.offsetLeft-obj2.offsetLeft;
		var b=obj1.offsetTop-obj2.offsetTop;
		return Math.sqrt(a*a+b*b);
	},
	cdTest : function(obj1, obj2){
		var l1=obj1.offsetLeft;
		var r1=obj1.offsetLeft+obj1.offsetWidth;
		var t1=obj1.offsetTop;
		var b1=obj1.offsetTop+obj1.offsetHeight;
		
		var l2=obj2.offsetLeft;
		var r2=obj2.offsetLeft+obj2.offsetWidth;
		var t2=obj2.offsetTop;
		var b2=obj2.offsetTop+obj2.offsetHeight;
		
		if(r1<l2 || l1>r2 || b1<t2 || t1>b2){
			return false;
		}else{
			return true;
		}
	}

}
var Clock = Class.create();
Clock.prototype = {
	_initialize:function(options){
		var time,nHour,nMinutes,nSeconds,srotate,mrotate,hrotate,sdegree,mdegree,hdegree,
			  iYear,iMonth,iDay,iWeek,that = this;
		this._setOptions(options);
		this.clock_close = LS.$(this.options.close);
		this.oBox = LS.$(this.options.oBox);
		this.oClock = LS.$(this.options.oClock);
		this.hour = LS.$(this.options.hour).elements[0];
		this.minutes = LS.$(this.options.min).elements[0];
		this.seconds = LS.$(this.options.sec).elements[0];
		this.dial = LS.$(this.options.dial);
		this.toDial(this.dial);
		if(LS.$B.client.browser.ie&&LS.$B.client.browser.ver<9){
			this.oClock.css({paddingTop:"43px",paddingLeft:0});
			this.oBox.css('lineHeight','25px');
			that.ieClock(that);
			that.oBox.css('opacity',0);
			that.oBox.show();
			that.oBox.startMove({opacity:100});
			setInterval(function(){
				that.ieClock(that);
			},1000);
		}else{
			that.auto(that);
			that.oBox.css('opacity',0);
			that.oBox.show();
			that.oBox.startMove({opacity:100});
			setInterval(function(){
				that.auto(that);
			},1000);
		}
	},
	_setOptions : function(options){
		this.options = {
			hour : '#hour',
			min : '#min',
			sec : '#sec',
			dial : '#dial',
			close:'#clock_close',
			oBox : '#web_titles',
			oClock : '#title_box'
		};
		return LS.$B.object.extend(this.options,options || {});
	},
	toDial : function(obj){
		var sHtml="",
		      iDeg=30;
		for(var i=0;i<12;i++){
			sHtml+="<span style='-webkit-transform:rotate("+iDeg*i+"deg);-moz-transform:rotate("+iDeg*i+"deg);-ms-transform:rotate("+iDeg*i+"deg);'></span>"
		}
		obj.html(sHtml);
	},
	auto: function(that){
			time = new Date();
			nHour = time.getHours();
			nMinutes = time.getMinutes();
			nSeconds = time.getSeconds();
			//每格表示的度数为360/60=6度
			sdegree = nSeconds * 6;
			mdegree = nMinutes * 6;
			//时针的度数应该为当前时间的小时数+与分针对应的小时度数
			//(nHour%12) * 30 == (nHour%12) * (360/12)
			//nMinutes/2 == (nMinutes/60)*5*6 这里的(nMinutes/60)*5表示的是与分针对应的小时刻度，然后每格的度数6
			hdegree = (nHour%12) * 30 + Math.floor(nMinutes/2);
			srotate = 'rotate(' + sdegree + 'deg)';
			mrotate = 'rotate(' + mdegree + 'deg)';
			hrotate = 'rotate(' + hdegree + 'deg)';
			that.seconds.style.cssText = '-moz-transform:'+ srotate + '; -webkit-transform:' + srotate + ' ;-ms-transform:'+srotate;
			that.minutes.style.cssText = '-moz-transform:'+ mrotate + '; -webkit-transform:' + mrotate+ ' ;-ms-transform:'+mrotate;
			that.hour.style.cssText = '-moz-transform:'+ hrotate + '; -webkit-transform:' + hrotate+ ' ;-ms-transform:'+hrotate;
	},
	ieClock : function(that){
			var arr=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
			 time=new Date();	
			 iYear=time.getFullYear();
			 iMonth=time.getMonth()+1;	
			 iDay=time.getDate();		
			 iWeek=time.getDay();	
			 nHour=time.getHours();
			 nMinutes=time.getMinutes();	
			 nSeconds=time.getSeconds();
		that.oClock.html(that.getD(nHour)+':'+that.getD(nMinutes)+':'+that.getD(nSeconds)+'<br/>'+arr[iWeek]+'<br/>'+iYear+'/'+iMonth+'/'+iDay);
	},
	getD: function (itime){
		if(itime<10){
			return '0'+itime;
		}
			return ''+itime;
		}
}

var SelectCity =Class.create();
SelectCity.prototype ={
	_initialize : function(box,options){
		var that = this,i=0;
		this.box = LS.$(box);
		this._setOptions(options);
		this.text = this.options.text.split("，");
		this.area = this.options.area;
		this.flag = true;
		this.id = this.box.attr('id');
		this.val = '';
		this.weather = LS.$(this.options.weather);
		this.url ='./getWeather.php';
		this.selectCity = LS.$(this.options.selectCity);
		this.submit = LS.$(this.options.submit);
		this.cancel = LS.$(this.options.cancel);
		this.oTime = LS.$(this.options.weather_time);
		this.oClose = LS.$(this.options.weatherc_close);
		this.weather_s = LS.$(this.options.weather_s);
		this.weather_t = LS.$(this.options.weather_t);
		this.oWeather = {};
		this.weather.hover(function(){that.oClose.show()},function(){that.oClose.hide()});
		this.oClose.click(function(){that.weather.hide()});
		for(i =0;i < this.text.length;i++){
			this.creatSelect(this.box.elements[0],this.text[i],i);
		};
		this.initSelect(0,this.box.find('select').elements[0],this.text [0]);
		for(var i=1; i<this.text.length;i++){
			LS.$("#"+this.id+"_"+i).elements[0].disabled = true;
		}
		for (var i=0;i<this.text.length;i++) {
			(function(){
				var num = (parseInt(i)+1);
				var idc = "#"+that.id+"_"+i;       
				var idTwo = "#"+that.id+"_"+(parseInt(i)+1);
				LS.$(idc).bind('change',function(){
					if(LS.$(this).elements[0].value == "" && LS.$(this).attr('index')!="0"){
						var iNum = "#"+that.id+"_"+ (LS.$(this).attr('index')-1);
						that.val  = this.options[this.selectedIndex].text;
					}else{
						if(LS.$(this).attr('index') ==0 &&LS.$(this).elements[0].value == ""){
						  that.val  = '';
						}else{
							that.val  = this.options[this.selectedIndex].text;
						}
					}
					if(num < that.text.length){
						that.initSelect(LS.$(idc).elements[0].value,LS.$(idTwo).elements[0],that.text[num],num);
					
					}
					
				})

			})(i)
		}
		this.selectCity.click(function(){
			that.showHide()
		});
		this.cancel.click(function(){
			that.showHide()
		});
		this.submit.click(function(){
			var city = 'city',
			      url = LS.$B.ajax.addUrlParam(that.url,city,that.val.replace('市',''));
			that.selectCity.html(that.val)
			LS.$B.ajax.get(url,that.getWeather,that);
			that.showHide()
		});
		this.getTime();
		that.weather.css('opacity',0);
		that.weather.show();
		that.weather.startMove({opacity:100});

	},
	_setOptions : function(options){
		this.options = {
			area : area,
			text:"请选省，请选市",
			selectCity :'#region_but',
			weather : '#weather',
			submit : '#submit',
			cancel : '#cancel',
			weather_time:'#weather_time',
			weatherc_close:'#weatherc_close',
			weather_s : '#weather_s',
			weather_t : '#weather_t'
			
		};
		return LS.$B.object.extend(this.options,options || {});
	},
	creatSelect : function(obj,oText,i){
		var eSelect = document.createElement('select'),
			  options = document.createElement('option'),
			  oText=document.createTextNode(oText);
		      eSelect.id = this.id +'_'+ i;
		      eSelect.setAttribute('index',i) ;
			  options.appendChild(oText);
			  eSelect.appendChild(options);
			  obj.appendChild(eSelect);
	},
	creatOption : function (obj,oText){
		var options = document.createElement('option'),
			  firstE = obj.firstChild,
			  oText=document.createTextNode(oText);
			  options.appendChild(oText);
			  obj.appendChild(options);
	},
	initSelect : function(areaid,select,name,D){
		
		var options =  "<option value='' >"+name+"</option>",
			  select = LS.$(select),
			  d =true;
		select.find('option').remove();
		
		if(this.area[areaid]){
			var msg=this.area[areaid]    

			for (var i=0;i<msg.length;i++) {
				options +=  "<option value="+msg[i][1]+">"+msg[i][0]+"</option>"
			}
			d=false;
		}
		 select.html(options);
		 if(D){
			 //alert(D);
			LS.$("#"+this.id+"_"+D).elements[0].disabled = d;
		 }
	},
	getWeather : function(sJson){
		this.oWeather = eval("(" + sJson + ")");
		this.oWeather = this.oWeather.weatherinfo;
		if(this.oWeather ){
			var str1 = '<img src="http://www.weather.com.cn/m2/i/icon_weather/29x20/'+this.oWeather.img1 + '"/>';
			var str2 = '<strong>今天：</strong>'+this.oWeather.weather+this.oWeather.temp1+'~'+this.oWeather.temp2;
		}
		this.weather_s.html(str1);
		this.weather_t.html(str2);
	},
	getTime : function(){
			var oDate=new Date();			
			var iYear=oDate.getFullYear();		
			var iMonth=oDate.getMonth()+1;	
			var iDay=oDate.getDate();			
			var iWeek=oDate.getDay();		
			var iHour=oDate.getHours();		
			var iMin=oDate.getMinutes();		
			var iSec=oDate.getSeconds();
			this.oTime.html('时间：'+iYear+'年'+iMonth+'月'+iDay+'日'+getD(iHour)+':'+getD(iMin));
			function getD(itime){
				if(itime<10)
				{
					return '0'+itime;
				}
				return ''+itime;
			}
	},
	showWeather : function(str){
		this.weather_s.html(str);
	},
	showHide : function(){
		if(this.flag){
			this.weather.removeClass('weather').addClass('weather_bg');
			this.flag = !this.flag;
		}else{
			this.weather.removeClass('weather_bg').addClass('weather');
			this.flag = !this.flag;
		}
	}
}
var ajax =Class.create();
ajax.prototype = {
	_initialize : function(box,options){
		var that = this;
		this._setOptions(options);
		this.flag = true;
		this.box = LS.$(box);
		this.error = LS.$(this.options.error);
		this.s_box = LS.$(this.options.s_box);
		this.getImg = LS.$(this.options.getImg);
		this.url = this.options.url;
		this.Form = LS.$(this.options.Form).elements[0];
		this.unPaste();
		this.box.click(function(){
			that.check();
			if(that.flag){
				that.box.elements[0].disabled = true;
				LS.$B.ajax.post(that.Form,that.url,that.fnSucc,that);
			}
		});
		LS.$E.myAddEvent(this.Form,'keyup',function(ev){
			var ev = LS.$E.getEvent(ev);
			if(13 == ev.keyCode){
				that.check();
				if(that.flag){
					that.box.elements[0].disabled = true;
					LS.$B.ajax.post(that.Form,that.url,that.fnSucc,that);
				}
			};
		});	




	},
	_setOptions : function(options){
		this.options= {
			Form : '',
			url : '',
			error:'',
			s_box:'',
			getImg:''
		}
		return LS.$B.object.extend(this.options,options || {});
	},
	check : function(){
		var field,msg,flag = false;
		for (var i=0;i<this.Form.length;i++){
			field = this.Form.elements[i];
			switch(field.name) {
				case 'U_loginID':
					if(field.value.length < 4 || field.value.length>16 || !/^\d*$/.test(field.value)){
						msg = '帐号为4-16位数字';
						this.error.show().html(msg);
						field.value = '';
						field.focus();
						flag = true;
					}
					break;
				case 'reg_button':
					break;
				default :
					if(field.value == ''){
						msg = '请把表单填写完整';
						this.error.show().html(msg);
						flag = true;
						field.focus();		
					}	
			}
			if(flag){
				this.flag = false;
				return;
			};	
		}

		this.flag = true;
	},
	fnSucc : function(sJson){
		for (var i=0;i<this.Form.length;i++){
			this.Form.elements[i].value = '';
		}
		this.flag = false;
		this.box.elements[0].disabled = false;
		if(sJson.length<20){
			if(sJson == '1'){
				alert('注册成功，试一试登陆吧');
				LS.$('#re_ui_boxy').hide();
				LS.$('#ui_boxy').show();
			}else{
				this.error.show().html(sJson)
				this.getImg.attr('src', 'getVerifyCode.php?t='+Math.random()*10000);//获取验证码
			}

		}else{
			LS.$('#Q_person').html(sJson)
			LS.$B.dom.scriptLink('js/loggin_qq.js');
			this.error.hide().html('')
			this.s_box.hide();
		}
		
	},
	unPaste : function (){
		for (var i=0;i<this.Form.length;i++){
			LS.$E.myAddEvent(this.Form.elements[i],'paste',function(e){
				var e = LS.$E.getEvent(e);
				LS.$E.preventDefault(e);
			})
		}
	}
}
var FileUpload = Class.create();
FileUpload.prototype = {
  _initialize: function(form, folder, options) {
	
	this.Form = LS.$(form).elements[0];//表单
	this.Folder = LS.$(folder).elements[0];//文件控件存放空间
	this.Files = [];//文件集合
	
	this._setOptions(options);
	
	this.FileName = this.options.FileName;
	this._FrameName = this.options.FrameName;
	this.Limit = this.options.Limit;
	this.Distinct = !!this.options.Distinct;
	this.ExtIn = this.options.ExtIn;
	this.ExtOut = this.options.ExtOut;
	
	this.onIniFile = this.options.onIniFile;
	this.onEmpty = this.options.onEmpty;
	this.onNotExtIn = this.options.onNotExtIn;
	this.onExtOut = this.options.onExtOut;
	this.onLimite = this.options.onLimite;
	this.onSame = this.options.onSame;
	this.onFail = this.options.onFail;
	this.onIni = this.options.onIni;
	
	if(!this._FrameName){
		this._FrameName = "uploadFrame_" + Math.floor(Math.random() * 1000);
		var oFrame =(LS.$B.client.browser.ie&&LS.$B.client.browser.ver<8) ? document.createElement("<iframe name=\"" + this._FrameName + "\">") : document.createElement("iframe");
		oFrame.name = this._FrameName;
		oFrame.style.display = "none";
		document.body.insertBefore(oFrame, document.body.childNodes[0]);//存在兼容未加载完成IEdocument.body不存在
	}
	this.Form.target = this._FrameName;
	this.Form.method = "post";
	//注意ie的form没有enctype属性，要用encoding
	this.Form.encoding = "multipart/form-data";
	this.Ini();
  },
  _setOptions: function(options) {
    this.options = {//默认值
		FileName:	"Files[]",
		FrameName:	"",
		onEmpty:	function(){ alert("请选择一个文件"); },
		Limit:		10,
		onLimite:	 function(){ alert("超过上传限制"); },
		Distinct:	true,//是否不允许相同文件
		onSame:	 function(){ alert("已经有相同文件"); },//有相同文件时执行
		ExtIn:		["gif","jpg","rar","zip","iso","swf","exe"],//允许后缀名
		onNotExtIn:	function(){ alert("只允许上传" + this.ExtIn.join("，") + "文件"); },//不是允许后缀名时执行
		ExtOut:		[],//禁止后缀名
		onExtOut:	function(){},//是禁止后缀名时执行
		onFail:		function(file){ this.Folder.removeChild(file); },//文件不通过检测时执行(其中参数是file对象)
		onIni: function(){ //重置时执行
				//显示文件列表
				var arrRows = [];
				if(this.Files.length){
					var that = this;
					LS.$B.fn.each(this.Files, function(o){
						var a = document.createElement("a"); 
						a.innerHTML = "取消";
						a.href = "javascript:void(0);";
						a.onclick = function(){ that.Delete(o); return false; };
						arrRows.push([o.value, a]);
					});
				} else { arrRows.push(["<font color='gray'>没有添加文件</font>", "&nbsp;"]); }
				this.AddList(arrRows);
				//设置按钮
				LS.$("#idBtnupload").elements[0].disabled = LS.$("#idBtndel").elements[0].disabled = this.Files.length <= 0;
		}
    };
		return LS.$B.object.extend(this.options,options || {});
  },
  Ini: function() {
	this.Files = [];
	LS.$B.fn.each(this.Folder.getElementsByTagName("input"),  LS.$B.fn.bind(this, function(o){
		if(o.type == "file"){ 
			o.value && this.Files.push(o);
			o.value ? o.style.display = "none" : this.Folder.removeChild(o); 
		}
	}))
	var file = document.createElement("input");
	file.name = this.FileName;
	file.type = "file";
	file.onchange =  LS.$B.fn.bind(this, function(){ 
								this.Check(file); 
								this.Ini();
							});
	this.Folder.appendChild(file);
	this.onIni();
  },
  Check: function(file) {
	var bCheck = true;
	if(!file.value){
		bCheck = false; this.onEmpty();
	} else if(this.Limit && this.Files.length >= this.Limit){
		bCheck = false; this.onLimite();
	} else if(!!this.ExtIn.length && !RegExp("\.(" + this.ExtIn.join("|") + ")$", "i").test(file.value)){
		bCheck = false; this.onNotExtIn();
	} else if(!!this.ExtOut.length && RegExp("\.(" + this.ExtOut.join("|") + ")$", "i").test(file.value)) {
		bCheck = false; this.onExtOut();
	} else if(!!this.Distinct) {
		LS.$B.fn.each(this.Files, function(o){ if(o.value == file.value){ bCheck = false; } })
		if(!bCheck){ this.onSame(); }
	}
	!bCheck && this.onFail(file);
  },
  Delete: function(file) {
	this.Folder.removeChild(file); this.Ini();
  },
  AddList : function(rows){
	var FileList = LS.$("#idFileList").elements[0], oFragment = document.createDocumentFragment();
		LS.$B.fn.each(rows,function(cells){
			var row = document.createElement("tr");
			LS.$B.fn.each(cells,function(o){
				var cell = document.createElement("td");
				if(typeof o == "string"){ cell.innerHTML = o; }else{ cell.appendChild(o); }
				row.appendChild(cell);
			})
			oFragment.appendChild(row);
		})
		//ie的table不支持innerHTML所以这样清空table
		while(FileList.hasChildNodes()){ FileList.removeChild(FileList.firstChild); }
		FileList.appendChild(oFragment);
  },
  Clear: function() {
	LS.$B.fn.each(this.Files,   LS.$B.fn.bind(this, function(o){ this.Folder.removeChild(o); })); this.Ini();
  }
}
typeof progress=="function"&&progress("createObject e");






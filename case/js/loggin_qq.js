(function(){
Q_person =new AlertQboxTwo('#Q_person',{oDrag:'#Q_person_drag',boxBtn :'#Q_person_close'});
Q_window_cz =new AlertQbox('#window_cz',{oDrag:'#window_titleBar_cz',boxBtn :'#window_close_cz'});

var  K=1,ARR = [],mesObj,zIndex = 100;
LS.$('#Q_person_min').click(function(){
	LS.$('#bottomBar').show();
	Q_person.hide();
})
Q_person.show();
LS.$('#bottomBar').click(function(){
	Q_person.show();
	LS.$('#bottomBar').hide();
});
LS.$('#Q_person').find('.eqq_BuddyList_Buddy').click(function(){
	if(this.getAttribute('acc')){
		var z = this.getAttribute('acc'),
					sLeft = Math.ceil(10*z) ,
			        sTop = Math.ceil(10*z),
					k = zIndex++;
		ARR[z].show(sLeft,sTop,k);
	}else{
			var tId = this.getAttribute('id'),
				 sName = LS.$(this).find('.eqq_BuddyList_RightContainer').attr('title'),
				 sSrc = LS.$(this).find('img').attr('src'),
				 tld_1 = tId +'_' + K,
				 drg = 'drgBar' +K,
				 iClose = 'iClose' +K,
				 iCloseMin = 'iCloseMin' +K,
				 send =  'send' +K,
				 rich_editor_div = 'rich_editor_div' +K,
				 mesBox = 'mesBox' + K,
				mesBoxCont =  'mesBoxCont' + K;
				 str ='	<div  class="eqq_window  window_mess_outer"><div  class="window_inner"><div  class="window_bg_container" style="background: url(images/bg.png) repeat-x scroll 0% 0% rgb(244, 249, 252);">	</div><div class="window_content"><div  class="window_titleBar" style="height: 83px;" id="'+drg+'"><div  class="window_titleButtonBar"><a  class="  window_close" title="关闭"  href="javascript:void(0);"  style="display: block;" id="'+iClose+'"></a><a  class="  window_max" title="最大化"  href="javascript:void(0);" style="display: none;"></a><a  class="  window_restore" title="还原"  href="javascript:void(0);"  style="display: none;"></a><a  class="  window_min" title="最小化"  href="javascript:void(0);" style="display: none;"></a></div><div class="window_title titleText" style="height: 83px;"><div class="awayBuddyInChatbox" title="离开"><img src="'+sSrc+'" class="avatarInChatbox"><div class="stateInChatbox"></div></div><div class="chatBox_nameArea"><a href="javascript:void(0);" title="'+sName +'"  class="titleText">  <span  >'+sName +'</span>      </a></div></div></div><div class="window_bodyOuter"><div  class="window_bodyArea"><div  class="chatBox_mainArea"><div  class="chatBox_chatBoard" id="'+mesBoxCont+'"><div class="chatBox_msgList" id="'+mesBox+'"></div></div><div  class="chatBox_toolBar"></div><div class="chatBox_inputBox"><div class="rich_editor"><div contenteditable="true" class="rich_editor_div" id="'+rich_editor_div+'" style="display: block;"><br></div><textarea class="rich_editor_text" _olddisplay="block" style="display: none;"></textarea></div></div><div class="chatBox_controlPanel"> <a title="修改发送快捷键" class="chatBox_sendOptionButton" href="javascript:void(0);"></a><a title="发送" class="chatBox_sendMsgButton" id="'+send+'" href="javascript:void(0);">发&#12288;送</a>  <a title="关闭" id="'+iCloseMin+'" class="chatBox_closeButton"  href="javascript:void(0);">关&#12288;闭</a></div></div></div></div></div></div></div>';
			 LS.$B.dom.createDiv(str,'window_mess',tld_1);

			ARR[K]=new AlertQbox('#'+tld_1,{oDrag:'#'+drg,boxBtn :'#'+iClose});
			ARR[K].show();
			(function(K){
				function hided(){
					ARR[K].hide();
				}
			LS.$('#'+iCloseMin).click(hided)
			})(K)
			LS.$('#'+send).click(function(){sendMes()});

			LS.$('#'+rich_editor_div).bind('keypress',function(e){
				var e = LS.$E.getEvent(e);
				if(e.ctrlKey&&0 == LS.$E.getCharCode(e)){
					sendMes();
				};
			});
			function sendMes(){
				var toUserId =tId.replace('lxr',''),
					 sText =  LS.$('#'+rich_editor_div).html(),
					 url = 'messages_ok.php',
					 sTitle = LS.$('#eqq_myNick').html(),
					 oDate=new Date(),			
					 iYear=oDate.getFullYear(),	
					 iMonth=oDate.getMonth()+1,	
					 iDay=oDate.getDate(),			
					 iHour=oDate.getHours(),		
					 iMin=oDate.getMinutes(),		
					 iSec=oDate.getSeconds(),
					 sTime ='&#12288;'+ iYear+'-'+getD(iMonth)+'-'+getD(iDay)+'&nbsp;'+getD(iHour)+':'+getD(iMin)+':'+getD(iSec),
					 jsons ={},
					 str = '<dt class="msgHead" title="'+sTitle+'">'+sTitle+'<span style="margin-left:5px">'+sTime+'</span></dt><dd class="msgBody defaultFontStyle" style="">'+sText+'</dd>';
				LS.$('#'+rich_editor_div).html('');
				LS.$B.dom.createMsg(str,'chatBox_myMsg',mesBox);	
				document.getElementById(mesBox).scrollTop = document.getElementById(mesBox).scrollHeight -112;
				jsons['M_postMessages'] =sText;
				jsons['M_touserid'] = toUserId;
				function fnSucc(s){
					//alert(s);
				}
				LS.$B.ajax.postJson("jsonStr="+JSON.stringify(jsons),url,fnSucc);
				function getD(itime){
					if(itime<10)
					{
						return '0'+itime;
					}
					return ''+itime;
				}
			}
			this.setAttribute('acc',K);		
			K++;
	}
});

LS.$('#web_top').find('img').attr('src',LS.$('#eqq_myAvatar').attr('src'));
LS.$B.ajax.get('getMessages.php',getMesFn);
Q_person.timer = setInterval(function(){
	LS.$B.ajax.get('getMessages.php',getMesFn);
},5000);
function getMesFn(str){

	if(str.length>20){
		mesObj =JSON.parse(decodeURIComponent(str));
		for(var i = 0; i<mesObj.length;i++){
			var j = mesObj[i]['M_fromuserid'],
			      bs = '#lxr'+ j ,
				  oEle =  LS.$('#taskCurrent'),
				  sTitle = mesObj[i]['U_nickname'],
				  sTime =  mesObj[i]['M_times'].replace('+','&nbsp;'),
				  sText =  mesObj[i]['M_postMessages'],
				  str1 = '<dt class="msgHead" title="'+sTitle+'">'+sTitle+'<span style="margin-left:5px">'+sTime+'</span></dt><dd class="msgBody defaultFontStyle" style="">'+sText+'</dd>';				 
					function createMessage(){
							var    sName = LS.$(bs).find('.eqq_BuddyList_RightContainer').attr('title'),
									 sSrc = LS.$(bs).find('img').attr('src'),
									 tld_1 = bs +'_' + K,
									 drg = 'drgBar' +K,
									 iClose = 'iClose' +K,
									 iCloseMin = 'iCloseMin' +K,
									 send =  'send' +K,
									 rich_editor_div = 'rich_editor_div' +K,
									 mesBox = 'mesBox' + K,
									mesBoxCont =  'mesBoxCont' + K;
									 str ='	<div  class="eqq_window  window_mess_outer"><div  class="window_inner"><div  class="window_bg_container" style="background: url(images/bg.png) repeat-x scroll 0% 0% rgb(244, 249, 252);">	</div><div class="window_content"><div  class="window_titleBar" style="height: 83px;" id="'+drg+'"><div  class="window_titleButtonBar"><a  class="  window_close" title="关闭"  href="javascript:void(0);"  style="display: block;" id="'+iClose+'"></a><a  class="  window_max" title="最大化"  href="javascript:void(0);" style="display: none;"></a><a  class="  window_restore" title="还原"  href="javascript:void(0);"  style="display: none;"></a><a  class="  window_min" title="最小化"  href="javascript:void(0);" style="display: none;"></a></div><div class="window_title titleText" style="height: 83px;"><div class="awayBuddyInChatbox" title="离开"><img src="'+sSrc+'" class="avatarInChatbox"><div class="stateInChatbox"></div></div><div class="chatBox_nameArea"><a href="javascript:void(0);" title="'+sName +'"  class="titleText">  <span  >'+sName +'</span>      </a></div></div></div><div class="window_bodyOuter"><div  class="window_bodyArea"><div  class="chatBox_mainArea"><div  class="chatBox_chatBoard" id="'+mesBoxCont+'"><div class="chatBox_msgList" id="'+mesBox+'"></div></div><div  class="chatBox_toolBar"></div><div class="chatBox_inputBox"><div class="rich_editor"><div contenteditable="true" class="rich_editor_div" id="'+rich_editor_div+'" style="display: block;"><br></div><textarea class="rich_editor_text" _olddisplay="block" style="display: none;"></textarea></div></div><div class="chatBox_controlPanel"> <a title="修改发送快捷键" class="chatBox_sendOptionButton" href="javascript:void(0);"></a><a title="发送" class="chatBox_sendMsgButton" id="'+send+'" href="javascript:void(0);">发&#12288;送</a>  <a title="关闭" id="'+iCloseMin+'" class="chatBox_closeButton"  href="javascript:void(0);">关&#12288;闭</a></div></div></div></div></div></div></div>';
								 LS.$B.dom.createDiv(str,'window_mess',tld_1);
								ARR[K]=new AlertQbox('#'+tld_1,{oDrag:'#'+drg,boxBtn :'#'+iClose});
								(function(K){
									function hided(){
										ARR[K].hide();
									}
								LS.$('#'+iCloseMin).click(hided);
								})(K)
								LS.$('#'+send).click(function(){
									var toUserId =j,
										 sText =  LS.$('#'+rich_editor_div).html(),
										 url = 'messages_ok.php',
										 sTitle = LS.$('#eqq_myNick').html(),
										 oDate=new Date(),			
										 iYear=oDate.getFullYear(),	
										 iMonth=oDate.getMonth()+1,	
										 iDay=oDate.getDate(),			
										 iHour=oDate.getHours(),		
										 iMin=oDate.getMinutes(),		
										 iSec=oDate.getSeconds(),
										 sTime ='&#12288;'+ iYear+'-'+getD(iMonth)+'-'+getD(iDay)+'&nbsp;'+getD(iHour)+':'+getD(iMin)+':'+getD(iSec),
										 jsons ={},
										 str = '<dt class="msgHead" title="'+sTitle+'">'+sTitle+'<span style="margin-left:5px">'+sTime+'</span></dt><dd class="msgBody defaultFontStyle" style="">'+sText+'</dd>';
								   
									LS.$B.dom.createMsg(str,'chatBox_myMsg',mesBox);	
									jsons['M_postMessages'] =sText;
									jsons['M_touserid'] = toUserId;
									function fnSucc(s){
										//alert(s);发送成功
									}
									LS.$B.ajax.postJson("jsonStr="+JSON.stringify(jsons),url,fnSucc);
									function getD(itime){
										if(itime<10)
										{
											return '0'+itime;
										}
										return ''+itime;
									}
								})
								LS.$B.dom.createMsg(str1,'chatBox_myMsg',mesBox);
								document.getElementById(mesBox).scrollTop = document.getElementById(mesBox).scrollHeight -112;
								LS.$(bs).attr('acc',K)	
								K++;
					
					}
				 if(LS.$(bs).attr('acc')){
					var pa = LS.$(bs).attr('acc'),
							   mesBox = 'mesBox' + pa;
							LS.$B.dom.createMsg(str1,'chatBox_myMsg',mesBox);	
							document.getElementById(mesBox).scrollTop = document.getElementById(mesBox).scrollHeight -112;
								
				 }else{
					createMessage()
				}
			flicker(bs);
			flickerBottom(bs,oEle)
			LS.$(bs).click(function(){
				clearInterval(this.timer);
				clearInterval(this.timerbottom);
				oEle.removeClass('taskJumpUp');
			})

		}
	}


}
function flicker(obj){
	var flag = true,
		  oDiv = LS.$(obj);
	oDiv.elements[0].timer && clearInterval(oDiv.elements[0].timer);
	oDiv.elements[0].timer = setInterval(function(){
		if(flag){
			oDiv.addClass('eqq_dump');
			flag =!flag;
		}else{
			oDiv.removeClass('eqq_dump');
			flag =!flag;
		}
	},300)
}
function flickerBottom(obj,oEle){
	var flag = true,
		  oDiv = LS.$(obj);
	oDiv.elements[0].timerbottom && clearInterval(oDiv.elements[0].timerbottom);
	oDiv.elements[0].timerbottom = setInterval(function(){
		if(flag){
			oEle.addClass('taskJumpUp');
			flag =!flag;
		}else{
			oEle.removeClass('taskJumpUp');
			flag =!flag;
		}
	},300)
}
LS.$('#seachFriend').click(function(){
	Q_window_cz.show();
});
LS.$('#window_cancel').click(function(){
	Q_window_cz.hide();
});
LS.$('#window_next').click(function(){
	var url = 'search_ok.php',
		  Form = LS.$('#searchFriend').elements[0];
	LS.$B.ajax.post(Form,url,findFriend);
});
function findFriend(str){
	if(str == '1'){
		alert('添加成功！Tips:如果不能发生消息试一试重新登陆！(此问题来源于innerHTML移除了事件，应采取appendChild解决)');
		var url = 'upFriend.php';
		LS.$B.ajax.get(url,upFriendFn);
	}else{
		alert(str);
	}
}
function upFriendFn(str){
	LS.$('#eqq_buddyListPanel').html(str);
}

})()

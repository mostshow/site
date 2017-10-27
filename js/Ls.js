
(function(){
	var pEl,sEl,stEl,pArr=[],isProressLog = 1,percent = 0,isOnload = false,Ready = null;
	window._SPEEDTIME_WINDOWSTART = (new Date());
	window.progress = function(msg,p){
		p = (typeof(p) === "undefined")?10:p;
		percent+=p;
		percent = percent>100?100 : percent;
		if(msg === "Ready"){
			clearTimeout(Ready);
			Ready = null;
		}
		if(isProressLog>-1){
			var n  = (new Date()) - window._SPEEDTIME_WINDOWSTART;
			var s = msg + "("+percent+"%"+"):" + n + "<br />";
			if(isOnload){
				pEl.innerHTML+=s;
			}else{
				pArr.push(s);
			}
		}
		if(isOnload){
			sEl.style.width = percent+"%";
			stEl.innerHTML = percent+"%";
			stEl.setAttribute("title",msg);
		}				
	}

	window.onload = function(){
		sEl = document.getElementById("startingBar");
		stEl = document.getElementById("startingTips");
		pEl = document.getElementById("progress");
		if(isProressLog>-1){
			pEl.innerHTML+=pArr.join("");
		}
		isOnload = true;
		progress("Ready");
		setTimeout(function(){document.getElementById("startingCover").style.display = 'none';},1000)
		
	};
	document.DOMContentLoad = function(){
		sEl = document.getElementById("startingBar");
		stEl = document.getElementById("startingTips");
		pEl = document.getElementById("progress");
		if(isProressLog>-1){
			pEl.innerHTML+=pArr.join("");
		}
		isOnload = true;
		progress("loading");
		document.getElementById("startingCover").style.display = 'none';
	};


	Ready = setTimeout(function(){timeoutConfirm();},50000);
	window.timeoutConfirm = function(msg){
		msg = msg||"系统长时间未响应，是否刷新重试？";
		clearTimeout(Ready);
		Ready = null;
		if(window.confirm(msg)){
			location.href=location.href;
			return true;
		}else{
			return false;
		}
	};
})()
typeof progress=="function"&&progress("LS s");

Function.prototype.method = function(name, fn) {
    this.prototype[name] = fn;
    return this;
};
var LS = LS || {},Q_person = null;
LS.namespace = function(str) {
	var parts = str.split("."),
	parent = LS,
	i = 0,
	l = 0;

	if (parts[0] === "LS") {
		parts = parts.slice(1);
	};
	for (i = 0, l = parts.length; i < l; i++) {
		if (typeof parent[parts[i]] === "undefined") {
			parent[parts[i]] = {};
		};
		parent = parent[parts[i]];
	};
	return parent;
};
LS.namespace('LS.$E');
LS.namespace('LS.$B');
(function() {
	var EventUtil,Basic,zzz = 1000;
	/*
		* EventUtil
	*/
	 EventUtil = { 
		myAddEvent: function(obj, sEv, fn){ 
			if (obj.attachEvent) {
				obj.attachEvent('on' + sEv,
				function(ev) {
					if (false == fn.call(obj,ev)) {
						event.cancelBubble = true;
						return false;
					};
				});
			} else {
				obj.addEventListener(sEv,
				function(ev) {
					if (false == fn.call(obj,ev)) {
						ev.cancelBubble = true;
						ev.preventDefault();
					};
				},
				false);
			};
		},
		removeEvent: function (obj, type, fn){ 
			if (obj.removeEventListener){ 
				obj.removeEventListener(type, fn, false); 
			} else if (obj.detachEvent){ 
				obj.detachEvent("on" + type, fn); 
			} else { 
				obj["on" + type] = null; 
			} ;
		},
		getButton: function(event){ 
			if (document.implementation.hasFeature("MouseEvents", "2.0")){ 
				return event.button; 
			} else { 
				switch(event.button){ 
					case 0: 
					case 1: 
					case 3: 
					case 5: 
					case 7: 
						return 0; 
					case 2: 
					case 6: 
						return 2; 
					case 4: return 1; 
				} ;
			} ;
		}, 
		getCharCode: function(event){ 
			if (typeof event.charCode == "number"){ 
				return event.charCode; 
			} else { 
				return event.keyCode; 
			} ;
		}, 
		getClipboardText: function(event){ 
			var clipboardData =  (event.clipboardData || window.clipboardData); 
			return clipboardData.getData("text"); 
		}, 
		setClipboardText: function(event, value){
			if (event.clipboardData){
				event.clipboardData.setData("text/plain", value);
			} else if (window.clipboardData){
				window.clipboardData.setData("text", value);
			}
		},
		getEvent: function(event){ 
			return event ? event : window.event; 
		}, 
		getRelatedTarget: function(event){ 
			if (event.relatedTarget){ 
				return event.relatedTarget; 
			} else if (event.toElement){ 
				return event.toElement; 
			} else if (event.fromElement){ 
				return event.fromElement; 
			} else { 
				return null; 
			} ;
		},  
		getTarget: function(event){ 
			return event.target || event.srcElement; 
		},  
		getWheelDelta: function(event){ 
			if (event.wheelDelta){ 
				return (Basic.client.engine.opera && Basic.client.engine.opera < 9.5 ? -event.wheelDelta : event.wheelDelta); 
			} else { 
				return -event.detail * 40; 
			} 
		},  
		preventDefault: function(event){ 
			if (event.preventDefault){ 
				event.preventDefault(); 
			} else { 
				event.returnValue = false; 
			} 
		}, 
		stopPropagation: function(event){ 
			if (event.stopPropagation){ 
				event.stopPropagation(); 
			} else { 
				event.cancelBubble = true; 
			} ;
		} ,
		unSelection : function(){
			window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
		}
	};
	/**
	* 作用：包括数组、字符串等等数功能扩展
	*
	*  Basic
	*/
	 Basic = {
		object:(function(){
			return{
				extend: function (destination, source, override) {//override 为false 时只添加destination里面没有的property
					if (override === undefined) override = true;
					for (var property in source) {
						if (override || !(property in destination)) {
							destination[property] = source[property];
						}
					}
					return destination;
				},
				deepextend : function (destination, source) {
					for (var property in source) {
						var copy = source[property];
						if ( destination === copy ) continue;
						if ( typeof copy === "object" ){
							destination[property] = arguments.callee( destination[property] || {}, copy );
						}else{
							destination[property] = copy;
						}
					}
					return destination;
				}
			};
		})(),
		fn:(function(){
			return {
				emptyFunction : function(){},
				classExtend : function (subClass, superClass) {
					  var F = function() {};
					  F.prototype = superClass.prototype;
					  subClass.prototype = new F();
					  subClass.prototype.constructor = subClass;
					 
					  subClass.superclass = superClass.prototype;//加多了个属性指向父类本身以便调用父类函数
					  if(superClass.prototype.constructor == Object.prototype.constructor) {
						superClass.prototype.constructor = superClass;
					  }
				},
				each: function(list, fun){
					for (var i = 0, len = list.length; i < len; i++) {
						fun(list[i], i); 
					}
				},
				bind : function(o,fn){
					return function(){
						return fn.apply(o, arguments);
					}
				}
 
			};
		})(),
		array:(function(){
			return {
				isArray: function(){
					return Object.prototype.toString.call(arguments[0])  === '[object Array]'; 
				},
				inArray: function(val,arr){
					for(var i=0,l=arr.length;i<l;i++){
						if(arr[i] === val){
							return true;
						};
					};
				},
				appendArr: function (arr1, arr2) {
					var i = 0;

					for (i = 0; i < arr2.length; i++) {
						arr1.push(arr2[i]);
					};
				}
			};
		})(),
		string:(function(){
			return {
				trim: function(){
					return arguments[0].replace(/(^\s*)|(\s*$)/g, "");
				},
				ltrim: function(){
					return arguments[0].replace(/^s+/g, "");
				},
				rtrim: function(){
					return arguments[0].replace(/s+$/g, "");
				}
			};
		})(),
		dom:(function(){
			return {
				getByClass: function(sClass, oParent) {
						var oParent = oParent || document,
						aEle = oParent.getElementsByTagName('*'),
						aResult = [],
						i,
						j;
						for (i = 0; i < aEle.length; i++) {
							var aChild = aEle[i],
							classNames = Basic.string.trim(aChild.className).split(' ');
							for (j = classNames.length - 1; j >= 0; j--) {
								if (classNames[j] == sClass) {
									aResult.push(aChild);
								};
							};
						};
						return aResult;
				},
				getIndex: function(obj){
					var aBrother = obj.parentNode.children;
					var i = 0;
					for (i = 0; i < aBrother.length; i++) {
						if (aBrother[i] == obj) {
							return i;
						};
					};
				},
				getStyle: function (obj, attr) {
					if (obj.currentStyle) {
						return obj.currentStyle[attr];
					} else {
						return getComputedStyle(obj, false)[attr];
					};
				},
				vieW: function(){
					return  document.documentElement.clientWidth;
				},
				vieH: function(){
					return  document.documentElement.clientHeight;
				},
				scrollY: function(){
					return document.body.scrollTop||document.documentElement.scrollTop;
				},
				scriptLink : function(url){
					var script = document.createElement("script"); 
					script.type = "text/javascript"; 
					script.id ='JSONP';
					script.src =url;
					document.body.appendChild(script);  
				},
				createMsg : function(str,className,parent){
					var str =str.replace(/\r\n/g,""),
					  element = document.createElement("dl");
					  element.className = className;   ;   
					  element.innerHTML =str;
					  document.getElementById(parent).appendChild(element); 

				},
				createDiv : function(str,className,tId){
					var str =str.replace(/\r\n/g,""),
					      element = document.createElement("div");
					  element.className = className;   
					  element.id = tId;   
					  element.innerHTML =str;
					  document.body.appendChild(element); 

				},
				loadScriptString : function(code){
					var script = document.createElement("script");  
					script.type = "text/javascript";  
					    try {  
							script.appendChild(document.createTextNode(code));  
						} catch (ex){  
							script.text = code;  
						}  
					document.body.appendChild(script); 
				}
				
				
			};
		})(),
		ui:(function(){
			return {
				drag : function(oDiv,dragDiv){
					oDiv.onmousedown=function (ev){
						var oEvent=ev||event,
							 oldIndex = oDiv.style.zIndex,
							 disX=oEvent.clientX-dragDiv.offsetLeft,
							 disY=oEvent.clientY-dragDiv.offsetTop;
						dragDiv.style.zIndex = zzz++;		
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
							EventUtil.unSelection();
							if(L<10){
								L = 0;
							};
							if(T<10){
								T = 0;
							};
							if(L>Basic.dom.vieW()-dragDiv.offsetWidth -50){
								L = Basic.dom.vieW()-dragDiv.offsetWidth;
							};
							if(T>Basic.dom.vieH()  - dragDiv.offsetHeight -50){
								T = Basic.dom.vieH() - dragDiv.offsetHeight;
							};

							dragDiv.style.left=L+'px';
							dragDiv.style.top=T+'px';
							//return false;
							};
						function fnUp(){
							this.onmousemove=null;
							this.onmouseup=null;
							//alert(oldIndex);
							//dragDiv.style.zIndex = oldIndex;		
							if(this.releaseCapture){
								this.releaseCapture();
							};
						return false;
						};
						
						//return false;
					};
				},
				dragZ: function(dragDiv){
					var lastX=0,
					      lastY=0,
						  iSpeedX=0,
					      iSpeedY=0;
					dragDiv.style.zIndex = zzz++;		
					dragDiv.onmousedown = function(ev){
						var oEvent=ev||event,
							 disX=oEvent.clientX-dragDiv.offsetLeft,
							 disY=oEvent.clientY-dragDiv.offsetTop;
						dragDiv.timer && clearInterval(dragDiv.timer);
						if(dragDiv.setCapture){
							dragDiv.onmousemove=fnMove;
							dragDiv.onmouseup=fnUp;
							dragDiv.setCapture();
						}else{
							document.onmousemove=fnMove;
							document.onmouseup=fnUp;
						};
						function fnMove(ev){
							var oEvent=ev||event,
								   L = oEvent.clientX-disX,
								   T = oEvent.clientY-disY;
							EventUtil.unSelection();
							dragDiv.style.cssText ='left:' +L+ 'px;top:'+T+'px;';
							iSpeedX = L - lastX;
							iSpeedY = T - lastY;
							lastX = L;
							lastY = T;
						}
						function fnUp(){
							this.onmousemove=null;
							this.onmouseup=null;
							if(this.releaseCapture){
								this.releaseCapture();
							};
							startMove();
						}
					}
					function startMove(){
						dragDiv.timer && clearInterval(dragDiv.timer);
						dragDiv.timer = setInterval(function(){
							iSpeedY+=2;
							var L=dragDiv.offsetLeft+iSpeedX,
							      T=dragDiv.offsetTop+iSpeedY;
							if(T>=Basic.dom.vieH()-dragDiv.offsetHeight){
								iSpeedY*=-0.9;
								iSpeedX*=0.9;
								T=Basic.dom.vieH()-dragDiv.offsetHeight;
							}else if(T<=0){
								iSpeedY*=-1;
								iSpeedX*=0.9;
								T=0;
							}
							if(L>=Basic.dom.vieW()-dragDiv.offsetWidth){
								iSpeedX*=-0.9;
								L=Basic.dom.vieW()-dragDiv.offsetWidth;
							}else if(L<=0){
								iSpeedX*=-0.9;
								L=0;
							}
							if(Math.abs(iSpeedX)<1){
								iSpeedX=0;
							}
							if(Math.abs(iSpeedY)<1){
								iSpeedY=0;
							}
							if(iSpeedX==0 && iSpeedY==0 && T==Basic.dom.vieH()-dragDiv.offsetHeight){
								clearInterval(dragDiv.timer);
							}else{
								dragDiv.style.cssText ='left:' +L+ 'px;top:'+T+'px;';
							}
						},30);
					
					}

				
				}
			}
		})(),
		cookies:(function(){
			return {
				getCookie : function(key){
					var a=document.cookie.split('; ');
					for(var i=0;i<a.length;i++){
						var t=a[i].split('=');
						if(key==t[0])
						{
							return t[1];
						}
					}
				},
				setCookie : function(key,value,times){
					var oDate=new Date();
					var iDate=oDate.getDate();
					document.cookie=key+'='+value+';expires'+iDate+times;
				},
				removeCookie : function(key){
					Basic.cookies.setCookie(key,'',-1);
				}
				
			
			};
		})(),
		client : (function(){
			//rendering engines
			var engine = {            
				ie: 0,
				gecko: 0,
				webkit: 0,
				khtml: 0,
				opera: 0,
				//complete version
				ver: null
			};
			//browsers
			var browser = {
				//browsers
				ie: 0,
				firefox: 0,
				safari: 0,
				konq: 0,
				opera: 0,
				chrome: 0,
				//specific version
				ver: null
			};
			//platform/device/OS
			var system = {
				win: false,
				mac: false,
				x11: false,
				//mobile devices
				iphone: false,
				ipod: false,
				ipad: false,
				ios: false,
				android: false,
				nokiaN: false,
				winMobile: false,
				//game systems
				wii: false,
				ps: false
			};    
			//detect rendering engines/browsers
			var ua = navigator.userAgent;    
			if (window.opera){
				engine.ver = browser.ver = window.opera.version();
				engine.opera = browser.opera = parseFloat(engine.ver);
			} else if (/AppleWebKit\/(\S+)/.test(ua)){
				engine.ver = RegExp["$1"];
				engine.webkit = parseFloat(engine.ver);
				//figure out if it's Chrome or Safari
				if (/Chrome\/(\S+)/.test(ua)){
					browser.ver = RegExp["$1"];
					browser.chrome = parseFloat(browser.ver);
				} else if (/Version\/(\S+)/.test(ua)){
					browser.ver = RegExp["$1"];
					browser.safari = parseFloat(browser.ver);
				} else {
					//approximate version
					var safariVersion = 1;
					if (engine.webkit < 100){
						safariVersion = 1;
					} else if (engine.webkit < 312){
						safariVersion = 1.2;
					} else if (engine.webkit < 412){
						safariVersion = 1.3;
					} else {
						safariVersion = 2;
					}   
					browser.safari = browser.ver = safariVersion;        
				}
			} else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)){
				engine.ver = browser.ver = RegExp["$1"];
				engine.khtml = browser.konq = parseFloat(engine.ver);
			} else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)){    
				engine.ver = RegExp["$1"];
				engine.gecko = parseFloat(engine.ver);
				//determine if it's Firefox
				if (/Firefox\/(\S+)/.test(ua)){
					browser.ver = RegExp["$1"];
					browser.firefox = parseFloat(browser.ver);
				}
			} else if (/MSIE ([^;]+)/.test(ua)){    
				engine.ver = browser.ver = RegExp["$1"];
				engine.ie = browser.ie = parseFloat(engine.ver);
			}
			//detect browsers
			browser.ie = engine.ie;
			browser.opera = engine.opera;
			//detect platform
			var p = navigator.platform;
			system.win = p.indexOf("Win") == 0;
			system.mac = p.indexOf("Mac") == 0;
			system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
			//detect windows operating systems
			if (system.win){
				if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
					if (RegExp["$1"] == "NT"){
						switch(RegExp["$2"]){
							case "5.0":
								system.win = "2000";
								break;
							case "5.1":
								system.win = "XP";
								break;
							case "6.0":
								system.win = "Vista";
								break;
							case "6.1":
								system.win = "7";
								break;
							default:
								system.win = "NT";
								break;                
						}                            
					} else if (RegExp["$1"] == "9x"){
						system.win = "ME";
					} else {
						system.win = RegExp["$1"];
					}
				}
			}
			//mobile devices
			system.iphone = ua.indexOf("iPhone") > -1;
			system.ipod = ua.indexOf("iPod") > -1;
			system.ipad = ua.indexOf("iPad") > -1;
			system.nokiaN = ua.indexOf("NokiaN") > -1;
			//windows mobile
			if (system.win == "CE"){
				system.winMobile = system.win;
			} else if (system.win == "Ph"){
				if(/Windows Phone OS (\d+.\d+)/.test(ua)){;
					system.win = "Phone";
					system.winMobile = parseFloat(RegExp["$1"]);
				}
			}
			//determine iOS version
			if (system.mac && ua.indexOf("Mobile") > -1){
				if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
					system.ios = parseFloat(RegExp.$1.replace("_", "."));
				} else {
					system.ios = 2;  //can't really detect - so guess
				}
			}
			//determine Android version
			if (/Android (\d+\.\d+)/.test(ua)){
				system.android = parseFloat(RegExp.$1);
			}
			//gaming systems
			system.wii = ua.indexOf("Wii") > -1;
			system.ps = /playstation/i.test(ua);
			//return it
			return {
				engine:     engine,
				browser:    browser,
				system:     system        
			};
		  
		})(),
		ajax : (function(){
			return {
				createXHR : function(){ 
					if (typeof XMLHttpRequest != "undefined"){ 
						return new XMLHttpRequest(); 
					} else if (typeof ActiveXObject != "undefined"){ 
						if (typeof arguments.callee.activeXString != "string"){ 
							var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0", 
											"MSXML2.XMLHttp"], 
								i, len; 
							for (i=0,len=versions.length; i < len; i++){ 
								try { 
									var xhr = new ActiveXObject(versions[i]); 
									arguments.callee.activeXString = versions[i]; 
									return xhr; 
								} catch (ex){ 
									//skip 
								} 
							} 
						} 
				 
						return new ActiveXObject(arguments.callee.activeXString); 
					} else { 
						throw new Error("No XHR object available."); 
					} 
				} ,
				get : function(url, fnSucc,obj, fnFaild){
					var xhr=Basic.ajax.createXHR(),
						  timstamp = (new Date()).valueOf(); 
					 if (url.indexOf("?") >= 0) {    
						url = url + "&t=" + timstamp;    
					} else {    
						url = url + "?t=" + timstamp;    
					}    
					xhr.open('GET', url, true);
					xhr.send();
					xhr.onreadystatechange=function (){
						if(xhr.readyState==4) {//完成
							if(xhr.status==200) {  //成功
								if(obj){
									fnSucc.call(obj,xhr.responseText)
								}else{
									fnSucc(xhr.responseText);
									}
							}else{
								if(fnFaild)
									fnFaild(xhr.status);
							}
						}
					};
				},
				addUrlParam : function (url,name,value){
					url += (url.indexOf('?') == -1 ? '?' : '&');
					url += encodeURIComponent(name) + '=' + encodeURIComponent(value);
					return url;
				},
				serialize : function (form){         
					var parts = new Array(); 
					var field = null; 			 
					for (var i=0, len=form.elements.length; i < len; i++){ 
						field = form.elements[i]; 
				 
						switch(field.type){ 
							case "select-one": 
							case "select-multiple": 
								for (var j=0, optLen = field.options.length; j < optLen; j++){ 
									var option = field.options[j]; 
									if (option.selected){ 
										var optValue = ""; 
										if (option.hasAttribute){ 
											optValue = (option.hasAttribute("value") ?  
														option.value : option.text); 
										} else { 
											optValue = (option.attributes["value"].specified ?  
														option.value : option.text); 
										} 
										parts.push(encodeURIComponent(field.name) + "=" +  
												   encodeURIComponent(optValue)); 
									} 
								} 
								break; 
				 
							case undefined:     //fieldset 
							case "file":        //file input 
							case "submit":      //submit button 
							case "reset":       //reset button 
							case "button":      //custom button 
								break; 
				 
							case "radio":       //radio button 
							case "checkbox":    //checkbox 
								if (!field.checked){ 
									break; 
								} 
								/* falls through */
				 
							default: 
								parts.push(encodeURIComponent(field.name) + "=" +  
									encodeURIComponent(field.value)); 
						} 
					}         
					return parts.join("&"); 
				} ,
				post : function(form,url,fnSucc,obj){
					var xhr=Basic.ajax.createXHR(),
						  timstamp = (new Date()).valueOf(); 
					 if (url.indexOf("?") >= 0) {    
						url = url + "&t=" + timstamp;    
					} else {    
						url = url + "?t=" + timstamp;    
					};   
					xhr.onreadystatechange = function(event){ 
						if (xhr.readyState == 4){ 
							if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){ 
									if(obj){
										fnSucc.call(obj,xhr.responseText)
									}else{
										fnSucc(xhr.responseText);
										}
							} else { 
								alert("Request was unsuccessful: " + xhr.status); 
							} 
						} 
					}; 
					xhr.open("post", url, true); 
					xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");           
					xhr.send(Basic.ajax.serialize(form)); 
				},
				postJson : function(json,url,fnSucc,obj){
					var xhr=Basic.ajax.createXHR(),
						  timstamp = (new Date()).valueOf(); 
					 if (url.indexOf("?") >= 0) {    
						url = url + "&t=" + timstamp;    
					} else {    
						url = url + "?t=" + timstamp;    
					};   
					xhr.onreadystatechange = function(event){ 
						if (xhr.readyState == 4){ 
							if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){ 
									if(obj){
										fnSucc.call(obj,xhr.responseText)
									}else{
										fnSucc(xhr.responseText);
										}
							} else { 
								alert("Request was unsuccessful: " + xhr.status); 
							} 
						} 
					}; 
					xhr.open("post", url, true); 
					xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");           
					xhr.send(json); 
				}
			}
		
		})()
	};
    function _$(els) {
        this.elements = [];
        switch (typeof els) {
        case 'string':
            switch (els.charAt(0)) {
            case '#':
                //ID
                var obj = document.getElementById(els.substring(1));
                this.elements.push(obj);
                break;
            case '.':
                //class
                this.elements = Basic.dom.getByClass(els.substring(1), document);
                break;
            default:
                //tagName
                this.elements = document.getElementsByTagName(els);
            }
            break;
        case 'object':
            this.elements.push(els);
        }
    };
    _$.prototype.extend = function(name, fn) {
        _$.prototype[name] = fn;
    };

    /*
    Events
      * each
      * bind
	  * unbind
  */
    _$.method('each',
    function(fn) {
        for (var i = this.elements.length - 1; i >= 0; i--) {
            fn.call(this, this.elements[i]);
        };
    }).method('unbind',
	function(type, fn){
        var remove = function(el) {
            if (window.removeEventListener) {
                el.addEventListener(type, fn, false);
            } else if (window.detachEvent) {
                el.attachEvent('on' + type, fn);
            };
        };
        this.each(function(el) {
            remove(el);
        });
	}).method('bind',
    function(type, fn) {
        var add = function(el) {
            if (window.addEventListener) {
                el.addEventListener(type, function(ev){
					if(false == fn.call(el,ev)){
						ev.stopPropagation(); 
						ev.preventDefault();
					};
				}, false);
            } else if (window.attachEvent) {
                el.attachEvent('on' + type, function(ev){
					if(false == fn.call(el)){
						ev.cancelBubble = true;
						return false;
					};
				});
            };
        };
        this.each(function(el) {
            add(el);
        });
        return this;
    }).
    /*
	DOM
	  * addClass
	  * removeClass
	  * find
	  * index
	  * css
	  * eq
	  * toggle
	  * click
	  * show
	  * hide
	  * hover
	  * size
	  * html
  */
    method('addClass',
    function(className) {
        var add = function(el) {
            var classNames = Basic.string.trim(el.className).split(' ');
            classNames.push(className);
            el.className = classNames.join(' ');
        };
        this.each(function(el) {
            add(el);
        }) ;
		return this;
    }).method('removeClass',
    function(className) {
        var add = function(el) {
            var classNames = Basic.string.trim(el.className).split(' '),
                   i;
            for (i = classNames.length - 1; i >= 0; i--) {
                if (classNames[i] == className) {
                    classNames = classNames.slice(0, i).concat(classNames.slice(i + 1, classNames.length));
                };
            };
            el.className = classNames.join(' ');
        };
        this.each(function(el) {
            add(el);
        }) ;
		return this;
    }).method('find',
    function(str) {
        var aResult = [],
        find = function(el) {
            switch (str.charAt(0)) {
            case '.':
                //class
                var aEle = Basic.dom.getByClass(str.substring(1), el);
                aResult = aResult.concat(aEle);
                break;
            default:
                //标签
                var aEle = el.getElementsByTagName(str);
                Basic.array.appendArr(aResult, aEle);
            };
        };
        this.each(function(el) {
            find(el);
        }) ;
		var new_$ = new _$();
        new_$.elements = aResult;
        return new_$;
    }).method('index',
    function() {
        return Basic.dom.getIndex(this.elements[0]);
    }).method('css',
    function(attr, value) {
        var add = function(el) {};
        if (arguments.length == 2) { //设置样式
            add = function(el) {
                if (attr == 'opacity') {
                    el.style.filter = 'alpha(opacity:' + value + ')';
                    el.style.opacity = value / 100;
                } else {
                    el.style[attr] = value;
                };
            };
        } else { //获取样式
            add = function(el) {
                if (typeof attr == 'string') {
                    return Basic.dom.getStyle(this.elements[0], attr);
                } else { //对象设置样式
                    var k = '';
                    for (k in attr) {
                        if (k == 'opacity') {
                            el.style.filter = 'alpha(opacity:' + attr[k] + ')';
                            el.style.opacity = attr[k] / 100;
                        } else {
                            el.style[k] = attr[k];
                        };
                    };
                };
            };
        };
        this.each(function(el) {
            add(el);
        });
        return this;
    }).method('eq',
    function(n) {
        return new _$(this.elements[n]);
    }).method('toggle',
    function() {
        var _arguments = arguments,
        that = this,
        count = 0,
        addToggle = function(el) {
            EventUtil.myAddEvent(el, 'click',
            function() {
                _arguments[count++%_arguments.length].call(el);
            });
        };
        this.each(function(el) {
            addToggle(el);
        });
        return this;
    }).method('click',
    function(fn) {
        var eClick = function(el) {
             EventUtil.myAddEvent(el, 'click', fn);
        };
        this.each(function(el) {
            eClick(el);
        }) ;
		return this;
    }).method('show',
    function() {
        var eShow = function(el) {
            el.style.display = 'block';
        };
        this.each(function(el) {
            eShow(el);
        }) ;
		return this;
    }).method('hide',
    function() {
        var eHide = function(el) {
            el.style.display = 'none';
        };
        this.each(function(el) {
            eHide(el);
        }) ;
	return this;
    }).method('hover',
    function(fnOver, fnOut) {
        var eHover = function(el) {
             EventUtil.myAddEvent(el, 'mouseover', fnOver);
             EventUtil.myAddEvent(el, 'mouseout', fnOut);
        };
        this.each(function(el) {
            eHover(el);
        });
		return this;
    }).method('attr',
    function(attr, value) {
        var oAttr = function() {};
        if (arguments.length == 2) {
            oAttr = function(el) {
                el.setAttribute(attr,value);
            };
        } else {
            return this.elements[0].getAttribute(attr);
        };
        this.each(function(el) {
            oAttr(el);
        }) ;
		return this;
    }).method('size',
    function() {
        return this.elements.length;
    }).method('html',
	function(value){
        var oAttr = function() {};
		if(arguments.length == 1){
			oAttr = function(el){
				el.innerHTML = value;
			}
		}else{
			return this.elements[0].innerHTML;
		};
        this.each(function(el) {
            oAttr(el);
        }) ;
	}).method('remove',
	function(){
		var fnRemove = function(el){
			var oParent = el.parentNode;
			oParent.removeChild(el);
		};
        this.each(function(el) {
            fnRemove(el);
        }) ;
	}).
    /*
	AJAX
	  * load. Fetches an HTML fragment from a URL and inserts it into an element.
  */
    method('load',
    function(uri, method) {
        // ...
    }).
    /*
	UI
	  * startMove.
  */

    method('startMove',
    function(json, fn) {
        var subStart = function(el) {
            el.timer && clearInterval(el.timer);
            el.timer = setInterval(function() {
                var bStop = true; //这一次运动就结束了——所有的值都到达了
                for (var attr in json) {
                    //1.取当前的值
                    var iCur = 0;
                    if (attr == 'opacity') {
                        iCur = parseInt(parseFloat(Basic.dom.getStyle(el, attr)) * 100);
                    } else {
                        iCur = parseInt(Basic.dom.getStyle(el, attr));
                    };
                    //2.算速度
                    var iSpeed = (json[attr] - iCur) / 7;
					iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                    //3.检测停止
					if(iCur != json[attr]){
                        bStop = false;
                    };
                    if (attr == 'opacity') {
                        el.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
                        el.style.opacity = (iCur + iSpeed) / 100;
                    } else {
                        el.style[attr] = iCur + iSpeed + 'px';
                    };
                };
                if (bStop) {
                    clearInterval(el.timer);
                    if (fn) {
                        fn.call(el);
                    };
                };
            },30)
        };
        this.each(function(el) {
            subStart(el);
        });
        return this;
    }).method('stop',
	function(){
		var fnStop = function(el){
			clearInterval(el.timer);
		};
        this.each(function(el) {
            fnStop(el);
        });
		return this;
	}).method('flex',function(cur, target, fnDo,fnEnd){
		var  subStart =function(el){
					if(!el.iSpeed)el.iSpeed=0;  //速度
					if(!el.total)el.total=0;  //total
					var  MAX_SPEED = 20,
								   x =0,
								   now={};  
					el.timer&&clearInterval(el.timer);
					el.timer = setInterval(fnMove,20);	
					function fnMove(){
						el.iSpeed+=(100-x)/3; //fs为6
						el.iSpeed*=0.6;         //弹性系数
						if(Math.abs(el.iSpeed)>MAX_SPEED)el.iSpeed=el.iSpeed>0?MAX_SPEED:-MAX_SPEED;
						x+=el.iSpeed;
						for(var i in cur){
							now[i]=(target[i]-cur[i])*x/100+cur[i];   //当前值加上目标值与当前值的差值的百分之x
						}
						if(fnDo)fnDo.call(el, now);
					if(Math.abs(el.iSpeed)<1 && Math.abs(100-x)<1) {
						clearInterval(el.timer);         //停止
						if(fnEnd)fnEnd();  //执行回调函数
						el.iSpeed=0;                      //速度归零
					}

					}
			}
        this.each(function(el) {
            subStart(el);
        });
	}).method('startMoveF',
    function(json, fn) {
        var subStart = function(el) {
            el.timer && clearInterval(el.timer);
            el.timer = setInterval(function() {
                var bStop = true; //这一次运动就结束了——所有的值都到达了
                for (var attr in json) {
                    //1.取当前的值
                    var iCur = 0;
                    if (attr == 'opacity') {
                        iCur = parseInt(parseFloat(Basic.dom.getStyle(el, attr)) * 100);
                    } else {
                        iCur = parseInt(Basic.dom.getStyle(el, attr));
                    };
                    //2.算速度
                    var iSpeed = (json[attr] - iCur) / 3;
					iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                    //3.检测停止
					if(iCur != json[attr]){
                        bStop = false;
                    };
                    if (attr == 'opacity') {
                        el.style.filter = 'alpha(opacity:' + (iCur + iSpeed) + ')';
                        el.style.opacity = (iCur + iSpeed) / 100;
                    } else {
                        el.style[attr] = iCur + iSpeed + 'px';
                    };
                };
                if (bStop) {
                    clearInterval(el.timer);
                    if (fn) {
                        fn.call(el);
                    };
                };
            },30)
        };
        this.each(function(el) {
            subStart(el);
        });
        return this;
    });
	window.installHelper = function(scope, interface) {
		scope[interface] = function() {
			return new _$(arguments[0]);
		}
	};
	LS.$E = EventUtil;
	LS.$B = Basic;
})();
installHelper(LS, '$');
typeof progress=="function"&&progress("LS e");

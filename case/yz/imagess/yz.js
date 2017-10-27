window.onload = function(){
	yz.app.topSlide();
	yz.app.toScroll();
	new yz.ui.Switch(yz.tools.$(".showItem", "#JS_switch_stage_0"));
	new yz.ui.Switch(yz.tools.$(".showItem", "#JS_switch_stage_1"));
	yz.app.fixHead();
	yz.app.scrollText();
	yz.app.toScroll2();
	yz.app.showText();
	yz.app.slideDoor();
};
var yz = {
};
yz.tools ={};
yz.tools.addClass = function(C, A) {
	if (C) {
		var B = (C.className + "").split(/\s/g) || [];
		if (yz.tools.inArray(A, B) == -1) {
			B.push(A);
			C.className = B.join(" ")
		}
	}
	return C
};
yz.tools.removeClass = function(F, B) {
	if (B && typeof B == "string" && F && typeof F.className == "string") {
		var D = F.className.split(/\s/g);
		var A = [];
		if (D && D.length) {
			for (var E = 0, C = D.length; E < C; E++) {
				if (D[E] != B) {
					A.push(D[E])
				}
			}
		}
		F.className = A.join(" ")
	}
	return F
};
yz.tools.addHandler = function(E, D, C, B) {
	if (!E) {
		return
	}
	function A(G) {
		var F = G ? G: window.event;
		F.target = G.target || G.srcElement;
		return C.apply(B || this, arguments)
	}
	E.eventHash = E.eventHash || {}; (E.eventHash[D] = E.eventHash[D] || []).push({
		"name": D,
		"handler": C,
		"fn": A,
		"scope": B
	});
	if (E.addEventListener) {
		E.addEventListener(D, A, false)
	} else {
		if (E.attachEvent) {
			E.attachEvent("on" + D, A)
		} else {
			E["on" + D] = A
		}
	}
};
yz.tools.removeHandler = function(G, E, D, C) {
	G.eventHash = G.eventHash || {};
	var F = G.eventHash[E] || [],
	A = F.length;
	if (A > 0) {
		for (; A--;) {
			var B = F[A];
			if (B.name == E && B.handler === D && B.scope === C) {
				if (G.removeEventListener) {
					G.removeEventListener(E, B.fn, false)
				} else {
					if (G.detachEvent) {
						G.detachEvent("on" + E, B.fn)
					} else {
						G["on" + E] = null
					}
				}
				F.splice(A, 1);
				break
			}
		}
	}
};
yz.tools.inArray = function(B, E) {
	var A = -1;
	if (B && E && E.length) {
		for (var C = 0, D = E.length; C < D; C++) {
			if (B == E[C]) {
				return C
			}
		}
	}
	return A
};
yz.tools.offsetTop = function(C) {
	var B = C;
	if (!C) {
		return 0
	}
	var A = 0;
	while (B != null && B != document.body) {
		A += B.offsetTop;
		B = B.offsetParent
	}
	return A
};
yz.tools.getByClass = function(A,B){
	var aEle = A.getElementsByTagName('*');
	var arr = [];
	
	for(var i=0;i<aEle.length;i++){
		if(aEle[i].className == B){
			arr.push(aEle[i]);
		}
	}
	return arr;
};
yz.tools.getTag = function(A,B){
		var A = A || document
		return A.getElementsByTagName(B);
	};
yz.tools.getStyle = function(A,B){
	if(A.currentStyle){
		return A.currentStyle[B];
	}else{
		return getComputedStyle(A,false)[B];
	};
};
yz.tools.getScrollTop = function(){
	return document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop;	
};
yz.tools.setScrollTop = function (){
		document.documentElement.scrollTop=value;	
}
yz.tools.$  = function(D, B) {
	if (!D) {
		return false
	}
	if (B === undefined) {
		B = document
	}
	if (typeof(B) === "string") {
		B = yz.tools.$(B)
	}
	if (!B) {
		return false
	}
	if (D.indexOf("#") == 0) {
		var A = document.getElementById(D.substr(1))
	} else {
		if (D.indexOf(".") == 0) {
			if (B.getElementsByClassName && 0) {
				var A = B.getElementsByClassName(D.replace(".", ""))
			} else {
				var A = [],
				F = B.getElementsByTagName("*");
				for (var E = 0; E < F.length; E++) {
					var G = F[E];
					var C = G.className;
					if (C) {
						C = C.split(/\s/g);
						if (yz.tools.inArray(D.replace(".", ""), C) >= 0) {
							A.push(G)
						}
					}
				}
			}
		} else {
			var A = B.getElementsByTagName(D)
		}
	}
	return A
};
yz.tools.clearCurrent= function(A,B){
		for(var k = 0; k<A.length; k++){
			
		yz.tools.removeClass(A[k],B)
		}
};
yz.ui ={};
yz.ui.Animate = function(C, B, D, A, E) {
	return new yz.ui.Animate.prototype.init(C, B, D, A, E)
};
yz.ui.Animate.prototype = {
	init: function(C, B, D, A, F) {
		this.dom = C;
		this.time = D || 300;
		this.preTime = 10;
		this.list = B;
		this.callback = F;
		this.tweenType = A || "easeInOut";
		this._d = Math.ceil(this.time / this.preTime);
		this._t = 0;
		this._c = {};
		this._b = {};
		for (var E in this.list) {
			this._b[E] = parseFloat(this.currentStyle()[E]) || 0;
			this._c[E] = parseFloat(this.list[E]) - this._b[E]
		}
		if (this.dom._animate) {
			this.dom._animate.stop()
		}
		this.run();
		this.dom._animate = this
	},
	currentStyle: function() {
		var A = this.dom;
		return A.currentStyle || document.defaultView.getComputedStyle(A, null)
	},
	run: function() {
		if (this._t > this._d) {
			if (yz.tools.typeOf(this.callback) == "function") {
				this.callback()
			}
			return
		} else {
			if (this._stop) {
				return
			} else {
				for (var B in this.list) {
					var A = this.tween[this.tweenType](this._t, this._b[B], this._c[B], this._d) + (("opacity|".indexOf(B + "|") > -1) ? "": "px");
					this.dom.style[B] = A
				}
				this._t++;
				requestAnimFrame(yz.tools.bindFunction(this, this.run), this.preTime)
			}
		}
	},
	stop: function() {
		this._stop = true
	},
	tween: {
		easeIn: function(A, B, C, D) {
			return C * (A /= D) * A * A * A + B
		},
		easeOut: function(A, B, C, D) {
			return - C * ((A = A / D - 1) * A * A * A - 1) + B
		},
		easeInOut: function(A, B, C, D) {
			if ((A /= D / 2) < 1) {
				return C / 2 * A * A * A * A + B
			}
			return - C / 2 * ((A -= 2) * A * A * A - 2) + B
		},
		linear: function(A, B, C, D) {
			return C * A / D + B
		}
	}
};
yz.ui.Animate.prototype.init.prototype = yz.ui.Animate.prototype;
yz.ui.getVeiwWidth = function(){
		return document.documentElement.clientWidth;
	};
yz.ui.Switch = function (A) {
	this.dom = A;
	this.size = this.dom.length;
	this.index = 0;
	this.toggle()
}
yz.ui.Switch = function (A) {
	this.dom = A;
	this.size = this.dom.length;
	this.index = 0;
	this.toggle()
}
yz.ui.Switch.prototype.toggle = function() {
	var B = this;
	for (var A = 0; A < B.size; A++) {
		B.dom[A].key = A;
		yz.tools.addHandler(B.dom[A], "mouseover",
		function() {
			yz.tools.removeClass(B.dom[B.index].parentNode, "open");
			yz.tools.addClass(this.parentNode, "open");
			var C = this.parentNode.getElementsByTagName("img")[0];
			if (C && C.getAttribute("data-src")) {
				C.src = C.getAttribute("data-src");
				C.removeAttribute("data-src")
			}
			B.index = this.key
		},
		B.dom[A])
	}
};
yz.ui.startMove = function(A,B,C){	
		clearInterval(A.timer);
		A.timer = setInterval(function(){
			var bBtn = true;
			for(var attr in B){
				var iCur = 0;
				if(attr == 'opacity'){
					if(Math.round(parseFloat(yz.tools.getStyle(A,attr))*100)==0){
					iCur = Math.round(parseFloat(yz.tools.getStyle(A,attr))*100);
					}
					else{
						iCur = Math.round(parseFloat(yz.tools.getStyle(A,attr))*100) || 100;
					}	
				}
				else{
					iCur = parseInt(yz.tools.getStyle(A,attr)) || 0;
				}
				var iSpeed = (B[attr] - iCur)/8;
			iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
				if(iCur!=B[attr]){
					bBtn = false;
				}
				if(attr == 'opacity'){
					A.style.filter = 'alpha(opacity=' +(iCur + iSpeed)+ ')';
					A.style.opacity = (iCur + iSpeed)/100;
				}
				else{
					A.style[attr] = iCur + iSpeed + 'px';
				}
			}
			if(bBtn){
				clearInterval(A.timer);
				if(C){
					C.call(A);
				}
			}
		},30)
	};
yz.ui.fadeIn = function(A){
	
	var iCur = yz.tools.getStyle(A,'opacity');
	if(iCur==1){ return false; }
	
	var value = 0;
	clearInterval(A.timer);
	A.timer = setInterval(function(){
		var iSpeed = 5;
		if(value == 100){
			clearInterval(A.timer);
		}
		else{
			value += iSpeed;
			A.style.opacity = value/100;
			A.style.filter = 'alpha(opacity='+value+')';
		}
	},30);
	
};	
yz.ui.fadeOut = function(A){
	var iCur = yz.tools.getStyle(A,'opacity');
	if(iCur==0){ return false; }
	var value = 100;
	clearInterval(A.timer);
	A.timer = setInterval(function(){
		var iSpeed = -5;
		if(value == 0){
			clearInterval(A.timer);
		}
		else{
			value += iSpeed;
			A.style.opacity = value/100;
			A.style.filter = 'alpha(opacity='+value+')';
		}
	},30);
	
};
yz.app ={};
yz.app.topSlide = function(){
		var oSlideCont = yz.tools.$("#slide");
		var oUl = yz.tools.getTag(oSlideCont,"ul")[0];
		oUl.innerHTML += oUl.innerHTML;
		var aLi = yz.tools.getTag(oUl,"li");
		var aImg = yz.tools.getTag(oUl,"img");
		var oBtn = yz.tools.$("#btn");
		var aSpan = yz.tools.getTag(oBtn,"span");
		var imgWidth = 1600;
		oUl.style.width = aImg.length*imgWidth +"px";
		var iNow1 = 0;
		var iNow2 = 0;
		function toReSize(){
			var veiwWidth = yz.ui.getVeiwWidth();
			if(veiwWidth >1000){
				for(var i =0;i<aImg.length;i++){
					var left = -(imgWidth - veiwWidth)/2 +"px";
					aImg[i].style.left = left;
				}
			}
		};
		toReSize();
		window.onresize = function(){
				toReSize();
			};
		t = setInterval(function(){autoLeft(); },2000)	
		aSpan[0].onmouseout =function (){
		 t = setInterval(function(){autoLeft(); },2000)			
			}
		aSpan[1].onmouseout =function (){
		 t1 = setInterval(function(){autoRight(); },2000)			
			}
		aSpan[0].onmouseover =aSpan[1].onmouseover = function(){
			clearInterval(t)
			clearInterval(t1)
		}
		aSpan[0].onclick =function(){
			autoLeft()
		};	
		aSpan[1].onclick =function(){
		autoRight();
		};
		function autoLeft(){
			if(iNow1==0){
				iNow1 = aLi.length/2;
			oUl.style.left = -oUl.offsetWidth/2 + 'px';
				iNow1 --
			yz.ui.startMove(oUl,{left:-imgWidth*iNow1})
			}else{
			iNow1--							 
			yz.ui.startMove(oUl,{left:-imgWidth*iNow1})}
		}
		function autoRight(){
			if(iNow1==5){
				iNow1 = aLi.length/2;
			oUl.style.left = -(oUl.offsetWidth/2 - imgWidth) + 'px';
			yz.ui.startMove(oUl,{left:-imgWidth*iNow1})
			}else{
			iNow1++						 
			yz.ui.startMove(oUl,{left:-imgWidth*iNow1})}
		}
	};;
yz.app.toScroll = function(){
	var oPrev = yz.tools.$("#JS_scroll_prev");
	var oNext = yz.tools.$("#JS_scroll_next");
	var oTable = yz.tools.$("#JS_scroll_stage")
	var aTd = yz.tools.getTag(oTable,"td")
	imgWidth = 239;
	iNow = 0;
	oNext.onclick = function(){
			if(iNow ==(aTd.length-4) ){
				return false
			}
			iNow++
			yz.ui.startMove(oTable,{marginLeft:-240*iNow})
		
		
		}
	oPrev.onclick = function(){
			if(iNow ==0 ){
				return false
			}
			iNow--
			yz.ui.startMove(oTable,{marginLeft:-240*iNow})
		
		
		}
	
	}
yz.app.fixHead = function(){
	var oHead = yz.tools.$("#head_main");
	var sHeight = 165;
	window.onscroll= function(){
			var t = yz.tools.getScrollTop(); 
			if(t >=sHeight){
				oHead.style.display = "block"
				oHead.style.position = "fixed";
				oHead.style.top = 0;
				oHead.style.zIndex = 100;
			}
			if(t <=sHeight){
				oHead.style.display = "none"
			}
		}
	}
yz.app.scrollText = function(){
	var oHappiness = yz.tools.$("#happiness_border")	
	var aDiv = yz.tools.$(".happiness_info","#happiness_main")
	var oHappyMain = yz.tools.$("#happiness_main");
	var iLength = aDiv.length
	var iNow = 0;
	oHappyMain.innerHTML += oHappyMain.innerHTML;
	setInterval(scrollTop,1000)
	
	//var oDivHeight = oDiv[0].offsetHeight //69
	//oHappiness.offsetHeight ; //345
	function scrollTop (){
			//alert(69*iLength)
			//alert(oHappyMain.style.marginTop)

		if(oHappyMain.style.marginTop >=(-69*iLength+"px")){
			oHappyMain.style.marginTop = 0;
			iNow=0;
			}
		iNow++
		yz.ui.startMove(oHappyMain,{marginTop:-(69*iNow)})
		
		};
	
	
	
};
yz.app.toScroll2 = function(){
	var oTable = yz.tools.$("#JS_focus_stage")	;
	// oTable.offsetWidth 1050
	var oPrev = yz.tools.$("#JS_focus_prev")	;
	var oNext = yz.tools.$("#JS_focus_next")	;
	var aNav = yz.tools.$(".a","#JS_focus_nav")	;
	
	var t = null;
	setIn()
	for(var i =0; i<aNav.length;i++){
		aNav[i].iNow  =i;
		aNav[i].onclick = function(){
			clearInterval(t)
			yz.tools.clearCurrent(aNav,"current")
			yz.tools.addClass(this,"current")
			
			invoke(this.iNow)
			}
	
		aNav[i].onmouseout = function (){
			setIn()
			}
	}
	oPrev.onclick =function(){
			clearInterval(t)
			iNow--
			if(iNow <0){
				iNow = 2	
			};
			yz.tools.clearCurrent(aNav,"current")
			yz.tools.addClass(aNav[iNow],"current")
			
			yz.ui.startMove(oTable,{marginLeft:-iNow*350})
	}
	oNext.onclick =function(){
		clearInterval(t)
			iNow++
			if(iNow >2){
				iNow = 0	
			};
			yz.tools.clearCurrent(aNav,"current")
			yz.tools.addClass(aNav[iNow],"current")
			
			yz.ui.startMove(oTable,{marginLeft:-iNow*350})
	}
	oPrev.onmouseout = oNext.onmouseout = function(){
		
		setIn();
	}
	function setIn(){
		clearInterval(t)
		t = setInterval(start,2000);
		return t;
	};
	function start(){
				iNow++
			if(iNow >2){
				iNow = 0	
			};
			yz.tools.clearCurrent(aNav,"current")
			yz.tools.addClass(aNav[iNow],"current")
			
			yz.ui.startMove(oTable,{marginLeft:-iNow*350})
		};
	function invoke(iNow){
		
		yz.ui.startMove(oTable,{marginLeft:-iNow*350})
	};
};
yz.app.showText = function(){
	var oMiddleMap = yz.tools.$("#middleMap");
	var aLi = yz.tools.getTag(oMiddleMap,"li");
	for(var i =0; i<aLi.length;i++){
		aLi[i].onmouseover =function(){
			var p = yz.tools.getTag(this,"p")[0]	;
			p.style.display = " block"
			
		}
		aLi[i].onmouseout =function(){
			var p = yz.tools.getTag(this,"p")[0]	;
			p.style.display = " none"
			
		}
		
	}

}
yz.app.slideDoor = function(){
	var oTabNav = yz.tools.$("#JS_tab_nav");
	var aA = yz.tools.getTag(oTabNav,"a");
	var aCont = yz.tools.$(".tabBody","#JS_tab_stage")	;
	for(var i =0;i<aA.length;i++){
		aA[i].index = i;
		aA[i].onmouseover = function(){
			yz.tools.clearCurrent(aA,"current");
			yz.tools.clearCurrent(aCont,"current");
			yz.tools.addClass(this,"current");
			yz.tools.addClass(aCont[this.index],"current");
		}
	}	
};















































































/*yz.app.top= function(){
		var btn = yz.tools.$("#btn1");
		btn.onmouseover = function(){
				this.className = "icon11";
			}
		btn.onmouseout = function(){
				this.className = "icon10";
			}
		
		var top1 = document.documentElement.clientHeight/1.1;
		window.onscroll=function(){
			yz.tools.getScrollTop()>0?btn.style.display="block":btn.style.display="none";
			
			if(0==yz.tools.getScrollTop()){
				clearInterval(scro)	;
			}else{
				var scro = setInterval(function(){
							var to1 = btn.style.top;
							var speed =(top1+yz.tools.getScrollTop()-to1)/8;

								btn.style.top = to1+speed+"px";		
										
									},5000)
			}
			
			
			
			}
		btn.onclick=function(){
            var goTop=setInterval(scrollMove,10);
            function scrollMove(){
                    yz.tools.setScrollTop(yz.tools.getScrollTop()/1.1);
                    if(yz.tools.getScrollTop()<1)clearInterval(goTop);
                }
        }
	
			
			
	}
*/






















































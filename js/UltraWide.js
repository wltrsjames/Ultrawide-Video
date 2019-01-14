"use strict";

function addClass(v,c) {
	for(let i=0,l=v.length,cl; i<l; i++) {
		cl = v[i].classList; cl.add(c);
		//console.log("[UltraWide] addClass",c,v[i]);
	}
}
function remClass(v,c) {
	for(let i=0,l=v.length,cl; i<l; i++) {
		cl = v[i].classList; if(cl.contains(c)) {
			cl.remove(c); //console.log("[UltraWide] remClass",c,v[i]);
		}
	}
}

UltraWide.prototype.update = function() {
	//Calculate scale factor:
	const aspect = screen.width / screen.height;
	if(aspect >= 1.88) { //If wider than 16:9 widescreen:
		const scale = aspect / 1.77; this.scale = Math.round(scale*100)/100;
	} else if(this.mode == 3 || this.mode == 4) this.scale = 1.33; //Force Modes
	else this.scale = 1; //Default
	
	//Update Styles:
	this.styles.innerHTML = ".extraClassAspect { -webkit-transform:scaleX("+this.scale+")!important; }"
	+".extraClassCrop { -webkit-transform:scale("+this.scale+")!important; }";
	
	//Update Classes:
	const fs = document.webkitIsFullScreen, v = document.getElementsByTagName('video');
	//console.log("[UltraWide] Page Update", this.mode, this.scale, fs);
	if(v.length) switch(this.mode) {
	case 0: //Disabled
		remClass(v,'extraClassAspect');
		remClass(v,'extraClassCrop');
	break; case 1: //Aspect
		if(fs && this.scale > 1) {
			addClass(v,'extraClassAspect');
			remClass(v,'extraClassCrop');
		} else {
			remClass(v,'extraClassAspect');
			remClass(v,'extraClassCrop');
		}
	break; case 2: //Crop
		if(fs && this.scale > 1) {
			addClass(v,'extraClassCrop');
			remClass(v,'extraClassAspect');
		} else {
			remClass(v,'extraClassAspect');
			remClass(v,'extraClassCrop');
		}
	break; case 3: //Force Crop
		addClass(v,'extraClassCrop');
		remClass(v,'extraClassAspect');
	break; case 4: //Force Aspect
		addClass(v,'extraClassAspect');
		remClass(v,'extraClassCrop');
	break;
	}
	
	//Update every 12s in fullscreen mode:
	if(fs && this.mode && v.length) {
		if(this.timer != null) clearTimeout(this.timer);
		this.timer = setTimeout(function() { this.update(); this.timer = null; }.bind(this), 12000);
	}
}

function UltraWide() {
	this.mode = 0;
	document.addEventListener('fullscreenchange', function(e) {
		this.update();
	}.bind(this));
	document.addEventListener('keydown', function(e) {
		if(e.ctrlKey && e.altKey && e.key == 'c') {
			if(++this.mode > 2) this.mode = 0;
			//console.log("[UltraWide] Detected CTRL+ALT+C","Mode "+this.mode);
			chrome.storage.local.set({'extensionMode':this.mode}, function(){});
		}
	}.bind(this));
	this.styles = document.createElement('style');
	document.body.appendChild(this.styles);
}

function onLoad() {
	if(!document.body) return;
	const ultrawide = new UltraWide();
	chrome.storage.local.get('extensionMode', function(status) {
		ultrawide.mode = status.extensionMode;
		if(status.extensionMode != 0) ultrawide.update();
	});
	chrome.storage.onChanged.addListener(function(changes) {
		ultrawide.mode = changes.extensionMode.newValue;
		ultrawide.update();
	});
	console.info("UltraWide Extension Loaded!");
}

if(document.readyState == 'complete') onLoad();
else window.addEventListener('load', onLoad);
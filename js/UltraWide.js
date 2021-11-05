"use-strict";

function addClass(c) {
	const v = document.getElementsByTagName('video');
	for(var i=0,l=v.length; i<l; i++) {
		if(v[i].className.indexOf(c) == -1) v[i].className += ' '+c;
		console.log("[UltraWide] addClass",v[i],c);
	}
}
function remClass(c) {
	const v = document.getElementsByTagName('video');
	for(var i=0,l=v.length; i<l; i++) {
		v[i].className = v[i].className.replace(c,'');
		console.log("[UltraWide] remClass",v[i],c);
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
	
	//Update classes:
	const fullscreen = document.webkitIsFullScreen;
	console.log("[UltraWide] Page Update", this.mode, this.scale, fullscreen);
	switch(this.mode) {
	case 0: //Disabled
		remClass('extraClassAspect');
		remClass('extraClassCrop');
	break; case 1: //Aspect
		if(fullscreen && this.scale > 1) {
			addClass('extraClassAspect');
		} else {
			remClass('extraClassCrop');
			remClass('extraClassAspect');
		}
	break; case 2: //Crop
		if(fullscreen && this.scale > 1) {
			addClass('extraClassCrop');
		} else {
			remClass('extraClassCrop');
			remClass('extraClassAspect');
		}
	break; case 3: //Force Crop
		addClass('extraClassCrop');
		remClass('extraClassAspect');
	break; case 4: //Force Aspect
		addClass('extraClassAspect');
		remClass('extraClassCrop');
	break;
	}
}

function UltraWide() {
	this.mode = 0;
	document.addEventListener('webkitfullscreenchange', function(e) {
		this.update();
	}.bind(this));
	document.addEventListener('keydown', function(e) {
		if( (e.ctrlKey && e.altKey && e.key == 'c')	// windows
			|| (e.ctrlKey && e.metaKey && e.key == 'c')	// mac
			) {
			if(++this.mode > 2) this.mode = 0;
			chrome.storage.local.set({'extensionMode':this.mode}, function(){});
		}
	}.bind(this));
	this.styles = document.createElement('style');
	document.body.appendChild(this.styles);
}

const ultrawide = new UltraWide();

window.onload = function() {
	chrome.storage.local.get('extensionMode', function(status) {
		ultrawide.mode = status.extensionMode;
		if(status.extensionMode != 0) ultrawide.update();
	});
	chrome.storage.onChanged.addListener(function(changes) {
		ultrawide.mode = changes.extensionMode.newValue;
		ultrawide.update();
	});
}
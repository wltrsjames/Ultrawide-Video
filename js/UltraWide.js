//page loads
$(document).ready(function() {


    var UltraWide = function()  {
        this.scale = undefined;
        this.fullscreen = false;
        this.mode = 0;

        this.setScale = function() {
            //get users screen dimensions
            var width = screen.width;
            var height = screen.height;

            //get aspet ratio
            var aspect = width/height;

            //16:9 = 1.77

            if(aspect >= 1.88) {
                var scale = aspect / 1.77;
                this.scale = Math.round(scale * 100) / 100;

            }else{
                this.scale = 1;
            }

        };

        this.fullscreenSet = function(cb) {
            setTimeout(function() {
                if (window.screenTop && window.screenY) {
                    ultraWide.fullscreen = true;
                }else{
                    ultraWide.fullscreen = false;
                }   
                ultraWide.classCheck();
            }, 100);
        };

        this.createCSS = function() {
            var sheet = document.createElement('style')
            sheet.setAttribute("id", "extraClass");
            sheet.innerHTML = 
                ".extraClassAspect {" +
                "-webkit-transform: scaleX("+this.scale+")!important;" +
                //"object-fit: inherit!important;
                "}" +
                ".extraClassCrop {" +
                "-webkit-transform: scale("+this.scale+")!important;" +
                //"object-fit: inherit!important;
                "}";
            document.body.appendChild(sheet);  
        };

        this.setMode = function(mode) {
            ultraWide.mode = mode;
            return mode;
        };

        this.classCheck = function() {
            //            console.log(ultraWide.scale, ultraWide.fullscreen);
            switch(ultraWide.mode) {
                    // 0: off; 1: aspect; 2: zoom;
                case 0:
                    $("video").removeClass("extraClassAspect");
                    $("video").removeClass("extraClassCrop");
                    break;
                case 1:
                    if(ultraWide.fullscreen && ultraWide.scale > 1) {
                        $("video").addClass("extraClassAspect");
                    }else{
                        $("video").removeClass("extraClassAspect");
                        $("video").removeClass("extraClassCrop");
                    }
                    break;
                case 2:
                    if(ultraWide.fullscreen && ultraWide.scale > 1) {
                        $("video").addClass("extraClassCrop");
                    }else{
                        $("video").removeClass("extraClassAspect");
                        $("video").removeClass("extraClassCrop");
                    }
                    break;
            }

        };
    };

    var ultraWide = new UltraWide();

    ultraWide.setScale();
    ultraWide.fullscreenSet();
    ultraWide.createCSS();

    chrome.storage.local.get("extensionMode",function (status){
        ultraWide.setMode(status.extensionMode);
    });


    initEvents(ultraWide);
    console.log(ultraWide.scale, ultraWide.fullscreen);


});

var initEvents = function(ultraWide) {

    $( window ).resize(function() {
        //        var iframe = $("iframe").load(function() {
        //            var doc = this.contentDocument || this.contentWindow.document;
        //            var target = doc.getElementsByTagName("video");
        //            console.log(target);
        //            target.className += "extraClass";
        //        });
        ultraWide.fullscreenSet();
        ultraWide.setScale();
    });

    $(document).on('keydown', null, 'alt+ctrl+c',function(event) {
        var state = 0;
        if(ultraWide.mode <= 1) {
            state = ultraWide.setMode(ultraWide.mode+1);
        }else{
            state = ultraWide.setMode(0);
        }

        chrome.storage.local.set({"extensionMode":state},function (){
        });


    });

    chrome.storage.onChanged.addListener(function(changes){
        ultraWide.setMode(changes.extensionMode.newValue);
        console.log(ultraWide.mode);
        ultraWide.classCheck();

    });
};
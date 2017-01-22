UltraWide.prototype.classCheck = function() {
    //    console.log(this.scale, this.fullscreen);
    switch(this.mode) {
            // 0: off; 1: aspect; 2: zoom;
        case 0:
            $("video").removeClass("extraClassAspect");
            $("video").removeClass("extraClassCrop");
            break;
        case 1:
            if(this.fullscreen && this.scale > 1) {
                $("video").addClass("extraClassAspect");
            }else{
                $("video").removeClass("extraClassCrop");
                $("video").removeClass("extraClassAspect");
            }
            break;
        case 2:
            if(this.fullscreen && this.scale > 1) {
                $("video").addClass("extraClassCrop");
            }else{
                $("video").removeClass("extraClassAspect");
                $("video").removeClass("extraClassCrop");
            }
            break;
        case 3:
            $("video").removeClass("extraClassAspect");
            $("video").addClass("extraClassCrop");
            break;
        case 4:
            $("video").addClass("extraClassAspect");
            $("video").removeClass("extraClassCrop");
            break;
    }

};


function UltraWide()  {
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

        }else if(this.mode == 3 || this.mode == 4) {
            this.scale = 1.33;
        }else {
            this.scale = 1;
        }

    };

    this.fullscreenSet = function(cb) {
        setTimeout((function() {
            if (document.webkitCurrentFullScreenElement != null) {
                this.fullscreen = true;
            }else{
                this.fullscreen = false;
            }   
            this.classCheck();
        }).bind(this), 100);
    };

    this.createCSS = function() {
        $('#extraClass').remove();

        var sheet = document.createElement('style')
        sheet.setAttribute("id", "extraClass");
        sheet.innerHTML = 
            ".extraClassAspect {" +
            "-webkit-transform: scaleX("+this.scale+")!important;" +
            //                "object-fit: fill!important;" +
            "}" +
            ".extraClassCrop {" +
            "-webkit-transform: scale("+this.scale+")!important;" +
            //                "object-fit: cover!important;" +
            "}";
        document.body.appendChild(sheet);  
    };

    this.setMode = function(mode) {
        this.mode = mode;
        return mode;
    };


};

var ultraWide = new UltraWide();

$(document).ready(function() {

    chrome.storage.local.get("extensionMode",function (status){
        ultraWide.setMode(status.extensionMode);
        ultraWide.setScale();
        ultraWide.fullscreenSet();
        ultraWide.createCSS();

        initEvents(ultraWide);
    });


});

var initEvents = function(ultraWide) {

    $( window ).resize(function() {
        ultraWide.setScale();
        ultraWide.fullscreenSet();
        ultraWide.createCSS();
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
        ultraWide.setScale();
        ultraWide.createCSS();
        ultraWide.classCheck();
    });
};

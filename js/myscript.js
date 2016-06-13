$(document).ready(function() {

    var isEnabled = -1;
    var timer = -1;

    //Check if url is Youtube
    function youtubeCheck() {
        if(window.location.href.indexOf("www.youtube.com") > 0) {
            return true;
        }else{
            return false;
        }
    }

    //add and remove class functionality
    function Class() {
        this.webClasses = {
            youtubeClass: ".video-stream.html5-main-video",
            netflixClass: ".player-video-wrapper div video"    
        }; 
    }

    var classes = new Class();

    Class.prototype.add = function() {
        $(classes.webClasses.youtubeClass).addClass("youtubeExtraClass");
        $(classes.webClasses.netflixClass).addClass("extraClass");
    };
    Class.prototype.remove = function() {
        $(classes.webClasses.youtubeClass).removeClass("youtubeExtraClass");
        $(classes.webClasses.netflixClass).removeClass("extraClass");
    };

    //Get current 'enabled' state from chrome
    function getData() {
        chrome.storage.local.get("extensionIsEnabled",function (status){
            isEnabled = status.extensionIsEnabled;
            initKeyboardEvent();
            initOnchangeEvent();
            if(youtubeCheck()) {
                forceYoutubeDefault(isEnabled);
            }else{
                if(isEnabled === true) {
                    classes.add();
                }else{
                    classes.remove();
                }
            }
        });
    }

    //Kotkey functionality
    function initKeyboardEvent() {
        $(document).on('keydown', null, 'alt+ctrl+c',function(event) {
            console.log(event);
            if(isEnabled === true) {
                chrome.storage.local.set({"extensionIsEnabled":false},function (){
                    isEnabled = false;
                });
            }else if(isEnabled === false){
                chrome.storage.local.set({"extensionIsEnabled":true},function (){
                    isEnabled = true;
                });
            }
        });
    }

    //Listen for 'enabled' state change
    function initOnchangeEvent() {
        chrome.storage.onChanged.addListener(function(changes, areaName){
            var isNowEnabled = changes.extensionIsEnabled.newValue;
            if(isNowEnabled === true) {
                if(youtubeCheck()) {
                    forceYoutubeDefault(isNowEnabled);
                }else{
                    classes.add();    
                }
            }else{
                if(youtubeCheck()) {
                    forceYoutubeDefault(isNowEnabled);
                }else{
                    classes.remove();    
                }
            }
        });
    }


    function intervalSet() {
        return setInterval(function(){
            if (document.webkitCurrentFullScreenElement != null) {
                classes.add();
            }else{
                classes.remove();   
            }
        }, 100);
    }

    function forceYoutubeDefault(isYoutubeEnabled) {
        if(isYoutubeEnabled) {
            timer = intervalSet();
        }else{
            clearInterval(timer);   
            classes.remove();
        }

    }

    getData();
});
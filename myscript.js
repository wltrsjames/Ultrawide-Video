$(document).ready(function() {
    var youtube = ".video-stream.html5-main-video";
    var netflix = ".player-video-wrapper div video";
    var originalStyle = undefined;
    var isEnabled = -1;
    var timer = undefined;

    function getData() {
        chrome.storage.local.get("extensionIsEnabled",function (status){
            isEnabled = status.extensionIsEnabled;
            initKeyboardEvent();
            initOnchangeEvent();
            if(youtubeCheck()) { //youtube check
                forceYoutubeDefault(isEnabled);
            }else{
                setData();
            }
        });
    }

    function youtubeCheck() {
        if(window.location.href.indexOf("www.youtube.com") > 0) { //youtube check
            return true;
        }else{
            return false;
        }
    }

    function setData() {
        if(isEnabled === true) {
            addClass();
        }else{
            removeClass();
        }
    }

    function addClass() {
        $(youtube).addClass("youtubeExtraClass");//youtube
        $(netflix).addClass("extraClass");//netflix
    }

    function removeClass() {
        $(youtube).removeClass("youtubeExtraClass");
        $(netflix).removeClass("extraClass");
    }

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

    function initOnchangeEvent() {
        chrome.storage.onChanged.addListener(function(changes, areaName){
            var isNowEnabled = changes.extensionIsEnabled.newValue;
            if(isNowEnabled === true) {
                if(youtubeCheck()) {
                    forceYoutubeDefault(isNowEnabled);
                }else{
                    addClass();    
                }
            }else{
                if(youtubeCheck()) {
                    forceYoutubeDefault(isNowEnabled);
                }else{
                    removeClass();    
                }
            }
        });
    }

    function fullScreenCheck() {
        if (document.webkitCurrentFullScreenElement != null) {
            addClass();
        }else{
            removeClass();   
        }
    }
    
    function forceStyle() {
//        $(youtube).attr("style", originalStyle);
    }

    function intervalSet() {
        return setInterval(function(){
                fullScreenCheck();
                forceStyle();
        }, 100);
    }

    function forceYoutubeDefault(isYoutubeEnabled) {
        if(isYoutubeEnabled) {
            timer = intervalSet();
        }else{
            clearInterval(timer);   
            removeClass();
        }

    }

    getData();
});
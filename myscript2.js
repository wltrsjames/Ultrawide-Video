$(document).ready(function() {

    var serviceArray = [".video-stream.html5-main-video", //Youtube
                        ".player-video-wrapper div video", //Netflix
                        ".webPlayerElement" //Amazon Prime
                       ];

    var data = "";
    var fullscreenState = false;

    $(window).bind("fullscreen-on", function(e) {
        fullscreenState = true;
        console.log("fullscreen: ",fullscreenState);
    });
    $(window).bind("fullscreen-off", function(e) {
        fullscreenState = false;
        console.log("fullscreen: ",fullscreenState);
    });

    chrome.storage.local.get("extensionIsEnabled",function (results){
        data = results.extensionIsEnabled;
        console.log("startup: ",data);
        classHandler(data);
    });  

    chrome.storage.onChanged.addListener(function(changes, areaName){
        var dataEvent = changes.extensionIsEnabled.newValue;
        console.log("onChange: ",dataEvent);
        classHandler(dataEvent);
    });

    $(document).on('keydown', null, 'alt+ctrl+f',function() {
        chrome.storage.local.get("extensionIsEnabled",function (results){
            var data = results.extensionIsEnabled;
            if(data == "true") {
                chrome.storage.local.set({"extensionIsEnabled":"false"},function (){
                });
            }else if(data == "false") {
                chrome.storage.local.set({"extensionIsEnabled":"true"},function (){
                });   
            }
        });
    });
    //    },1000);

    function classHandler(input) {
        //        var styleBeforeFS = $(youtube).attr("style");

        //        alert("on:"+input+ "fullscreen:"+fullscreenState);
        $.each(serviceArray,function(key, value) {
            if(key == 0) { // is youtube
                youtubeFunctionality(input);
            }else{
                everythingElse(input, key);
            }
        });

    }
    function youtubeFunctionality(input) {
        runFlag = false;
        if(fullscreenState == false) {
            if(input == "true") {                                //non-fullscreen on
                $(window).bind("fullscreen-on", function(e) {
                    serviceSelect(true);
                    fullscreenState = true;
                });
                $(window).bind("fullscreen-off", function(e) {
                    fullscreenState = false;
                    //                    $(youtube).attr("style",styleBeforeFS);
                    serviceSelect(false);
                });
                fullscreenState = false;
            }else{                                             //non-fullscreen off
                $(window).bind("fullscreen-on", function(e) {
                    //                    $(youtube).attr("style",styleBeforeFS);
                    serviceSelect(false);
                    fullscreenState = true;
                });
                $(window).bind("fullscreen-off", function(e) {
                    fullscreenState = false;
                });
                fullscreenState = false;
            }
        }else{ 
            if(input == "true") {                             //fullscreen on
                serviceSelect(true);
                fullscreenState = true;
            }else{                                            //fullscreen off
                serviceSelect(false);
                fullscreenState = true;
            }
        }

    }

    function everythingElse(addClass, key) {
        if(addClass == "true") {
            $(serviceArray[key]).addClass("extraClass");

            //            $(serviceArray[0]).attr("style","");
        }else{
            $(serviceArray[key]).removeClass("extraClass");
            //                    $(value).attr("style",orginalStyle);   
        } 
    }

    function serviceSelect(addClass) {
        if(addClass) {
            $(serviceArray[0]).addClass("extraClass");
            $(serviceArray[0]).attr("style","");
        }else{
            $(serviceArray[0]).removeClass("extraClass");
            //                    $(value).attr("style",orginalStyle);   
        } 
    }
});

$(document).ready(function() {
    $(document).on('webkitfullscreenchange mozfullscreenchange fullscreenchange', function(e)
{
    console.log(e);
});
    
    
    var youtube = ".video-stream.html5-main-video";
    var netflix = ".player-video-wrapper div video";
    var originalStyle = $(youtube).attr("style");
    setTimeout(function(){
        //Page Load
        chrome.storage.local.get("extensionIsEnabled",function (results){
            data = results.extensionIsEnabled;
            //console.log(data);

            if(data == "true") {
                $(youtube).addClass("extraClass");//youtube
                $(netflix).addClass("extraClass");//netflix

            }else{
                $(youtube).removeClass("extraClass");
                $(netflix).removeClass("extraClass");
            }
            //Data change
            chrome.storage.onChanged.addListener(function(changes, areaName){
                var dataEvent = changes.extensionIsEnabled.newValue;
                //console.log(dataEvent);
                if(dataEvent == "true") {
                    $(".video-stream.html5-main-video").addClass("extraClass");
                    $(".player-video-wrapper div video").addClass("extraClass");
                }else{
                    $(".video-stream.html5-main-video").removeClass("extraClass");    
                    $(".player-video-wrapper div video").removeClass("extraClass");
                }
            });
            //HotKey change data
            $(document).on('keydown', null, 'alt+ctrl+f',function() {
                chrome.storage.local.get("extensionIsEnabled",function (results){
                    var data = results.extensionIsEnabled;
                    if(data == "true") {
                        chrome.storage.local.set({"extensionIsEnabled":"false"},function (){
                            //console.log("Storage Succesful");
                        });
                    }else if(data == "false") {
                        chrome.storage.local.set({"extensionIsEnabled":"true"},function (){
                            //console.log("Storage Succesful");
                        });   
                    }
                });
            });
        });
    }, 1000);
    var data = "";
//    function runLoop() {

        /*window.setInterval(function(){
            /// call your function here
            if ($(youtube).css('position') == 'relative') {
                if(originalStyle.indexOf("position: relative !important") > 0) {
                    originalStyle = originalStyle.replace("position: relative !important","position: relative");
                }
                $(youtube).attr("style",originalStyle);
            }
            if($(youtube).css('top') == '0px' && $(youtube).css('top') != '50%') {
//                if(originalStyle.indexOf("top: 0px !important") > 0) {
                    originalStyle = originalStyle.replace("top: 0px !important","top: 0px");
//                }
                $(youtube).attr("style",originalStyle);
            }
        }, 100);*/

//    }
});
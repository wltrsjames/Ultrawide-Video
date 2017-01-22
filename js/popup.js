$(document).ready(function() {
    var isOn = -1;
    chrome.storage.local.get("extensionMode",function (results){
        var mode = results.extensionMode;
        switch(mode) {
                // 0: off; 1: aspect; 2: zoom;
            case 0:
                $("#off").prop("checked", true);
                break;
            case 1:
                $("#aspect").prop("checked", true);
                break;
            case 2:
                $("#crop").prop("checked", true);
                break;
            case 3:
                $("#forceCrop").prop("checked", true);
                break;
            case 4:
                $("#forceAspect").prop("checked", true);
                break;
        }
    });
    $("#off").click(function() {
        $("#aspect").prop("checked", false);
        $("#crop").prop("checked", false);
        $("#forceCrop").prop("checked", false);
        $("#forceAspect").prop("checked", false);
        chrome.storage.local.set({"extensionMode":0},function (){
        });
    });

    $("#aspect").click(function() {
        $("#off").prop("checked", false);
        $("#crop").prop("checked", false);
        $("#forceCrop").prop("checked", false);
        $("#forceAspect").prop("checked", false);
        chrome.storage.local.set({"extensionMode":1},function (){
        });
    });

    $("#crop").click(function() {
        $("#off").prop("checked", false);
        $("#aspect").prop("checked", false);
        $("#forceCrop").prop("checked", false);
        $("#forceAspect").prop("checked", false);
        chrome.storage.local.set({"extensionMode":2},function (){
        });
    });
    $("#forceCrop").click(function() {
        $("#off").prop("checked", false);
        $("#aspect").prop("checked", false);
        $("#crop").prop("checked", false);
        $("#forceAspect").prop("checked", false);
        chrome.storage.local.set({"extensionMode":3},function (){
        });
    });
    $("#forceAspect").click(function() {
        $("#off").prop("checked", false);
        $("#aspect").prop("checked", false);
        $("#crop").prop("checked", false);
        $("#forceCrop").prop("checked", false);
        chrome.storage.local.set({"extensionMode":4},function (){
        });
    });
});




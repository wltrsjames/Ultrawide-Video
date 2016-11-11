chrome.runtime.onInstalled.addListener(function (details) {
    var manifest = chrome.runtime.getManifest();
    var version = (manifest.version);
    if(details.reason == "update") {
        var newURL = "https://github.com/wltrsjames/Ultrawide-Video";
        chrome.tabs.create({ url: newURL });
    }
    chrome.storage.local.set({"extensionIsEnabled":false},function (){
        //console.log("Storage Succesful");
    }); 
});
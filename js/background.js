chrome.runtime.onInstalled.addListener(function (details) {
    var manifest = chrome.runtime.getManifest();
    var version = (manifest.version);
    if(details.reason == "update") {
        alert("Update log: Ultrawide Video is back! As of :"+version+" HBO GO has been added as a supported media player.");
    }
    chrome.storage.local.set({"extensionIsEnabled":false},function (){
        //console.log("Storage Succesful");
    }); 
});
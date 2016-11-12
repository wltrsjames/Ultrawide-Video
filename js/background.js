chrome.runtime.onInstalled.addListener(function (details) {
    var manifest = chrome.runtime.getManifest();
    var version = (manifest.version);
    if(details.reason == "update") {
        chrome.notifications.create(null, {
            type: "basic",
            iconUrl: "images/icon.png",
            title: "Ultrawide Video updated",
            message: "Update log: Ultrawide Video is back! As of version "+version+" HBO GO has been added as a supported media player.",
        }, function(updateNotificationId) {
            chrome.notifications.onClicked.addListener(function(notificationId) {
                if (notificationId === updateNotificationId) {
                    var newURL = "https://github.com/wltrsjames/Ultrawide-Video";
                    chrome.tabs.create({ url: newURL });
                    chrome.notifications.clear(updateNotificationId);
                }
            });
        });
    }
    chrome.storage.local.set({"extensionIsEnabled":false},function (){
        //console.log("Storage Succesful");
    }); 
});
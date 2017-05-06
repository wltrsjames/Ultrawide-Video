chrome.runtime.onInstalled.addListener(function(details) {
    var manifest = chrome.runtime.getManifest();
    var version = manifest.version;
    if (details.reason == 'update') {
        chrome.notifications.create(
            null,
            {
                type: 'basic',
                iconUrl: 'images/icon.png',
                title: 'Ultrawide Video updated',
                message: 'Update log: Version ' +
                    version +
                    ' added FORCE modes for 4:3 videos on 16:9 screens; Removed console logs; multiscreen stability',
            },
            function(updateNotificationId) {
                chrome.notifications.onClicked.addListener(function(
                    notificationId
                ) {
                    if (notificationId === updateNotificationId) {
                        var newURL =
                            'https://github.com/wltrsjames/Ultrawide-Video';
                        chrome.tabs.create({ url: newURL });
                        chrome.notifications.clear(updateNotificationId);
                    }
                });
            }
        );
    }
    chrome.storage.local.set({ extensionMode: 0 }, function() {});
});

chrome.runtime.onInstalled.addListener(function(details) {
	var ver = chrome.runtime.getManifest().version;
	if(details.reason == 'update') {
		chrome.notifications.create(null, {
			type:'basic',
			iconUrl:"images/icon.png",
			title:"Ultrawide Video updated",
			message:"Update log: Version "+ver+" added FORCE modes for 4:3 videos on 16:9 screens; Removed console logs; multiscreen stability",
		}, function(updateNotificationId) {
			chrome.notifications.onClicked.addListener(function(notificationId) {
				if(notificationId === updateNotificationId) {
					chrome.tabs.create({url:"https://github.com/wltrsjames/Ultrawide-Video"});
					chrome.notifications.clear(updateNotificationId);
				}
			});
		});
	}
	chrome.storage.local.set({'extensionMode':0}); 
});
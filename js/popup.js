$(document).ready(function() {
    var isOn = "";
     chrome.storage.local.get("extensionIsEnabled",function (results){
            isOn = results.extensionIsEnabled;
            if(isOn == true) {
                $("#enabledBx").prop('checked', true);
            }else{
                $("#enabledBx").prop('checked', false);   
            }
        });
    $("#enabledBx").click(function() {
        if($("#enabledBx").prop('checked')) {
            chrome.storage.local.set({"extensionIsEnabled":true},function (){
                //console.log("Storage Succesful");
            });
        }else{
            chrome.storage.local.set({"extensionIsEnabled":false},function (){
                //console.log("Storage Succesful");
            });
        }
        chrome.storage.local.get("extensionIsEnabled",function (results){
            //console.log(results);
        });
    });
});


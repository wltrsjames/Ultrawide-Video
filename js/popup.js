$(document).ready(function() {
    var isOn = -1;
    
    // Map mode names to mode index
    var modeMap = {
        disabled: 0,
        aspect: 1,
        crop: 2,

        // experimental
        forceCrop: 3,
        forceAspect: 4
    };

    // Get current active mode
    chrome.storage.local.get('extensionMode', function(results) {
        var currentMode = Object.keys(modeMap)[results.extensionMode];
        $('.mode-option').find('#' + currentMode).prop('checked', true);
    });

    // Set active mode
    $('.mode-option').click(function(e) {
        chrome.storage.local.set({
            'extensionMode': modeMap[e.target.id]
        });
    });
    
    // Toggle help and about
    $('.help-show').click(function (e) {
        e.preventDefault();
        $('#help').addClass('is-active');
    });
    
    $('.help-close').click(function (e) {
        e.preventDefault();
        $('#help').removeClass('is-active');
    });
    
    // Open attribution links
     $('.attribution a').click(function() {
       chrome.tabs.create({
           url: $(this).attr('href')
       });
       return false;
     });
});

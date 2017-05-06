(function(window, document, undefined, $) {
    var modes = {
        OFF: 0,
        ASPECT: 1,
        CROP: 2,
        FORCE_CROP: 3,
        FORCE_ASPECT: 4,
    };

    $(document).ready(function() {
        var $off = $('#off');
        var $aspect = $('#aspect');
        var $crop = $('#crop');
        var $forceCrop = $('#forceCrop');
        var $A = $('#forceAspect');

        chrome.storage.local.get('extensionMode', function(results) {
            var mode = results.extensionMode;
            switch (mode) {
                case modes.OFF:
                    $off.prop('checked', true);
                    break;
                case modes.ASPECT:
                    $aspect.prop('checked', true);
                    break;
                case modes.CROP:
                    $crop.prop('checked', true);
                    break;
                case modes.FORCE_CROP:
                    $forceCrop.prop('checked', true);
                    break;
                case modes.FORCE_ASPECT:
                    $forceAspect.prop('checked', true);
                    break;
            }
        });

        $off.click(function() {
            $aspect.prop('checked', false);
            $crop.prop('checked', false);
            $forceCrop.prop('checked', false);
            $forceAspect.prop('checked', false);
            chrome.storage.local.set(
                { extensionMode: modes.OFF },
                function() {}
            );
        });

        $aspect.click(function() {
            $off.prop('checked', false);
            $crop.prop('checked', false);
            $forceCrop.prop('checked', false);
            $forceAspect.prop('checked', false);
            chrome.storage.local.set(
                { extensionMode: modes.ASPECT },
                function() {}
            );
        });

        $crop.click(function() {
            $off.prop('checked', false);
            $aspect.prop('checked', false);
            $forceCrop.prop('checked', false);
            $forceAspect.prop('checked', false);
            chrome.storage.local.set(
                { extensionMode: modes.CROP },
                function() {}
            );
        });
        $forceCrop.click(function() {
            $off.prop('checked', false);
            $aspect.prop('checked', false);
            $crop.prop('checked', false);
            $forceAspect.prop('checked', false);
            chrome.storage.local.set(
                { extensionMode: modes.FORCE_CROP },
                function() {}
            );
        });
        $forceAspect.click(function() {
            $off.prop('checked', false);
            $aspect.prop('checked', false);
            $crop.prop('checked', false);
            $forceCrop.prop('checked', false);
            chrome.storage.local.set(
                { extensionMode: modes.FORCE_ASPECT },
                function() {}
            );
        });
    });
})(window, document, undefined, $);

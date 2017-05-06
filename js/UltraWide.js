(function(window, document, undefined, $) {
    var modes = {
        OFF: 0,
        ASPECT: 1,
        CROP: 2,
        FORCE_CROP: 3,
        FORCE_ASPECT: 4,
    };

    var Ultrawide = function() {
        this.scale = undefined;
        this.mode = modes.OFF;
        this.$video = $('video');
    };

    Ultrawide.prototype = function() {
        function isFullScreen() {
            document.webkitCurrentFullScreenElement !== null;
        }

        function setVideoElement() {
            this.$video = $('video');
        }

        function setScale() {
            // get users screen dimensions
            var width = screen.width;
            var height = screen.height;

            // get aspect ratio
            var aspect = width / height;

            // 16:9 = 1.77

            if (aspect >= 1.88) {
                this.scale = Math.round(aspect / 1.77 * 100) / 100;
            } else if (mode == modes.FORCE_CROP || mode == modes.FORCE_ASPECT) {
                this.scale = 1.33;
            } else {
                this.scale = 1;
            }
        }

        function createCSS() {
            $('#extraClass').remove();

            var sheet = document.createElement('style');
            sheet.setAttribute('id', 'extraClass');
            sheet.innerHTML =
                '.extraClassAspect {' +
                '-webkit-transform: scaleX(' +
                this.scale +
                ')!important;' +
                //                 "object-fit: fill!important;" +
                '}' +
                '.extraClassCrop {' +
                '-webkit-transform: scale(' +
                this.scale +
                ')!important;' +
                //                 "object-fit: cover!important;" +
                '}';
            document.body.appendChild(sheet);
        }

        function classCheck() {
            this.setVideoElement();
            // console.log(this.scale, this.isFullScreen());
            switch (mode) {
                case modes.OFF:
                    this.$video.removeClass('extraClassAspect');
                    this.$video.removeClass('extraClassCrop');
                    break;
                case modes.ASPECT:
                    if (this.isFullScreen() && this.scale > 1) {
                        this.$video.addClass('extraClassAspect');
                    } else {
                        this.$video.removeClass('extraClassCrop');
                        this.$video.removeClass('extraClassAspect');
                    }
                    break;
                case modes.CROP:
                    if (this.isFullScreen() && this.scale > 1) {
                        this.$video.addClass('extraClassCrop');
                    } else {
                        this.$video.removeClass('extraClassAspect');
                        this.$video.removeClass('extraClassCrop');
                    }
                    break;
                case modes.FORCE_CROP:
                    this.$video.removeClass('extraClassAspect');
                    this.$video.addClass('extraClassCrop');
                    break;
                case modes.FORCE_ASPECT:
                    this.$video.addClass('extraClassAspect');
                    this.$video.removeClass('extraClassCrop');
                    break;
            }
        }

        function incrementMode(newMode) {
            this.mode = (this.mode + 1) % 3;
            return this.mode;
        }

        function apply() {
            window.requestAnimationFrame(
                function() {
                    this.setScale();
                    this.createCSS();
                    this.classCheck();
                }.bind(this)
            );
        }

        return {
            setMode: setMode,
            apply: apply,
        };
    };

    var ultraWide = new UltraWide();

    $(document).ready(function() {
        chrome.storage.local.get('extensionMode', function(status) {
            ultraWide.setMode(status.extensionMode);
            ultraWide.apply();

            initEvents(ultraWide);
        });
    });

    var initEvents = function(ultraWide) {
        $(window).resize(function() {
            ultraWide.apply();
        });

        $(document).on('keydown', null, 'alt+ctrl+c', function(event) {
            var newMode = ultraWide.incrementMode();

            chrome.storage.local.set({ extensionMode: newMode }, function() {});
        });

        chrome.storage.onChanged.addListener(function(changes) {
            ultraWide.setMode(changes.extensionMode.newValue);
            ultraWide.apply();
        });
    };
})(window, document, undefined, $);

// Utilities Module

// Utilities contains useful, shared methods that appear
// throughout models, views, & panels

// Create module vars
let self, supportedEventTypes, isMobilePlatform, isIOSPlatform,
    isAndroidPlatform, androidVersion, iosVersion, transitionEvent,
    isTouchable, supportsTouchAndClick;

export default class Utilities {

    constructor () {
        // Preserve instance reference and enforce singleton
        if (typeof self === 'object') { return self; } else { self = this; }
    }

    // Use simple method to determine if running on mobile.
    //
    // 1) Compare userAgent strings against commonly known mobile values
    //    OR
    // 2) Touchable device AND
    //    The screenX,screenY value is 0,0 and the browser is full screen
    //
    isMobile = function () {
        if (typeof isMobilePlatform === 'undefined') {
            if (navigator.userAgent.match(
                /Android|BlackBerry|BB10; Touch|iPhone|iPad|iPod|Opera Mini|IEMobile/i) ||
                ('ontouchstart' in document.documentElement &&
                window.screenX && window.screenX === 0 &&
                window.screenWidth && window.screenAvailableWidth &&
                window.screenWidth === window.screenAvailableWidth)) {
                isMobilePlatform = true;
            } else {
                isMobilePlatform = false;
            }
        }
        return isMobilePlatform;
    };

    // Check for IOS Platform
    isIOS = function () {
        if (typeof isIOSPlatform === 'undefined') {
            if (navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
               /* iPad OS 13 */
               (navigator.platform === 'MacIntel' &&
                navigator.maxTouchPoints > 1)) {
                isIOSPlatform = true;
            } else {
                isIOSPlatform = false;
            }
        }
        return isIOSPlatform;
    };

    // Check for Android Platform
    isAndroid = function () {
        if (typeof isAndroidPlatform === 'undefined') {
            if (navigator.userAgent.match(/Android/i)) {
                isAndroidPlatform = true;
            } else {
                isAndroidPlatform = false;
            }
        }
        return isAndroidPlatform;
    };

    // Get Android version
    getAndroidVersion = function () {
        if (typeof androidVersion === 'undefined') {
            var match = navigator.userAgent.match(/Android\s([0-9\.]*)/);
            androidVersion = match ? match[1] : '';
        }
        return androidVersion;
    };

    // Get the IOS version
    getIOSVersion = function () {
        if (typeof iosVersion === 'undefined') {
            iosVersion = parseFloat(('' +
                (/CPU.*OS ([0-9_]{1,5})|(CPU like).*AppleWebKit.*Mobile/i
                .exec(navigator.userAgent) || [0,''])[1])
                .replace('undefined', '3_2').replace('_', '.')
                .replace('_', '')) || false;
        }
        return iosVersion;
    };

    // Get transition event for this platform
    getTransitionEvent () {
        if (transitionEvent === undefined) {
            var el = document.createElement('div');
            var transitions = {
                'transition'       :'transitionend',
                'WebkitTransition' :'webkitTransitionEnd',
                'MozTransition'    :'transitionend',
                'mSTransition'     :'msTransitionEnd',
                'OTransition'      :'oTransitionEnd'
            };
            for (var t in transitions) {
                if (el.style[t] !== undefined ) {
                    transitionEvent = transitions[t];
                    break;
                }
            }
        }
        return transitionEvent;
    };

    // Determine if device is touch enabled
    isTouchable = function () {

        // Only do the check once per session
        if (typeof isTouchable === 'undefined') {
            // Check for touch enabled device
            isTouchable = false;
            if ('ontouchstart' in window ||
                (window.DocumentTouch && document instanceof DocumentTouch)) {
                isTouchable = true;
            }
        }
        return isTouchable;
    };

    // Get the supported event types for this device
    getSupportedEventTypes () {

        // Determine supported event types, if not yet determined
        if (typeof supportedEventTypes === 'undefined') {

            // Initialize an array of supported event types
            supportedEventTypes = [];

            // Check for touchable devices (mobile or desktop)
            if (this.isTouchable()) {
                supportedEventTypes.push('ontouchstart');
                supportedEventTypes.push('ontouchend');
            }

            // Check for clickable devices
            if ('onclick' in document.documentElement) {
                supportedEventTypes.push('onclick');
            }

            // Check if device supports both touch and click
            if (supportedEventTypes.length > 2) {
                supportsTouchAndClick = true;
            }
        }

        // Return complete set of supported event types for device
        return supportedEventTypes;
    };

    // Add click or touch listeners based on device
    addEventListeners (element, callback) {
        // Callback handling
        var touchStartX,
            touchStartY,
            touched = false,
            delta;

        // Callback function when click or touch events are fired
        var eventHandler = function (event) {

            // Handle touch or click events
            switch (event.type) {

                case 'touchstart':
                    // Capture coordinates of where touch started
                    var touch = event.touches[0] || event.changedTouches[0];
                    touchStartX = touch.pageX;
                    touchStartY = touch.pageY;
                    break;

                case 'touchend':
                    // Capture coordinates of where touch ended
                    var touchEnd = event.touches[0] || event.changedTouches[0];

                    // Get the delta between start and end
                    delta = Math.abs(touchStartX - touchEnd.pageX) +
                            Math.abs(touchStartY - touchEnd.pageY);

                    // If the delta is within tolerance, consider it a click
                    if (delta <= 20) {

                        // Consume ghost clicks
                        if (supportsTouchAndClick) {
                            // Stop further handling of this event
                            event.preventDefault();

                            // Mark touched & reset after possible ghost click
                            touched = true;
                            setTimeout(function () {
                                touched = false;
                            }, 500);
                        }

                        // Event complete
                        callback(event);
                    }
                    break;

                case 'click':
                    // Call the callback
                    if (callback && !touched) {
                        callback(event);
                    }
                    break;
            }
        };

        // Assign listeners for supported events, click/touchstart/touchend
        if (typeof element != 'undefined') {

            // Get supported event types for this device
            if (typeof supportedEventTypes === 'undefined') {
                supportedEventTypes = this.getSupportedEventTypes();
            }

            // Assign event handler for each supported event type
            var eventTypesLength = supportedEventTypes.length;
            for (var i=0; i<eventTypesLength; i++) {
                element[supportedEventTypes[i]] = eventHandler;
            }
        }
    };
}

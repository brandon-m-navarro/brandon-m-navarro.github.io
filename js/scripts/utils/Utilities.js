"use strict";

let isTouchable,
  supportedEventTypes,
  supportsTouchAndClick = false,
  transitionEvent,
  isMobilePlatform = false;

// Determine if device is touch enabled
export function isTouchableFunc() {
  // Only do the check once per session
  if (typeof isTouchable === "undefined") {
    // Check for touch enabled device
    isTouchable = false;
    if (
      "ontouchstart" in window ||
      (window.DocumentTouch && document instanceof DocumentTouch)
    ) {
      isTouchable = true;
    }
  }
  return isTouchable;
}

// Get the supported event types for this device
export function getSupportedEventTypes() {
  // Determine supported event types, if not yet determined
  if (typeof supportedEventTypes === "undefined") {
    // Initialize an array of supported event types
    supportedEventTypes = [];

    // Check for touchable devices (mobile or desktop)
    if (isTouchable || isTouchableFunc()) {
      supportedEventTypes.push("ontouchstart");
      supportedEventTypes.push("ontouchend");
    }

    // Check for clickable devices
    if ("onclick" in document.documentElement) {
      supportedEventTypes.push("onclick");
    }

    // Check if device supports both touch and click
    if (supportedEventTypes.length > 2) {
      supportsTouchAndClick = true;
    }
  }

  // Return complete set of supported event types for device
  return supportedEventTypes;
}

// Ensure the specified function is only ran every 'ms' milliseconds
// (default is 150ms if not specified)
export function debounce(fn, ms = 150) {
  let timeoutId;
  return function () {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this), ms);
  };
}

// Copy the provided text to the users clipboard, shows errors in console
export async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Text copied to clipboard");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}

// Get transition event for this platform
export function getTransitionEvent() {
  if (transitionEvent === undefined) {
    var el = document.createElement("div");
    var transitions = {
      transition: "transitionend",
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      mSTransition: "msTransitionEnd",
      OTransition: "oTransitionEnd",
    };
    for (var t in transitions) {
      if (el.style[t] !== undefined) {
        transitionEvent = transitions[t];
        break;
      }
    }
  }
  return transitionEvent;
}

export function lineToAngle(x1, y1, length, radians) {
  let x2 = x1 + length * Math.cos(radians),
    y2 = y1 + length * Math.sin(radians);
  return { x: x2, y: y2 };
}

export function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

export function degreesToRads(degrees) {
  return (degrees / 180) * Math.PI;
}

// Add click or touch listeners based on device
export function addEventListeners(element, callback) {
  // Callback handling
  var touchStartX,
    touchStartY,
    touched = false,
    delta;

  // Callback function when click or touch events are fired
  var eventHandler = function (event) {
    // Handle touch or click events
    switch (event.type) {
      case "touchstart":
        // Capture coordinates of where touch started
        var touch = event.touches[0] || event.changedTouches[0];
        touchStartX = touch.pageX;
        touchStartY = touch.pageY;
        break;

      case "touchend":
        // Capture coordinates of where touch ended
        var touchEnd = event.touches[0] || event.changedTouches[0];

        // Get the delta between start and end
        delta =
          Math.abs(touchStartX - touchEnd.pageX) +
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

      case "click":
        // Call the callback
        if (callback && !touched) {
          callback(event);
        }
        break;
    }
  };

  // Assign listeners for supported events, click/touchstart/touchend
  if (typeof element != "undefined") {
    // Get supported event types for this device
    if (typeof supportedEventTypes === "undefined") {
      supportedEventTypes = getSupportedEventTypes();
    }

    // Assign event handler for each supported event type
    var eventTypesLength = supportedEventTypes.length;
    for (var i = 0; i < eventTypesLength; i++) {
      element[supportedEventTypes[i]] = eventHandler;
    }
  }
}

// Use simple method to determine if running on mobile.
//
// 1) Compare userAgent strings against commonly known mobile values
//    OR
// 2) Touchable device AND
//    The screenX,screenY value is 0,0 and the browser is full screen
//
export function isMobile() {
  if (typeof isMobilePlatform === "undefined") {
    if (
      navigator.userAgent.match(
        /Android|BlackBerry|BB10; Touch|iPhone|iPad|iPod|Opera Mini|IEMobile/i
      ) ||
      ("ontouchstart" in document.documentElement &&
        window.screenX &&
        window.screenX === 0 &&
        window.screenWidth &&
        window.screenAvailableWidth &&
        window.screenWidth === window.screenAvailableWidth)
    ) {
      isMobilePlatform = true;
    } else {
      isMobilePlatform = false;
    }
  }
  return isMobilePlatform;
}

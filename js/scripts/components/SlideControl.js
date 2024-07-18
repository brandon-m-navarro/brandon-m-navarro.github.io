// SlideControl Module

// A slide control will take advantage of css transitions to open/close a
// container div by having it slide open/closed in the specified direction.
// Several options are available to further specify the control.  Only the
// component to slide is required.  All other options have logical defaults.

// Dependency: Utilities.js

// Public API
//
// # Constructor:
// SlideControl(options)
// @param options {
//      component:  element (required, must be a div element);
//      direction:  SlideControl.RIGHT|LEFT|UP|DOWN; (default RIGHT)
//      distance:   n%|npx (default 100%)
//      timing:     transform timing function name (default 'ease-out')
//      duration:   duration of the animation (default '0.3s')
// }
//
// # Open slide control, with optional callback upon completion
// SlideControl.open([callback])
//
// # Close slide control, with optional callback upon completion
// SlideControl.close([callback])
//
// # Return true if the control is open (or opening), false otherwise
// SlideControl.isOpen()
//
// # Update direction of slide control (SlideControl.direction.LEFT|RIGHT|UP|DOWN)
// SlideControl.setDirection(direction)
//
// # Update distance the slide control should slide in px or %
// SlideControl.setDistance(distance)
//
// # Update timing function of slide control (any css transition function)
// SlideControl.setTiming(timing)
//
// # Update duration of slide control in milliseconds, e.g. '300ms'
// SlideControl.setDuration(duration)
//
//
// # Get the slide control container div
// SlideControl.getDiv()

// Additional Info

// If specified, the slide distance must be in either px or percentage.  The
// default is 100%, however it is 100% of the screen size.  This typically is
// only useful for horizontal slides.  Vertical slides often need to provide
// a calculated height of the component itself, instead of the screen size.

// LEFT     100% (default)
// RIGHT    100% (default)
// UP       (utilities.getWindowHeight() - logoDiv.clientHeight) + 'px'
// DOWN     (utilities.getOrphanHeight(element) + logoDiv.clientHeight) + 'px'

// The open()/close() methods can optionally accept a callback method to call
// when the transition is complete.

define(function (require) {
    'use strict';

    let // Require.js module dependencies
        Utilities = require('Utilities'),

        // Instance vars
        utilities = new Utilities(),

        // Performance instrumentation vars
        performance = false,
        performanceTag,
        beginTime;

    // Constructor
    return class SlideControl {

        constructor (slideOptions) {

            // Initialize Control Options
            this.options = slideOptions || {};

            // Default Options
            this.defaultOptions = {
                component:  undefined,
                direction:  SlideControl.getDirections().LEFT,
                distance:   '100%',
                timing:     'ease-out',
                duration:   '300ms',
            };

            // Make sure the parameter is not null as component is required
            if (!slideOptions) {
                throw 'Invalid SlideControl options - ' + slideOptions;
            }

            // Validate specified component (required) and set options
            if (slideOptions.component &&
                slideOptions.component.tagName.toLowerCase() == 'div') {
                this.options.component = slideOptions.component;
            } else {
                throw 'Invalid SlideControl component (div element) - ' +
                    slideOptions.component.tagName;
            }

            // Track slider open status
            this.isSliderOpen = false;

            // Set slider options with defaults or overrides passed in
            this.setDirection(slideOptions.direction);
            this.setDistance(slideOptions.distance);
            this.setTiming(slideOptions.timing);
            this.setDuration(slideOptions.duration);

            // Define classes used for dynamic styling
            this.slideControlClass = 'slide-control';
            this.slideControlTransitionClass = 'slide-control-transition';
            this.closedClass = 'open-' + this.options.direction;

            // Create container and component html elements
            this.container = document.createElement('div');
            this.container.appendChild(this.options.component);

            // Set styles
            this.setComponentStyle();
            this.setContainerStyle();

            // Get the transition event for this platform
            this.transitionEvent = utilities.getTransitionEvent();

            // Add transition and single listener
            this.container.addEventListener(this.transitionEvent, (event) => {

                // Done with transition so callback
                event = event || window.event;

                if (event.target == this.container && this.sliderCallback) {

                    event.stopPropagation();
                    this.sliderCallback();
                }
            });
        }

        // Fire slide control event
        fireEvent (eventName) {

            // Instantiate event
            let slideControlEvent = new CustomEvent(eventName, {
                    detail: {},
                    bubbles: false,
                    cancelable: false
                });

            // Dispatch
            this.container.dispatchEvent(slideControlEvent);
        }

        // Slide element open, optional callback when complete
        open (callback) {
            if (this.isSliderOpen) {

                // Already open
                if (callback) {
                    callback();
                }
            } else {

                // Open the slider
                this.sliderCallback = callback;
                this.container.classList.remove(this.closedClass);
                this.isSliderOpen = true;
            }

            // Let any listeners know
            this.fireEvent('sliderOpened');
        };

        // Slide element closed, optional callback when complete
        close (callback) {
            if (this.isSliderOpen) {

                // Close the slider
                this.sliderCallback = callback;
                this.container.classList.add(this.closedClass);
                this.isSliderOpen = false;
            } else {
                // Already closed
                if (callback) {
                    callback();
                }
            }

            // Let any listeners know
            this.fireEvent('sliderClosed');
        };

        // Get the state of the slider
        isOpen () {
            return this.isSliderOpen;
        };

        // Set slide direction for control
        setDirection (direction) {

            // Set default
            let validDirection = this.defaultOptions.direction;

            // Validate direction, if specified
            if (direction != null && typeof direction !== 'undefined') {

                // Check the specified direction against valid directions
                let matched = false;
                for (let value in SlideControl.getDirections()) {
                    if (direction == SlideControl.getDirections()[value]) {
                        matched = true;
                        validDirection = direction;
                        break;
                    }
                }
                // Issue warning if not found and just use default
                if (!matched) {
                    console.warn(
                        'WARN: Invalid SlideControl direction - ' + direction
                    );
                }
            }
            // Set a valid direction or take the default
            this.options.direction = validDirection;
        };

        // Set slide distance for control
        setDistance (distance) {

            // Set default
            let validDistance = this.defaultOptions.distance;

            // Validate slide distance, if specified
            if (distance != null && typeof distance !== 'undefined') {
                distance += '';  // Make sure it's a string
                let amountRegex = /^[-]?[0-9]+(px|%)$/;
                if (distance.match(amountRegex) == null) {
                    console.log('WARN: Invalid SlideControl distance - ' + distance);
                } else {

                    // Warning message for vertical slides controls with % distance
                    if (distance.indexOf('%') > 0 && (
                        this.options.direction == SlideControl.getDirections().UP ||
                        this.options.direction == SlideControl.getDirections().DOWN)) {
                        console.warn(
                            'WARN: Use px for best results with UP or DOWN ' +
                            'slide controls'
                        );
                    }

                    // Specified distance is valid
                    validDistance = distance;
                }
            }

            // Set a valid distance or take the default
            this.options.distance = validDistance;
        };

        // Set timing function for slide control
        setTiming (timing) {

            // Set default
            let validTiming = this.defaultOptions.timing;

            // Validate timing function, if specified
            if (timing != null && typeof timing !== 'undefined') {
                let timingFunctions = [
                    'ease',
                    'ease-in',
                    'ease-out',
                    'ease-in-out',
                    'linear'
                ];

                // Timing is valid if it's in the list or starts with cubic-bezier
                if (timing.indexOf(timingFunctions) >= 0 ||
                    timing.indexOf('cubic-bezier') >= 0) {
                    validTiming = timing;
                } else {
                    console.warn(
                        'WARN: Invalid SlideControl timing function - ' +
                        timing
                    );
                }
            }

            // Set a valid timing function for the slide control or the default
            this.options.timing = validTiming;
        };

        // Set duration for slide control
        setDuration (duration) {

            // Set default
            let validDuration = this.defaultOptions.duration;

            // Validate duration, if specified
            if (duration && duration != validDuration) {

                // Convert to millis
                let number = parseFloat(duration, 10),
                    unit = duration.match(/m?s/);
                if (unit) {
                    unit = unit[0];
                }
                switch (unit) {
                    case 's':
                        validDuration = (number * 1000) + 'ms';
                        break;
                    case 'ms':
                        validDuration = number + 'ms';
                        break;
                    default:
                        console.log('WARN: Invalid duration - ' + duration);
                        break;
                }
            }
            // Set a valid duration for the control or take the default
            this.options.duration = validDuration;
        };

        // Set the style rule for the component
        setComponentStyle () {
            if (this.options.distance != this.defaultOptions.distance) {
                this.options.component.style.width = this.options.distance;
            }
        };

        // Set the style rules for the container
        setContainerStyle () {

            // Set inline style overrides if not default
            if (this.options.duration != this.defaultOptions.duration) {
                this.container.style.transitionDuration =
                    this.options.duration;
            }
            if (this.options.timing != this.defaultOptions.timing) {
                this.container.style.transitionTimingFunction =
                    this.options.timing;
            }

            // Set default styles
            this.container.classList.add(this.slideControlClass);
            this.container.classList.add(this.slideControlTransitionClass);
            this.container.classList.add(this.closedClass);
        };

        // Hide the slider
        hide () {
            this.container.style.display = 'none';
        };

        // Show the slider
        show () {
            this.container.style.display = 'block';
        };

        // Get the container div
        getDiv () {
            return this.container;
        };

        // Static constants

        // Class static to define the direction the slider opens
        static getDirections () {
            return Object.freeze({
                LEFT:  'left',
                RIGHT: 'right',
                UP:    'up',
                DOWN:  'down'
            });
        }
    }
});

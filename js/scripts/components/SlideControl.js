// SlideControl Module
//
// SlideControl is a component that allows sliding a div element in a specified
// direction (left, right, up, or down) with a transition effect. It can be
// used to create sliding menus, panels, or any other UI element that requires
// sliding functionality. The component can be opened or closed with a smooth
// animation, and it supports custom timing functions and durations for the
// transitions. The component also provides methods to check if the slider is
// open or closed, and to set the direction, timing, and duration of the slide
// control. It emits events when the slider is opened or closed, allowing
// other components to react to these changes.
//
// Public API
//
// @param {} options -
//      component:  element (required, must be a div element);
//      direction:  SlideControl.RIGHT|LEFT|UP|DOWN; (default RIGHT)
//      timing:     transform timing function name (default 'ease-out')
//      duration:   duration of the animation (default '0.3s')
// }
//
'use strict';
import BaseComponent from '../BaseComponent.js';
import { getTransitionEvent } from '../utils/Utilities.js';

// Constructor
export default class SlideControl extends BaseComponent {

    // Constructor
    constructor (slideOptions) {

        super();

        // Initialize SlideControl Options
        this.options = slideOptions || {};

        // Default Options
        this.defaultOptions = {
            component:  undefined,
            direction:  SlideControl.getDirections().LEFT,
            timing:     'ease-out',
            duration:   '300ms',
        };

        // Make sure the parameter is not null as component is required
        if (!slideOptions) {
            throw new Error('Invalid SlideControl options - ' + slideOptions);
        }

        // Validate specified component (required) and set options
        if (slideOptions.component &&
            slideOptions.component.tagName.toLowerCase() == 'div') {
            this.options.component = slideOptions.component;
        } else {
            throw new Error(
                'Invalid SlideControl component (div element) - ' +
                slideOptions.component.tagName
            );
        }

        // Track slider open status
        this.isSliderOpen = false;

        // Set slider options with defaults or overrides passed in
        this.setDirection(slideOptions.direction);
        this.setTiming(slideOptions.timing);
        this.setDuration(slideOptions.duration);

        // Define classes used for dynamic styling
        this.slideControlClass = 'slide-control';
        this.slideControlTransitionClass = 'slide-control-transition';
        this.closedClass = 'open-' + this.options.direction;

        // Create container and component html elements
        this.div.appendChild(this.options.component);

        // Set styles
        this.setComponentStyle();
        this.setContainerStyle();

        // Get the transition event for this platform
        this.transitionEvent = getTransitionEvent();

        // Add transition and single listener
        this.div.addEventListener(this.transitionEvent, (event) => {

            // Done with transition so callback
            event = event || window.event;

            if (event.target == this.div && this.sliderCallback) {

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
        this.div.dispatchEvent(slideControlEvent);
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
            this.div.classList.remove(this.closedClass);
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
            this.div.classList.add(this.closedClass);
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
                    console.warn('WARN: Invalid duration - ' + duration);
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
            this.div.style.transitionDuration =
                this.options.duration;
        }
        if (this.options.timing != this.defaultOptions.timing) {
            this.div.style.transitionTimingFunction =
                this.options.timing;
        }

        // Set default styles
        this.div.classList.add(this.slideControlClass);
        this.div.classList.add(this.slideControlTransitionClass);
        this.div.classList.add(this.closedClass);
    };

    // Hide the slider
    hide () {
        this.div.style.display = 'none';
    };

    // Show the slider
    show () {
        this.div.style.display = 'block';
    };

    // Get the container div
    getDiv () {
        return this.div;
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

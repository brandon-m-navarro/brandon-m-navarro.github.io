// BaseView Module

// BaseView is the superclass for all Views and defines default interface
// methods and managed properties.

define(function (require) {
    'use strict';

    // Class
    return class BaseView {

        // Constructor
        constructor (options) {

            // Set the name of the view
            this.name = this.constructor.name;

            // Create top-level div for view
            this.div = document.createElement('div');

            // Set the common CSS classname to add/remove and show/hide elements
            this.showElementClass = 'show-element';

            // Set the initialization status
            this.initialized = false;
        }

        // Initialize view, assemble UI elements, etc.
        initialize () {
            this.initialized = true;
        };

        // Get the initialization status
        isInitialized () {
            return this.initialized;
        };

        // Update view bounds within container
        updateBounds () {};

        // Reset view UI components
        reset () {};

        // Show view, i.e. make it visible
        show () {
            this.div.classList.add(this.showElementClass);
        };

        // Hide view, i.e. make it invisible
        hide () {
            this.div.classList.remove(this.showElementClass);
        };

        // Get name of the view
        getName () {
            return this.name;
        };

        // Get the main div container for this view
        getDiv () {
            return this.div;
        };
    }
});

module.exports = BaseView;
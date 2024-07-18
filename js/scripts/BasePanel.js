// BasePanel Module

// BasePanel is the superclass for all Panels and defines default interface
// methods and managed properties.

// Class
export default class BasePanel {

    // Constructor
    constructor () {

        // Set the name of the panel
        this.name = this.constructor.name;

        // Create top-level div for panel
        this.div = document.createElement('div');

        // Set the common CSS classname to add/remove and show/hide elements
        this.showElementClass = 'show-element';

        // Set the initialization status
        this.initialized = false;
    }

    // Initialize panel, assemble UI elements, etc.
    initialize () {
        this.initialized = true;
    };

    // Get the initialization status
    isInitialized () {
        return this.initialized;
    };

    // Reset panel UI components
    reset () {};

    // Show panel, i.e. make it visible
    show () {
        this.div.classList.add(this.showElementClass);
    };

    // Hide panel, i.e. make it invisible
    hide () {
        this.div.classList.remove(this.showElementClass);
    };

    // Return true if the panel is visible
    isShowing () {
        return this.div.classList.contains(this.showElementClass);
    };

    // Get name of the panel
    getName () {
        return this.name;
    };

    // Get the main div container for this panel
    getDiv () {
        return this.div;
    };
}

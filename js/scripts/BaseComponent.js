// BaseComponent Module

// BaseComponent is the superclass for all Panels and defines default interface
// methods and managed properties.

// Class
export default class BaseComponent {

    // Constructor
    constructor () {

        // Set the name of the component
        this.name = this.constructor.name;

        // Create top-level div for component
        this.div = document.createElement('div');

        // Set the common CSS classname to add/remove and show/hide elements
        this.showElementClass = 'show-element';

        // Set the initialization status
        this.initialized = false;
    }

    // Initialize component, assemble UI elements, etc.
    initialize () {
        this.initialized = true;
    };

    // Get the initialization status
    isInitialized () {
        return this.initialized;
    };

    // Reset component UI components
    reset () {};

    // Show component, i.e. make it visible
    show () {
        this.div.classList.add(this.showElementClass);
    };

    // Hide component, i.e. make it invisible
    hide () {
        this.div.classList.remove(this.showElementClass);
    };

    // Return true if the component is visible
    isShowing () {
        return this.div.classList.contains(this.showElementClass);
    };

    // Get name of the component
    getName () {
        return this.name;
    };

    // Get the main div container for this component
    getDiv () {
        return this.div;
    };
}

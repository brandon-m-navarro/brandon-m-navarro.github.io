/**
 * BaseView.js
 *
 * The BaseView class is designed to be extended by other
 * views, providing a consistent interface and common methods
 * for managing the view's lifecycle and visibility.
 *
 * Usage:
 *   class MyView extends BaseView {
 *       constructor() {
 *           super();
 *           // Additional initialization for MyView
 *       }
 *
 *       initialize() {
 *           super.initialize();
 *           // Additional initialization logic for MyView
 *       }
 *   }
 */

// Class
export default class BaseView {

    // Constructor
    constructor () {

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

    // Constants

    // Navigation Direction
    static getNavigationDirection () {
        return Object.freeze({
            LEFT: 0,
            RIGHT: 1,
            UP: 2,
            DOWN: 3
        });
    };

    // Navigation Text
    static getNavigationText () {
        return Object.freeze({
            CANCEL: 'CANCEL',
            BACK: 'BACK'
        });
    };
}

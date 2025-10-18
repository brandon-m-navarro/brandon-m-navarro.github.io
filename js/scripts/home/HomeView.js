/**
 * HomeView.js
 *
 * HomeView displays the home panel, which contains various
 * components and information about the application.
 * It extends the BaseView class and provides methods
 * for managing the home view's lifecycle and interactions.
 *
 */
'use strict';

// Import dependent modules
import HomePanel from "./panels/HomePanel.js";
import BaseView from '../BaseView.js';

// Create view variables
let doc = window.document,
    defaultBaseSelector = 'home-view',
    self;


// Class
export default class HomeView extends BaseView {

    // Constructor
    constructor(options) {

        // Preserve instance reference and enforce singleton
        if (typeof self === 'object') {
            return self;
        } else {
            super();
            self = this;
        }

        // Override options
        this.options = options || {};
        this.baseSelector = 'baseSelector' in this.options ?
            this.options.baseSelector : defaultBaseSelector;

        // Initialize panels
        this.homePanel = new HomePanel();

        // Title
        this.titleDiv = doc.createElement('div');
        this.titleTextDiv = doc.createElement('div');
        this.titleTextDiv.innerHTML = 'HomeView';
        this.titleLineDiv = doc.createElement('div');
        this.titleDiv.appendChild(this.titleTextDiv);
        this.titleDiv.appendChild(this.titleLineDiv);

        // Container for panels

        // Assemble
        this.frameDiv = doc.createElement('div');
        // this.frameDiv.appendChild(this.titleDiv);
        this.frameDiv.appendChild(this.homePanel.getDiv());
        this.div.appendChild(this.frameDiv);

        // Set DOM IDs
        this.div.setAttribute('id',      this.baseSelector + '-div');
        this.frameDiv.setAttribute('id', this.baseSelector + '-frame-div');
        this.titleDiv.setAttribute('id', this.baseSelector + '-title-div');
    };


    // Instance Methods

    // Fire event
    fireEvent (action, target) {
        this.div.dispatchEvent(new CustomEvent('homeEvent', {
            detail: {
                action: action,
                target: target
            },
            bubbles: false,
            cancelable: false
        }));
    };
};

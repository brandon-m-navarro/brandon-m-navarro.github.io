// ResumeView Module extends BaseView
//
// DESCRIPTION:
//
// ResumeView displays my resume via ResumePanel.
//

import ResumePanel from "./panels/ResumePanel.js";

import BaseView from '../BaseView.js';


let
    // DOM elements
    doc = window.document,

    // Base CSS selector
    defaultBaseSelector = 'resume-view',

    // Singleton reference
    self;


// Class
export default class ResumeView extends BaseView {

    // Constructor
    constructor(options) {

        // BOILER PLATE: Preserve instance reference and enforce singleton
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
        this.resumePanel = new ResumePanel();
        this.resumePanel.initialize();
        this.resumePanel.show();

        // Title
        this.titleDiv = doc.createElement('div');
        this.titleTextDiv = doc.createElement('div');
        // this.titleTextDiv.innerHTML = 'ResumeView!';
        this.titleLineDiv = doc.createElement('div');
        this.titleDiv.appendChild(this.titleTextDiv);
        this.titleDiv.appendChild(this.titleLineDiv);

        // Container for panels

        // Assemble
        this.frameDiv = doc.createElement('div');
        this.frameDiv.appendChild(this.titleDiv);
        this.frameDiv.appendChild(this.resumePanel.getDiv());
        this.div.appendChild(this.frameDiv);

        // Set DOM IDs
        this.div.setAttribute('id',      this.baseSelector + '-div');
        this.frameDiv.setAttribute('id', this.baseSelector + '-frame-div');
        this.titleDiv.setAttribute('id', this.baseSelector + '-title-div');
    };


    // Instance Methods

    // Fire event
    fireEvent (action, target) {
        this.div.dispatchEvent(new CustomEvent('resumeEvent', {
            detail: {
                action: action,
                target: target
            },
            bubbles: false,
            cancelable: false
        }));
    };

    // Set initial contents when this view is displayed
    setInitialView () {
        // Setup navigation button
        this.setNavigationButtons({
            leftButton: BaseView.getNavigationText().BACK
        });
    };

    // Set specified navigation buttons
    setNavigationButtons (options) {
        // Update navigation buttons
        doc.body.dispatchEvent(new CustomEvent('navigationButtonEvent', {
            detail: options,
            bubbles: false,
            cancelable: false
        }));
    };

    // Dynamically add remaining artifacts
    initialize() {

        // Complete with initialization
        this.initialized = true;
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
};

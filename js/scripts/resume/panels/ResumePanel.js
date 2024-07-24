// ResumePanel Module extends BasePanel
//
// DESCRIPTION:
//
//   ResumePanel will contain a variety of text artifacts that mirror my
//   current resume
//

import BasePanel from '../../BasePanel.js';

let
    // DOM elements
    doc = window.document,

    // DOM IDs (must be unique)
    baseId = 'resume-panel',
    divId = baseId + '-div',
    frameDivId = baseId + '-frame-div',

    // Local variables
    showClassElement = 'show-element',

    // Singleton reference
    self;


// Class
export default class ResumePanel extends BasePanel {

    // Constructor
    constructor () {

        // Preserve instance reference and enforce singleton
        if (typeof self === 'object') {
            return self;
        } else {
            super();
            self = this;
        }

        // Private Functions
    }

    // Public Methods

    // Create elements used on the panel
    createElements () {
        this.frameDiv = doc.createElement('div');
        this.tempDiv = doc.createElement('div');
    };

    // Append elements to the DOM
    assembleElements () {

        // Add elements to container
        this.frameDiv.appendChild(this.tempDiv);

        // Assemble
        this.div.appendChild(this.frameDiv);
    };

    // Create and assemble panel elements
    initialize () {

        // Create needed HTML elms
        this.createElements();

        // Assemble elements
        this.assembleElements();

        // Assign IDs to DOM elements, if needed
        this.frameDiv.setAttribute('id', frameDivId);
        this.div.setAttribute('id', divId);

        // Initialization complete
        this.initialized = true;
    };
}

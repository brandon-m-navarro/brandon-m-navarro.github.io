// TemplatePanel Module extends BasePanel

// DESCRIPTION:
//
//   TemplatePanel is a minimum panel that can be copied by developers to
//   quickly create new panels.  The template contains boilerplate code that
//   is used for nearly every panel.  Instead of typing in, developers can
//   copy and go.  Great code documentation distinguishes average developers
//   from top-guns.
//
// PROPERTIES:
//
//   None for the template panel
//
// INTERFACES:
//
//   No public interfaces beyond standard API inherited from BasePanel
//
// NOTES:
//
//   TemplatePanel is just a simple example panel.  It should be copied and
//   customized as needed for application view panels.
//

define(function (require) {
    'use strict';

    var // Require.js module dependencies
        BasePanel = require('BasePanel'),
        // Utilities = require('Utilities'),

        // Dependent Resources
        // utilities = new Utilities(),

        // DOM elements
        doc = window.document,
        frameDiv = doc.createElement('div'),
        exampleDiv = doc.createElement('div'),

        // DOM IDs (must be unique)
        baseId = 'resume-panel',
        divId = baseId + '-div',
        frameDivId = baseId + '-frame-div',

        // Local variables
        showClassElement = 'show-element',

        // Singleton reference
        self;


    // Class
    return class ResumePanel extends BasePanel {

        // Constructor
        constructor (options) {

            // Preserve instance reference and enforce singleton
            if (typeof self === 'object') {
                return self;
            } else {
                super();
                self = this;
            }

            // Private Functions

            // Print foo to the console using 3 different print methods
            foo = function () {
                console.log('Foo regular');
                console.warn('Foo warning');
                console.error('Foo error');
            };
        }

        // Public Methods

        // Create and assemble panel elements
        initialize () {

            // Add elements to container
            frameDiv.appendChild(exampleDiv);

            // Assemble
            this.div.appendChild(frameDiv);

            // Assign IDs to DOM elements, if needed
            exampleDiv.setAttribute('id', exampleDivId);
            frameDiv.setAttribute('id', frameDivId);
            this.div.setAttribute('id', divId);

            // Initialization complete
            this.initialized = true;
        };
    }
});

module.exports = ResumePanel;

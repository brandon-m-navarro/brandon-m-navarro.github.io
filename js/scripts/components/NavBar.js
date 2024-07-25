// NavBar Component Module
//
// NavBar displays a set of buttons specified by the
// options.buttons property. When a button is selected, an event is
// fired containing the matching buttons text, which can be handled
// on the implementing panel/view/component.

import BaseComponent from '../BaseComponent.js';

export default class NavBar extends BaseComponent {
    constructor (options) {

        super();

        this.options = options || {};

        // Default Options
        this.defaultOptions = {
            buttons:  null
        };

        // Initialize NavBar Options or take defaults
        this.options.buttons = this.options.buttons || this.defaultOptions.buttons;

        // Create needed DOM elements
        this.buttonListDiv = window.document.createElement('div');

        if (this.options.buttons) {
            this.initializeButtons(this.options.buttons);
        } else {
            console.error(
                'No buttons were specified when initializing NavBar! ' +
                'An array of strings is expected. - ',
                this.options.buttons
            );
        }
    }

    // Initialize buttons
    initializeButtons (buttons) {
        for (let i=0; i<buttons.length; i++) {
            let buttonContainerDiv = window.document.createElement('div'),
                buttonTextDiv = window.document.createElement('div');
            
            // Apply dataset prop to container so we know ehich button is
            // selected
            buttonContainerDiv.dataset.index = i;
            buttonContainerDiv.dataset.text = buttons[i].toLowerCase();

            // Use text from options.buttons String array
            buttonTextDiv.innerHTML = buttons[i];

            // Set ID for styling
            buttonContainerDiv.setAttribute('id', 'nav-bar-button-container-div');

            // Assemble button and append to list
            buttonContainerDiv.appendChild(buttonTextDiv);
            this.buttonListDiv.appendChild(buttonContainerDiv);
        }

        // Append to component frame
        this.div.appendChild(this.buttonListDiv);
    }
}
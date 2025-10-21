// Modal Component
//
// This component is used to create a modal dialog that can display any
// component passed to it. It includes a mask to darken the background and
// a close button to dismiss the modal. The modal can be opened and closed
// programmatically, and it is designed to be flexible and reusable across
// different parts of the application.
//
// Public API
//
// @param {} options -
// {
//      component:  element (required, must be a component to display in the modal)
// }
'use strict';
import Images from "../Images.js";
import BaseComponent from "../BaseComponent.js";
import { addEventListeners } from "../utils/Utilities.js";
const images = new Images();

export default class Modal extends BaseComponent {
    constructor (options) {
        super();

        this.options = {};

        // Specify default values if options aren't specified
        this.defaultOptions = {
            component:  undefined
        };

        // Initialize parameters
        this.options.component = 'component' in options
            ? options.component
            : this.defaultOptions.component;
        
        // Lazy validate that a component was specified
        if (typeof this.options.component === 'undefined') {
            throw new Error('ERROR: Component option must be defined (Modal.js)');
        }

        // Create DOM elements
        this.maskDiv = window.document.createElement('div');
        this.containerDiv = window.document.createElement('div');
        this.closeImgDiv = window.document.createElement('div');
        this.closeImg = window.document.createElement('img');

        // imgs
        this.closeImg.src = images.getImages()['close'].src;

        // Assemble
        this.closeImgDiv.appendChild(this.closeImg);

        this.containerDiv.appendChild(this.closeImgDiv);
        this.containerDiv.appendChild(this.options.component);

        this.div.appendChild(this.maskDiv);
        this.div.appendChild(this.containerDiv);

        // Style
        this.div.classList.add('modal-div');

        // Listeners

        // If mask is selected, close the modal
        addEventListeners(this.maskDiv, () => {
            this.close();
        });

        // If 'X' is selected, close the modal
        addEventListeners(this.closeImgDiv, () => {
            this.close();
        });
    }

    // Close the modal
    close () {
        this.div.classList.remove('expand');
        setTimeout(() => {
            this.hide();
        }, 350);

        // Remove Modal from the DOM
        this.div.remove();
    };

    // Open the modal
    open () {
        // Append Modal to the DOM
        window.document.body.appendChild(this.div);

        // Apply 'show-element' class so display is set, then add expand
        // class to transform
        this.show();
        this.div.classList.add('expand');
    };
}

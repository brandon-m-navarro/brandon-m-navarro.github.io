// Icon Component
//
//   This component creates a div & img element to display the
//   specified image. Optionally, you can also provide some text
//   that pro/preceeds the icon. This will create an additional div
//   element to display said text.
//
// Public API
//
// @param {} options -
// {
//      img:           image source (default 'img/dadongo.png')
//      text:          text to display (d: null, no text shown)
//      textAlignment: Icon.getAlignments().RIGHT|LEFT (d: RIGHT)
//      imgSize:       size of the image (d: '28px')
//      fontSize:      size of the text (d: '16px')
//      fontWeight:    weight of the text (d: '400')
//      listener:      function to call when the image is clicked (d: undefined)
// }
//
'use strict';
import BaseComponent from "../BaseComponent.js";
import Images from "../Images.js";
const images = new Images();

export default class Icon extends BaseComponent {
    constructor (options) {
        super();

        this.options = {};

        // Specify default values if options aren't specified
        this.defaultOptions = {
            img:  images.getImages()['dadongo'].src,
            text: null,
            textAlignment: Icon.getAlignments().RIGHT,
            imgSize: '28px',
            fontSize: '16px',
            fontWeight: '400'
        };

        // Ususally I'd use setters which can validate
        // the component options, but that seems like a
        // bit of overkill for this project.

        // Initialize parameters
        this.options.img = 'img' in options
            ? options.img
            : this.defaultOptions.img;
        this.options.text = 'text' in options
            ? options.text
            : this.defaultOptions.text;
        this.options.textAlignment = 'textAlignment' in options
            ? options.textAlignment
            : this.defaultOptions.textAlignment;
        this.options.imgSize = 'imgSize' in options
            ? options.imgSize
            : this.defaultOptions.imgSize;
        this.options.fontSize = 'fontSize' in options
            ? options.fontSize
            : this.defaultOptions.fontSize;
        this.options.fontWeight = 'fontWeight' in options
            ? options.fontWeight
            : this.defaultOptions.fontWeight;

        // Create DOM elements
        this.imgDiv = window.document.createElement('div');
        this.img = window.document.createElement('img');
        this.textDiv = window.document.createElement('div');

        // Assign image
        this.img.src = this.options.img;

        // Show/hide text if specified
        if (this.options.text) {
            this.textDiv.innerHTML = this.options.text;
            this.textDiv.classList.add(this.showElementClass);
        } else {
            this.textDiv.classList.remove(this.showElementClass);
        }

        // Set proper text alignment
        switch (this.options.textAlignment) {
            case Icon.getAlignments().LEFT:
                this.div.style.flexDirection = 'row-reverse';
                break;
            case Icon.getAlignments().RIGHT:
                this.div.style.flexDirection = 'reverse';
                break;
        }

        // Assemble
        this.imgDiv.appendChild(this.img);
        this.div.appendChild(this.imgDiv);
        this.div.appendChild(this.textDiv);

        // Apply 'imgSize' & 'fontSize' properties
        this.imgDiv.style.height = this.options.imgSize;
        this.imgDiv.style.width = this.options.imgSize;
        this.img.style.height = this.options.imgSize;
        this.img.style.width = this.options.imgSize;
        this.textDiv.style.fontSize = this.options.fontSize;
        this.textDiv.style.fontWeight = this.options.fontWeight;

        // Style
        this.div.classList.add('icon-div');
    }

    setImage (src) {
        this.options.img = src;
        this.img.src = this.options.img;
    }

    // Create an ENUM for possible text alignments
    static getAlignments () {
        return Object.freeze({
            RIGHT: 0,
            LEFT:  1
        });
    }
}

// Icon Component
//
//   This component creates a div & img element to display the
//   specified image. Optionally, you can also provide some text
//   that pro/preceeds the icon. This will create an additional div
//   element to display said text.
//
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
            fontSize: '16px'
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

        // Create DOM elements
        this.imgDiv = window.document.createElement('div');
        this.img = window.document.createElement('img');
        this.textDiv = window.document.createElement('div');

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

        // Style
        this.div.classList.add('icon-div');
    }

    // Create an ENUM for possible text alignments
    getAlignments () {
        return Object.freeze({
            RIGHT: 0,
            LEFT:  1
        });
    }
}

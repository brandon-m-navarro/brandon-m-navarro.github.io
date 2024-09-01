// Picture Component
//
//   This component creates a div & img element to display the
//   specified image. Optionally, you can also provide some text
//   that is shown when the component is touched or hovered over.
//
import BaseComponent from "../BaseComponent.js";
import Images from "../Images.js";
const images = new Images();

export default class Picture extends BaseComponent {
    constructor (options) {
        super();

        this.options = {};

        // Specify default values if options aren't specified
        this.defaultOptions = {
            img:  images.getImages()['dadongo'].src,
            text: null
        };

        // Initialize parameters
        this.options.img = 'img' in options
            ? options.img
            : this.defaultOptions.img;
        this.options.text = 'text' in options
            ? options.text
            : this.defaultOptions.text;

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

        // Assemble
        this.imgDiv.appendChild(this.img);
        this.div.appendChild(this.imgDiv);
        this.div.appendChild(this.textDiv);

        // Style
        this.div.classList.add('picture-div');

        // If this.div is hovered over, the text will be shown,
        // if on mobile however, we need to explicity add touch listeners
        this.div.addEventListener('touchstart', () => {
            this.div.classList.add('show-text');
        });

        this.div.addEventListener('touchend', () => {
            this.div.classList.remove('show-text');
        });
    }
}

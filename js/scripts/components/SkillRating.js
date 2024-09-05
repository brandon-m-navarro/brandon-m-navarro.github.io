// SkillRating Component
//
//   Component that shows a series of circles ('total') that are filled with
//   a color ('color') depending on the 'filled' property.
//
import BaseComponent from "../BaseComponent.js";
// import Images from "../Images.js";
// const images = new Images();

export default class SkillRating extends BaseComponent {
    constructor (options) {
        super();

        this.options = {};

        // Specify default values if options aren't specified
        this.defaultOptions = {
            fillColor: '#0b3948',
            color: '#8d9da7',
            total: 5,
            fill:  0
        };

        // Initialize parameters
        this.options.fillColor = 'fillColor' in options
            ? options.fillColor
            : this.defaultOptions.fillColor;
        this.options.color = 'color' in options
            ? options.color
            : this.defaultOptions.color;
        this.options.total = 'total' in options
            ? options.total
            : this.defaultOptions.total;
        this.options.fill = 'fill' in options
            ? options.fill
            : this.defaultOptions.fill;

        // Create DOM elements
        this.ratingDiv = window.document.createElement('div');
        for (let i=0; i<this.options.total; i++) {
            let circleDiv = window.document.createElement('div');
            this.ratingDiv.appendChild(circleDiv);

            // Apply fill class if appropriate
            if (i<this.options.fill) {
                circleDiv.style.backgroundColor = this.options.fillColor;
            } else {
                circleDiv.style.backgroundColor = this.options.color;
            }
        }

        // Style
        this.div.classList.add('skill-rating-div');

        // Finish assembly
        this.div.appendChild(this.ratingDiv);
    }

    setFillColor (color) {
        this.options.fillColor = color;

        // Remove all children from ratingDiv
        while (this.ratingDiv.firstChild) {
            this.ratingDiv.removeChild(this.ratingDiv.lastChild);
        }

        // Reinitialize
        for (let i=0; i<this.options.total; i++) {
            let circleDiv = window.document.createElement('div');

            this.ratingDiv.appendChild(circleDiv);

            // Apply fill class if appropriate
            if (i<this.options.fill) {
                circleDiv.style.backgroundColor = this.options.fillColor;
            } else {
                circleDiv.style.backgroundColor = this.options.color;
            }
        }
    }
}

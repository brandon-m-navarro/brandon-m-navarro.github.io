// SkillRating Component
//
//   This component is used to display a skill rating in the form of circles.
//   The number of circles is determined by the 'total' property, and the
//   number of filled circles is determined by the 'fill' property. The color
//   of the filled circles is determined by the 'fillColor' property, while
//   the color of the unfilled circles is determined by the 'color' property.
//
// Public API
//
// @param {} options -
// {
//      fillColor:  color of the filled circles (default '#0b3948')
//      color:      color of the unfilled circles (default '#8d9da7')
//      total:      total number of circles (default 5)
//      fill:       number of filled circles (default 0)
//      label:      optional label that adds text left of the rating
// }
//

import BaseComponent from "../BaseComponent.js";

export default class SkillRating extends BaseComponent {
    constructor (options) {
        super();

        this.options = {};

        // Specify default values if options aren't specified
        this.defaultOptions = {
            fillColor: '#0b3948',
            color: '#8d9da7',
            total: 5,
            fill:  0,
            label: null
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
        this.options.label = 'label' in options
            ? options.label
            : this.defaultOptions.label;

        // Create DOM elements
        this.skillTextDiv = window.document.createElement('div');
        this.ratingDiv = window.document.createElement('div');
        this.ratingDiv.classList.add('rating-div');
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
        if (this.options.label !== null) {
            this.div.classList.add('label-included');

            this.skillTextDiv.innerHTML = this.options.label;

            this.div.appendChild(this.skillTextDiv);
            this.div.appendChild(this.ratingDiv);
        } else {
            this.div.appendChild(this.ratingDiv);
        }
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

    setLabel (text) {
        this.skillTextDiv.innerHTML = text;
    }
}

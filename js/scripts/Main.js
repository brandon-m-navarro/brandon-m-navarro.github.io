// Load in MainViews (Just ResumeView for now)

// Import & instantiate dependent modules
import ViewManager from './ViewManager.js';
const viewManager = new ViewManager();

import Utilities from './utils/Utilities.js';
const utilities = new Utilities();

import Images from './Images.js';
const images = new Images();

let doc = window.document;

export class Main {
    constructor (debug=false) {
        this.load();

        // Listeners
        utilities.addEventListeners(this.topClientRightDiv, () => {
            viewManager.showViewByName('ResumeView');
        });
        utilities.addEventListeners(this.topClientMidDiv, () => {
            viewManager.showViewByName('HomeView');
        });

        this.start(debug);
    }

    // Start the application
    start (debug) {
        if (debug) {
            console.log('Starting app in debug mode');
        } else {
            console.log('Starting app');
        }
    }

    // Create
    createElements () {
        this.div = doc.createElement('div');
        this.clientDiv = doc.createElement('div');

        this.topClientDiv = doc.createElement('div');
        this.topClientLeftDiv = doc.createElement('div');
        this.topClientMidDiv = doc.createElement('div');
        this.topClientRightDiv = doc.createElement('div');

        this.imgDiv = doc.createElement('div');
        this.img = doc.createElement('img');
        this.img.src = images.getImages()['dadongo'].src;
    }

    // Load the website
    load () {
        this.createElements();

        // Determine mobile/desktop
        let isMobile = utilities.isMobile();
        console.info('Are we running on mobile? - ' + isMobile);

        // Using isMobile, build different UIs? Could handle
        // with CSS media queries

        // Assemble
        this.imgDiv.appendChild(this.img);
        this.topClientLeftDiv.appendChild(this.imgDiv)

        this.topClientDiv.appendChild(this.topClientLeftDiv);
        this.topClientDiv.appendChild(this.topClientMidDiv);
        this.topClientDiv.appendChild(this.topClientRightDiv);

        this.div.appendChild(this.topClientDiv);
        this.div.appendChild(this.clientDiv);
        doc.body.appendChild(this.div);

        // Assign DOM IDs
        this.div.setAttribute('id', 'top-div');
        this.topClientDiv.setAttribute('id', 'top-client-div');
        this.clientDiv.setAttribute('id', 'client-div');

        // Initialize ViewManager
        viewManager.initialize({
            clientDiv: this.clientDiv
        });

        // Show default view
        viewManager.showViewByName('HomeView');

        // Stop showing horizontal scrollbars
        doc.documentElement.style.overflowX = 'hidden';

        // CustomEvent listeners
        doc.body.addEventListener('viewManagerEvent', (event) => {
            let customEvent = event || {},
                detail = customEvent.detail || {},
                action = detail.action;

            switch (action) {}
        });
    }
}

// Initialize
const main = new Main();

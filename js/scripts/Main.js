// Load in MainViews (Just ResumeView for now)

// Import & instantiate dependent modules
import ViewManager from './ViewManager.js';
const viewManager = new ViewManager();

import Utilities from './utils/Utilities.js';
const utilities = new Utilities();

export class Main {
    constructor (debug=false) {
        this.load();
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
        this.navMenuButtonDiv = doc.createElement('div');
        this.rightButtonDiv = doc.createElement('div');
        this.leftButtonDiv = doc.createElement('div');
    }

    // Load the website
    load () {

        this.createElements();

        // Determine whether we are on Mobile or desktop
        // (can construct different UIs for each)
        // Determine mobile/desktop
        let isMobile = utilities.isMobile();
        console.info('Are we running on mobile? - ' + isMobile);

        // Using isMobile, build different UIs?

        // Assemble
        this.div.appendChild(this.clientDiv);
        doc.body.appendChild(this.div);

        // Assign DOM IDs
        this.div.setAttribute('id', 'top-div');
        this.clientDiv.setAttribute('id', 'client-div');

        // Initialize ViewManager
        viewManager.initialize({
            clientDiv: this.clientDiv,
            navMenuButtonDiv: this.navMenuButtonDiv,
            leftButtonDiv: this.leftButtonDiv,
            rightButtonDiv: this.rightButtonDiv
        });

        // Show default view
        viewManager.showViewByName('ResumeView');

        // Stop showing horizontal scrollbars
        doc.documentElement.style.overflowX = 'hidden';

        // CustomEvent listeners
        doc.body.addEventListener('viewManagerEvent', function (event) {
            let customEvent = event || {},
                detail = customEvent.detail || {},
                action = detail.action;

            switch (action) {}
        }.bind(this));
    }
}

// Initialize
const main = new Main();
main.start();

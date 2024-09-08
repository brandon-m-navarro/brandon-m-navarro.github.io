// Import & instantiate dependent modules
import ViewManager from './ViewManager.js';
const viewManager = new ViewManager();

import Utilities from './utils/Utilities.js';
const utilities = new Utilities();

import Images from './Images.js';
const images = new Images();

let doc = window.document;

export class Main {
    constructor(debug = false) {
        this.div = doc.createElement('div');

        this.createSplash();
        this.showSplash();
        this.load();

        // Listeners
        utilities.addEventListeners(this.aboutNavTextDiv, () => {
            this.showHome();
        });
        utilities.addEventListeners(this.resumeNavTextDiv, () => {
            this.showResume();
        });
        utilities.addEventListeners(this.sunDiv, () => {
            this.setTheme(Main.getThemes().LIGHT);
        });
        utilities.addEventListeners(this.moonDiv, () => {
            this.setTheme(Main.getThemes().DARK);
        });

        // Append inline SVGs to appropriate divs
        window.onload = event => {
            // Get SVGs by ID and append to appropriate div
            // this.computerSvg = doc.getElementById('computer-svg');
            // this.computerSvg.style.display = 'block';

            // this.topClientLeftDiv.appendChild(this.computerSvg);

            viewManager.getViews()['HomeView'].homePanel.setSvgs();

            // Finally, we can hide the splashscreen and show the client
            setTimeout(() => {
                this.hideSplash();
            }, 500);
        }

        this.start(debug);
    }

    // Create and append needed elements for splashscreen
    createSplash () {
        this.splashDiv = doc.createElement('div');
        this.loadingDiv = doc.createElement('div');
        this.loadingTextDiv = doc.createElement('div');
        this.loadingSpan1 = doc.createElement('span');
        this.loadingSpan2 = doc.createElement('span');
        this.loadingSpan3 = doc.createElement('span');
        this.loadingSpan4 = doc.createElement('span');
        this.loadingSpan5 = doc.createElement('span');

        this.splashDiv.setAttribute('id', 'splash-div');

        this.loadingTextDiv.innerHTML = 'Loading . . .';

        this.splashDiv.appendChild(this.loadingDiv);
        this.splashDiv.appendChild(this.loadingTextDiv);

        this.loadingDiv.appendChild(this.loadingSpan1);
        this.loadingDiv.appendChild(this.loadingSpan2);
        this.loadingDiv.appendChild(this.loadingSpan3);
        this.loadingDiv.appendChild(this.loadingSpan4);
        this.loadingDiv.appendChild(this.loadingSpan5);

        doc.body.appendChild(this.splashDiv);
    }

    // Hide/Show methods for SplashScreen ()
    showSplash () {
        this.splashDiv.classList.add('show-splash');
        this.div.classList.add('show-splash');
    }
    hideSplash () {
        this.splashDiv.classList.remove('show-splash');
        this.div.classList.remove('show-splash');
    }

    // Show darkMode
    setTheme(theme) {
        switch (theme) {
            case Main.getThemes().LIGHT:
                this.topClientDiv.classList.remove('dark');
                this.clientDiv.classList.remove('dark');
                this.sunDiv.classList.add('selected');
                this.moonDiv.classList.remove('selected');

                viewManager.getViews()['HomeView'].homePanel.makeDay();
                viewManager.getViews()['ResumeView'].resumePanel.makeDay();

                break;
            case Main.getThemes().DARK:
                this.topClientDiv.classList.add('dark');
                this.clientDiv.classList.add('dark');
                this.sunDiv.classList.remove('selected');
                this.moonDiv.classList.add('selected');

                viewManager.getViews()['HomeView'].homePanel.makeNight();
                viewManager.getViews()['ResumeView'].resumePanel.makeNight();

                break;
        }
    };

    // Show HomeView
    showHome () {
        this.aboutNavTextDiv.classList.add('selected');
        this.resumeNavTextDiv.classList.remove('selected');
        viewManager.showViewByName('HomeView');
    }

    // Show ResumeView
    showResume () {
        this.resumeNavTextDiv.classList.add('selected');
        this.aboutNavTextDiv.classList.remove('selected');
        viewManager.showViewByName('ResumeView');
    }

    // Start the application
    start(debug) {
        if (debug) {
            console.log('Starting app in debug mode');
        } else {
            console.log('Starting app');
        }
    }

    // Create
    createElements() {
        this.clientDiv = doc.createElement('div');

        this.topClientDiv = doc.createElement('div');
        this.topClientLeftDiv = doc.createElement('div');
        this.topClientMidDiv = doc.createElement('div');
        this.topClientRightDiv = doc.createElement('div');

        this.moonDiv = doc.createElement('div');
        this.moonSvg = doc.createElement('img');
        this.sunDiv = doc.createElement('div');
        this.sunSvg = doc.createElement('img');

        // this.computerSvg = doc.getElementById('computer-svg');
        // this.computerSvg = doc.createElement('img');

        this.aboutNavTextDiv = doc.createElement('div');
        this.resumeNavTextDiv = doc.createElement('div');
    }

    // Load the website
    load() {
        this.createElements();

        // Set innerHTML
        this.aboutNavTextDiv.innerHTML = 'About';
        this.resumeNavTextDiv.innerHTML = 'Resume';

        // Determine mobile/desktop
        let isMobile = utilities.isMobile();
        console.info('Are we running on mobile? - ' + isMobile);

        // this.computerSvg.setAttribute('data', images.getImages()['computer-svg'].src);
        // this.computerSvg.setAttribute('type', 'image/svg+xml');

        // this.computerSvg.src = images.getImages()['computer-svg'].src;
        this.moonSvg.src = images.getImages()['moon'].src;
        this.sunSvg.src = images.getImages()['sun'].src;

        // Assemble

        // this.topClientLeftDiv.appendChild(this.computerSvg);

        this.topClientMidDiv.appendChild(this.aboutNavTextDiv);
        this.topClientMidDiv.appendChild(this.resumeNavTextDiv);

        this.moonDiv.appendChild(this.moonSvg);
        this.sunDiv.appendChild(this.sunSvg);

        this.topClientRightDiv.appendChild(this.moonDiv);
        this.topClientRightDiv.appendChild(this.sunDiv);

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
        this.showHome();
        this.setTheme(Main.getThemes().LIGHT);

        // Stop showing horizontal scrollbars
        doc.documentElement.style.overflowX = 'hidden';

        // CustomEvent listeners
        doc.body.addEventListener('viewManagerEvent', (event) => {
            let customEvent = event || {},
                detail = customEvent.detail || {},
                action = detail.action;

            switch (action) { }
        });
    }

    // Create enum for themes
    static getThemes () {
        return Object.freeze({
            LIGHT: 0,
            DARK:  1
        });
    }
}

// Initialize
const main = new Main();

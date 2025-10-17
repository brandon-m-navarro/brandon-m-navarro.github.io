/**
 * Main.js
 * 
 * The Main class serves as the entry point for the application,
 * managing the overall structure and flow of the client-side
 * application. It handles the creation of the main layout,
 * including the splash screen, navigation, and theming.
 * The Main class also initializes the ViewManager, which is
 * responsible for managing different views in the application.
 * It listens for user interactions, such as navigation clicks,
 * and applies the appropriate theme based on user preferences
 * or system settings.
 *
 * Usage:
 *   const main = new Main();
 *   main.start();
 */
'use strict';

// Import & instantiate dependent modules
import ViewManager from './ViewManager.js';
const viewManager = new ViewManager();

import { addEventListeners, isMobile } from './utils/Utilities.js';

const doc = window.document;

export class Main {
    constructor(debug = false) {
        this.div = doc.createElement('div');

        this.createSplash();
        this.showSplash();
        this.load();

        // Listeners
        addEventListeners(this.aboutNavTextDiv, () => {
            this.showHome();
        });
        addEventListeners(this.resumeNavTextDiv, () => {
            this.showResume();
        });
        addEventListeners(this.projectsNavTextDiv, () => {
            this.showProjects();
        });

        // Append inline SVGs to appropriate divs
        window.onload = event => {
            viewManager.getViews()['HomeView'].homePanel.setSvgs();

            // Finally, we can hide the splashscreen and show the client
            setTimeout(() => {
                this.hideSplash();
            }, 500);
        }

        // Listen for light/dark event from either panel (since i couldnt et footer positioned corectly in Main.js)
        viewManager.getViews()['HomeView'].homePanel.getDiv().addEventListener('dark', () => {
            this.setTheme(Main.getThemes().DARK)
        });
        viewManager.getViews()['HomeView'].homePanel.getDiv().addEventListener('light', () => {
            this.setTheme(Main.getThemes().LIGHT)
        });
        viewManager.getViews()['ResumeView'].resumePanel.getDiv().addEventListener('dark', () => {
            this.setTheme(Main.getThemes().DARK)
        });
        viewManager.getViews()['ResumeView'].resumePanel.getDiv().addEventListener('light', () => {
            this.setTheme(Main.getThemes().LIGHT)
        });
        viewManager.getViews()['ProjectsView'].projectsPanel.getDiv().addEventListener('dark', () => {
            this.setTheme(Main.getThemes().DARK)
        });
        viewManager.getViews()['ProjectsView'].projectsPanel.getDiv().addEventListener('light', () => {
            this.setTheme(Main.getThemes().LIGHT)
        });

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
                this.footer.classList.remove('dark');

                viewManager.getViews()['HomeView'].homePanel.makeDay();
                viewManager.getViews()['ResumeView'].resumePanel.makeDay();
                viewManager.getViews()['ProjectsView'].projectsPanel.makeDay();

                break;
            case Main.getThemes().DARK:
                this.topClientDiv.classList.add('dark');
                this.clientDiv.classList.add('dark');
                this.footer.classList.add('dark');

                viewManager.getViews()['HomeView'].homePanel.makeNight();
                viewManager.getViews()['ResumeView'].resumePanel.makeNight();
                viewManager.getViews()['ProjectsView'].projectsPanel.makeNight();

                break;
        }
    };

    // Show HomeView
    showHome () {
        this.aboutNavTextDiv.classList.add('selected');
        this.resumeNavTextDiv.classList.remove('selected');
        this.projectsNavTextDiv.classList.remove('selected');
        viewManager.showViewByName('HomeView');
    }

    // Show ResumeView
    showResume () {
        this.resumeNavTextDiv.classList.add('selected');
        this.aboutNavTextDiv.classList.remove('selected');
        this.projectsNavTextDiv.classList.remove('selected');
        viewManager.showViewByName('ResumeView');
    }

    // Show ResumeView
    showProjects () {
        this.projectsNavTextDiv.classList.add('selected');
        this.resumeNavTextDiv.classList.remove('selected');
        this.aboutNavTextDiv.classList.remove('selected');
        viewManager.showViewByName('ProjectsView');
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

        this.aboutNavTextDiv = doc.createElement('div');
        this.resumeNavTextDiv = doc.createElement('div');
        this.projectsNavTextDiv = doc.createElement('div');

        this.footer = doc.createElement('footer');
        this.footerMidDiv = doc.createElement('div');
    }

    // Load the website
    load() {

        this.createElements();

        // Set innerHTML
        this.aboutNavTextDiv.innerHTML = 'About';
        this.resumeNavTextDiv.innerHTML = 'Resume';
        this.projectsNavTextDiv.innerHTML = 'Projects';

        // Determine mobile/desktop
        console.info('Are we running on mobile? - ' + isMobile());

        // Assemble
        this.topClientDiv.appendChild(this.projectsNavTextDiv);
        this.topClientDiv.appendChild(this.resumeNavTextDiv);
        this.topClientDiv.appendChild(this.aboutNavTextDiv);

        this.footer.appendChild(this.footerMidDiv);

        this.div.appendChild(this.topClientDiv);
        this.div.appendChild(this.clientDiv);
        doc.body.appendChild(this.div);

        // Assign DOM IDs
        this.div.setAttribute('id', 'top-div');
        this.topClientDiv.setAttribute('id', 'top-client-div');
        this.clientDiv.setAttribute('id', 'client-div');
        this.footer.setAttribute('id', 'footer-div');

        // Initialize ViewManager
        viewManager.initialize({
            clientDiv: this.clientDiv
        });

        // Show default view
        this.showHome();

        let mode = localStorage.getItem("mode") || null;

        if (mode == 'dark') {
            this.setTheme(Main.getThemes().DARK);
        } else {
            this.setTheme(Main.getThemes().LIGHT);
        }

        // Stop showing horizontal scrollbars
        doc.documentElement.style.overflowX = 'hidden';

        // CustomEvent listeners
        doc.body.addEventListener('viewManagerEvent', (event) => {
            let customEvent = event || {},
                detail = customEvent.detail || {},
                action = detail.action;

            switch (action) { }
        });

        // To listen for changes in system theme:
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", event => {
            if (event.matches) {
                console.log("System switched to dark mode");
                this.setTheme(Main.getThemes().DARK);
            } else {
                console.log("System switched to light mode");
                this.setTheme(Main.getThemes().LIGHT);
            }
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

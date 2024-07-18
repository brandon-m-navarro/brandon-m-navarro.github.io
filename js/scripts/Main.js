// Load in MainViews (Just ResumeView for now)

const ResumeView = require('./scripts/resume/ResumeView'),
      resumeView = new ResumeView();


class Main {
    constructor (debug=false) {

    }

    // 
    initialize () {

        // Eventually, we will load some MainView that
        // will offer navigation to ResumeView, however,
        // just focus on showing ResumeView for now
        resumeView.initialize();
        resumeView.show();
    }

    // Load the website
    load () {

        // Determine whether we are on Mobile or desktop
        // (can construct different UIs for each)
        // Determine mobile/desktop
        let isMobile = utilities.isMobile();
        console.info('Are we running on mobile? - ' + isMobile);

        // Create nav menu (either slide or research something new)

        // Using isMobile, build different UIs?


        // Set up the client div for the current view
        clientDiv = doc.createElement('div');
        clientDiv.setAttribute('id', 'client-div');

        // Assemble
        div.appendChild(clientDiv);
        doc.body.appendChild(div);

        // Assign DOM IDs
        div.setAttribute('id', 'top-div');

        // Initialize ViewManager with options
        viewManager.initialize({
            clientDiv: clientDiv,
            navMenuButtonDiv: navMenuButtonDiv,
            leftButtonDiv: leftButtonDiv,
            rightButtonDiv: rightButtonDiv
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

            // Recalculate bounds
            // this.getBounds();
            // this.updateBounds();
        }.bind(this));

    }
}

// ViewManager Module
//
// DESCRIPTION:
//
// The ViewManager is responsible for managing all application views, including
// showing, hiding, navigation, event management, and more. Each View must
// implement a common interface defined by the ViewManager.  The following
// methods are required to be implemented by the ViewManager and each supported
// View.
//

// Import & instantiate dependent modules
import ResumeView from './resume/ResumeView.js';
const resumeView = new ResumeView();

import Utilities from './utils/Utilities.js';
const utilities = new Utilities();

import SlideControl from './components/SlideControl.js';

let // Create local vars

    // Singleton reference
    self,

    // Views
    viewMap = {},
    viewSliderMap = {},
    currentView,
    visibleView,
    defaultTransitionDelay = 300,

    // Views arrays
    generalViewList = [
        { view: resumeView,           eagerInitialize: true  }
    ],
    viewList = [].concat(generalViewList),

    // View names arrays
    generalViewNamesList =
        generalViewList.map(v => v.view.getName()),
    viewNamesList = [].concat(generalViewNamesList),

    // Other module vars
    parentDiv,
    showElementClass = 'show-element',
    initialized = false;


// Class
export default class ViewManager {

    // Constructor
    constructor() {

        // BOILER PLATE: Preserve instance reference and enforce singleton
        if (typeof self === 'object') {
            return self;
        } else {
            self = this;
        }

        // Set view map by name
        let view;
        for (let i = 0; i < viewList.length; i++) {
            view = viewList[i].view;
            viewMap[view.getName()] = view;
        }

        // Elements of interest
        this.navMenuButtonDiv = undefined;
        this.leftButtonDiv = undefined;
        this.rightButtonDiv = undefined;


        // Element listeners

        // Listener for NavigationButtonEvent to show proper nav controls
        document.body.addEventListener('navigationButtonEvent', event => {
            if (event != null && event.detail != null) {
                this.showNavigationButtons(event.detail);
            }
        });
    };


    // Instance methods

    // Add the specified div to the list of possible divs
    addDiv (childDiv, parentDiv) {
        // Only add if not already present
        if (!childDiv.parentNode) {
            parentDiv.appendChild(childDiv);
        }
    };

    // Fire event
    fireEvent (action, loginType) {
        // Setup detail object
        let detail = {
            action: action
        };
        // Dispatch
        document.body.dispatchEvent(new CustomEvent('viewManagerEvent', {
            detail: detail,
            bubbles: false,
            cancelable: false
        }));
    };

    // Public Prototype Methods

    // Create and assemble view elements
    initialize (options) {
        options = options || {};  // Avoid null/undefined

        // Capture parent div for all views
        parentDiv = options.clientDiv;

        // Eager initialize some views
        let view,
            slider;
        for (let i=0; i<viewList.length; i++) {
            view = viewList[i].view;
            if (viewList[i].eagerInitialize === true) {
                view.initialize();
                slider = new SlideControl({
                    component: view.getDiv()
                });
                viewSliderMap[view.getName()] = slider;
                slider.hide();
                this.addDiv(slider.getDiv(), parentDiv);
            }
        }

        // Capture navigation buttons
        this.navMenuButtonDiv = options.navMenuButtonDiv;
        this.leftButtonDiv = options.leftButtonDiv;
        this.rightButtonDiv = options.rightButtonDiv;

        // Declare victory
        initialized = true;

        // Listeners

        // Left Navigation button
        utilities.addEventListeners(this.leftButtonDiv, () => {

            // Check our current View to determine what to show
            switch (this.getVisibleView().getName()) {

                // case 'ResumeView':
                //     resumeView.handleNavigation(
                //         ResumeView.getNavigationDirection().LEFT,
                //         ResumeView.getNavigationText().BACK
                //     );
                //     break;

                default:
                    this.showDefaultView();
                    break;
            }
        });

        // ResumeView events
        resumeView.getDiv().addEventListener('resumeEvent', event => {
            console.log('ResumeEvent! - ', event);
            if (event && event.detail) {
                switch (event.detail.action) {
                    case 'showDefaultView':
                        this.showDefaultView();
                        break;
                }
            }
        });
    };

    // Get the initialization status
    isInitialized () {
        return initialized;
    };

    // Show navigation options in main.logoDiv...
    //
    //   options {
    //       navMenuButton: true | false,
    //       leftButton: text | false,
    //       rightButton: text | false
    //   }
    //
    //   Default is false for any unspecified properties.
    //
    showNavigationButtons (options) {
        options = options || {};  // Avoid null/undefined

        // Show navMenuButton if true
        if (options.navMenuButton === true) {
            this.navMenuButtonDiv.classList.add(showElementClass);
            this.leftButtonDiv.classList.remove(showElementClass);
            this.rightButtonDiv.classList.remove(showElementClass);
        } else {
            // Hide navMenuButton
            this.navMenuButtonDiv.classList.remove(showElementClass);

            // Show LeftButton if specified
            if (options.leftButton != null && options.leftButton !== false) {
                this.leftButtonDiv.classList.add(showElementClass);
                this.leftButtonDiv.children[1].innerHTML =
                    options.leftButton || '';
            } else {
                this.leftButtonDiv.classList.remove(showElementClass);
            }
        }
    };

    // Scroll to top of current view
    scrollToTop () {
        for (let v in viewMap) {
            if (viewMap && viewMap[v]) {
                let view = viewMap[v].getDiv();
                if (view && view.classList.contains(showElementClass)) {
                    view.scrollTop = 0;
                    if (view.hasChildNodes()) {
                        view.children[0].scrollTop = 0;
                    }
                }
            }
        }
    };

    // Show default view, e.g. HomeView or AssociateView based on loginType
    showDefaultView () {
        this.showViewByName('ResumeView');
    };

    // Show view by name
    showViewByName (viewName, options) {

        // Show view based on name
        if (viewName != null && viewMap[viewName] != null) {
            this.showView(viewMap[viewName], options);
        }
    };

    // Display the specified View
    showView (newView, options) {

        // Validate
        if (newView == null) {
            throw new Error('ERROR: invalid view - ' + newView);
        }

        // Get view name
        let newViewName = newView.getName();


        // Preserve previous view and set current
        let previousVisibleView = this.getVisibleView();

        if (previousVisibleView !== newView) {
            this.setVisibleView(newView);

            // Gather artifacts for new view
            let newViewSlider = viewSliderMap[newViewName],
                newViewDiv;

            // Lazy initialization, if necessary
            if (!newView.isInitialized()) {

                // Initialize and add to view collection
                newView.initialize();
                newViewDiv = newView.getDiv();

                // Add to DOM
                switch(newView) {
                    case resumeView:
                    default:
                        // Create slider for view
                        newViewSlider = new SlideControl({
                            component: newViewDiv
                        });
                        viewSliderMap[newView.getName()] = newViewSlider;
                        this.addDiv(newViewSlider.getDiv(), parentDiv);
                        break;
                }
            }

            // Assume no transition delay needed
            let transitionDelay = 0;

            // Close existing view, if there is one
            if (previousVisibleView != null) {

                // Gather artifacts on old view
                let oldView = previousVisibleView,
                    oldViewName = oldView.getName(),
                    oldViewSlider = viewSliderMap[oldViewName];

                // Close existing view slider and hide view
                if (oldViewSlider != null) {
                    oldViewSlider.close(() => {
                        // Hide the existing view and slider
                        oldView.hide();
                        oldViewSlider.hide();
                    });
                }

                // Wait for transition before opening new view
                transitionDelay = defaultTransitionDelay;
            }

            // Allow existing view/slider to transition away, if necessary
            setTimeout(() => {

                // Show the view and open its slider
                switch(newView) {
                    case resumeView:

                    default:

                    // Call 'setInitialView' method, if it exists
                    if (typeof newView.setInitialView === 'function') {
                        newView.setInitialView(options);
                    }

                    // Show view (open slider)
                    newView.show();
                    newViewSlider.show();
                    setTimeout(() => {
                        newViewSlider.open();
                    }, 50); // Yield for UI

                    break;
                }

                // Scroll to the top of the view
                this.scrollToTop();

            }, transitionDelay);
        }
    };

    // Close the specified view
    hideView (view, callback) {
        view.hide();
        if (callback) {
            callback();
        }
    };

    // Open the named slider
    openSlider (slider, callback) {
        if (slider) {
            slider.show();
            slider.open(() => {
                if (callback) {
                    callback();
                }
            });
        } else {
            if (callback) {
                callback();
            }
        }
    };

    // Close the named slider with special handling for busyView
    closeSlider (slider, callback) {
        slider.close(() => {
            slider.hide();
            if (callback) {
                callback();
            }
        });
    };

    // Show the current view (Map nor List)
    getCurrentView () {
        return currentView;
    };

    // Show the current view (Map nor List)
    setCurrentView (view) {
        currentView = view;
    };

    // Keep track of the currently visible view
    setVisibleView (view) {
        visibleView = view;
    };

    // Get the currently visible view
    getVisibleView () {
        return visibleView;
    };

    // Get the list of possible views
    getViews () {
        return viewMap;
    };

    // Reset
    reset () {
        // Nothing for now
    };
};

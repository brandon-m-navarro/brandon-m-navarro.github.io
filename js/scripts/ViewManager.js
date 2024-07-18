// Copyright © 2015-2023 TrampleZone LLC All Rights Reserved

// ViewManager Module

// DESCRIPTION:
//
// The ViewManager is responsible for managing all application views, including
// showing, hiding, navigation, event management, and more. Each View must
// implement a common interface defined by the ViewManager.  The following
// methods are required to be implemented by the ViewManager and each supported
// View...
//
// VIEW MANAGER METHODS:
//
// showView()       # Hide the current view and show the specified view
// hideView()       # Close the current view
// disposeView()    # Remove specified view from the DOM and release resources
// showViewByName() # Show view by specifying it's name
// getCurrentView() # Get the bottom most visible view, e.g. MapView/ListView
// getVisibleView() # Get the top most view currently showing, e.g VoteView
//
// VIEW INTERFACE METHODS:
//
// show()           # Make view container visible
// hide()           # Make view container invisible
// open(callback)   # Open view and call callback when complete
// close(callback)  # Close view and call callback when complete
// initialize()     # Configure UI elements, style, add to containers, etc
// isInitialized()  # Return true if view has been initialized
// getDiv()         # Return the top-level div container for the view
// getName()        # Return the name of the view
// handleClose()    # Callback when the view closes
// handleOpen()     # Callback when the view opens
// handleDispose()  # Remove view from DOM if necessary and release resources
// updateBounds()   # Rerender the view to reflect current container bounds
// reset()          # Reset UI elements to their original or default states
//
//
// NAVIGATION:
//
// ViewManager handles the visibility of navMenuButton, LeftButton and
// RightButton.  Each View has different requirements for navigation buttons.
// Some Views require navigation buttons on the left or the right, e.g. Back,
// Cancel, Save.  Others require no nav buttons at all.  Yet others, are OK
// to have the navMenuButton showing allowing users to switch views.
//
// This class listens for click/touch events and delegates handling to the
// current view being displayed.  This class also listens for
// 'navigationButtonEvent' on document.body.  This is how Views can dispatch
// an event to change the navigation button visibility and text.
//
// NOTES:
//
// The initial view displayed at application startup is the SplashView.
// Typically on Desktop, an animation can play as part of the SplashView.
// However on Mobile, only a static image may be displayed until the
// deviceReady event is received.  SplashView is launched from require_main.js.
//
// A common BusyView is used to keep the user entertained while a background
// operation is in progress, e.g. a call to the Server to get data.  When the
// background operation completes, the BusyView is hidden revealing the current
// view underneath.
//
// Some views are eagerly initialized up front, while others are lazily
// initialized on first use.  Views can be disposed (or uninitialized) to
// manage memory constraints if needed.
//

define(function (require) {
    'use strict';

    let // Require.js module dependencies

        // Views
        ResumeView = require('ResumeView'),

        // Other modules
        Utilities = require('Utilities'),

        // Instantiate dependent modules
        resumeView = new ResumeView(),
        // validators = new Validators(),
        utilities = new Utilities(),

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
    return class ViewManager {

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

        // Update bounds to reflect current dimensions
        updateBounds () {
            for (let viewName in viewMap) {
                viewMap[viewName].updateBounds();
            }
        };

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
                    //     aboutView.handleNavigation(
                    //         AboutView.getNavigationDirection().LEFT,
                    //         AboutView.getNavigationText().BACK
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
                // if (event && event.detail) {
                //     switch (event.detail.action) {
                //         case 'showDefaultView':
                //             this.showDefaultView();
                //             break;
                //     }
                // }
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

            // Validate
            // try {
            //     validators.getStringValidator().validate(viewName);
            // } catch (error) {
            //     console.log('ERROR: view name is not a string - ' +
            //                 viewName.toString());
            // }

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
});

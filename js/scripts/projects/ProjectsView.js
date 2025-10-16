/**
 * ProjectsView.js
 *
 * The ProjectsView class is responsible for displaying the projects panel
 * within the application. It extends the BaseView class and initializes
 * the projects panel, sets up the title, and manages the view's lifecycle.
 */
'use strict';

// Import dependent modules
import ProjectsPanel from "./panels/ProjectsPanel.js";
import BaseView from '../BaseView.js';

// Create view variables
let doc = window.document,
    defaultBaseSelector = 'projects-view',
    self;

// Class
export default class ProjectsView extends BaseView {

    // Constructor
    constructor(options) {

        // Preserve instance reference and enforce singleton
        if (typeof self === 'object') {
            return self;
        } else {
            super();
            self = this;
        }

        // Override options
        this.options = options || {};
        this.baseSelector = 'baseSelector' in this.options ?
            this.options.baseSelector : defaultBaseSelector;

        // Initialize panels
        this.projectsPanel = new ProjectsPanel();
        this.projectsPanel.initialize();
        this.projectsPanel.show();

        // Title
        this.titleDiv = doc.createElement('div');
        this.titleTextDiv = doc.createElement('div');
        this.titleLineDiv = doc.createElement('div');
        this.titleDiv.appendChild(this.titleTextDiv);
        this.titleDiv.appendChild(this.titleLineDiv);

        // Container for panels
        this.frameDiv = doc.createElement('div');
        this.frameDiv.appendChild(this.titleDiv);
        this.frameDiv.appendChild(this.projectsPanel.getDiv());
        this.div.appendChild(this.frameDiv);

        // Set IDs
        this.div.setAttribute('id', this.baseSelector + '-div');
        this.frameDiv.setAttribute('id', this.baseSelector + '-frame-div');
        this.titleDiv.setAttribute('id', this.baseSelector + '-title-div');
    };

    // Fire event
    fireEvent(action, target) {
        this.div.dispatchEvent(new CustomEvent('projectsEvent', {
            detail: {
                action: action,
                target: target
            },
            bubbles: false,
            cancelable: false
        }));
    };
};

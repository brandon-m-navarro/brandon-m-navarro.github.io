"use strict";

// Import dependent modules
import ResumePanel from "./panels/ResumePanel.js";
import BaseView from "../BaseView.js";

// Create view variables
let doc = window.document,
  defaultBaseSelector = "resume-view",
  self;

// Class
export default class ResumeView extends BaseView {
  // Constructor
  constructor(options) {
    // Preserve instance reference and enforce singleton
    if (typeof self === "object") {
      return self;
    } else {
      super();
      self = this;
    }

    // Override options
    this.options = options || {};
    this.baseSelector =
      "baseSelector" in this.options
        ? this.options.baseSelector
        : defaultBaseSelector;

    // Initialize panels
    this.resumePanel = new ResumePanel();
    this.resumePanel.initialize();
    this.resumePanel.show();

    // Title
    this.titleDiv = doc.createElement("div");
    this.titleTextDiv = doc.createElement("div");
    this.titleLineDiv = doc.createElement("div");
    this.titleDiv.appendChild(this.titleTextDiv);
    this.titleDiv.appendChild(this.titleLineDiv);

    // Container for panels

    // Assemble
    this.frameDiv = doc.createElement("div");
    this.frameDiv.appendChild(this.titleDiv);
    this.frameDiv.appendChild(this.resumePanel.getDiv());
    this.div.appendChild(this.frameDiv);

    // Set IDs
    this.div.setAttribute("id", this.baseSelector + "-div");
    this.frameDiv.setAttribute("id", this.baseSelector + "-frame-div");
    this.titleDiv.setAttribute("id", this.baseSelector + "-title-div");
  }

  // Instance Methods

  // Fire event
  fireEvent(action, target) {
    this.div.dispatchEvent(
      new CustomEvent("resumeEvent", {
        detail: {
          action: action,
          target: target,
        },
        bubbles: false,
        cancelable: false,
      })
    );
  }
}

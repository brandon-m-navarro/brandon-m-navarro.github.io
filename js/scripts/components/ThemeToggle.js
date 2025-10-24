// ThemeToggle.js
//
// A standalone theme toggle component that handles dark/light mode switching
// with persistent state via localStorage. Can be used independently in any component.
//
"use strict";
import Images from "../Images.js";
import { addEventListeners } from "../utils/Utilities.js";

export default class ThemeToggle {
  constructor(options = {}) {
    this.options = options;
    this.images = new Images().getImages();
    this.currentMode = localStorage.getItem("mode") || "light";

    // Create elements
    this.createElements();
    this.setupEventListeners();
    this.setInitialTheme();
  }

  createElements() {
    const doc = window.document;
    
    // Main container
    this.themeToggleDiv = doc.createElement("div");
    this.themeToggleDiv.className = "theme-toggle-container";
    
    // Single toggle button
    this.toggleButton = doc.createElement("button");
    this.toggleButton.className = "theme-toggle-button";
    this.toggleButton.setAttribute("aria-label", "Toggle theme");
    
    // Icon element
    this.toggleIcon = doc.createElement("img");
    this.toggleButton.appendChild(this.toggleIcon);

    this.themeToggleDiv.appendChild(this.toggleButton);
  }

  setupEventListeners() {
    addEventListeners(this.toggleButton, () => {
      this.toggleTheme();
    });
  }

  setInitialTheme() {
    this.setTheme(this.currentMode, true);
  }

  setTheme(mode, silent = false) {
    this.currentMode = mode;
    localStorage.setItem("mode", mode);

    const isDark = mode === "dark";
    
    // Update icon based on current theme
    if (isDark) {
      // In dark mode, show sun icon (to switch to light)
      this.toggleIcon.src = this.images["sun"].src;
      this.toggleIcon.alt = "Switch to light mode";
      this.toggleButton.setAttribute("aria-label", "Switch to light mode");
      this.toggleButton.classList.add("dark");
      this.toggleButton.classList.remove("light");
    } else {
      // In light mode, show moon icon (to switch to dark)
      this.toggleIcon.src = this.images["moon"].src;
      this.toggleIcon.alt = "Switch to dark mode";
      this.toggleButton.setAttribute("aria-label", "Switch to dark mode");
      this.toggleButton.classList.add("light");
      this.toggleButton.classList.remove("dark");
    }

    // Update images if needed
    if (this.options.onThemeChange) {
      this.options.onThemeChange(mode);
    }

    // Dispatch event if not silent (for other components to listen)
    if (!silent) {
      this.dispatchThemeChange(mode);
    }
  }

  dispatchThemeChange(mode) {
    this.themeToggleDiv.dispatchEvent(
      new CustomEvent("themeChange", {
        detail: { mode },
        bubbles: true,
        cancelable: false,
      })
    );
    
    // Also dispatch global events for backward compatibility
    document.dispatchEvent(
      new CustomEvent(mode, {
        detail: {},
        bubbles: true,
        cancelable: false,
      })
    );
  }

  getCurrentTheme() {
    return this.currentMode;
  }

  toggleTheme() {
    const newTheme = this.currentMode === "light" ? "dark" : "light";
    this.setTheme(newTheme);
  }

  // Public methods
  getDiv() {
    return this.themeToggleDiv;
  }

  setDarkMode(isDark) {
    this.setTheme(isDark ? "dark" : "light");
  }

  makeNight() {
    this.setTheme("dark");
  }

  makeDay() {
    this.setTheme("light");
  }
}

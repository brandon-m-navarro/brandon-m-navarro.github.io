// Footer.js
//
// A footer component that includes social media links, an email popup,
// and a dark/light mode toggle. The component allows users to copy
// the email address to the clipboard or open their default email client.
// It also provides buttons to switch between dark and light modes,
// updating the appearance of the footer accordingly.
//
// Public API
// @param {} options - (optional) configuration options for the footer
// }
//
"use strict";
import Images from "../Images.js";
import { addEventListeners, copyTextToClipboard } from "../utils/Utilities.js";

export default class FooterComponent {
  constructor(options = {}) {
    this.options = options;
    this.images = new Images().getImages();
    this.emailContainerListenerDiv = null;
    this.initialized = false;

    // Create main elements
    this.createElements();
    this.setupEventListeners();
  }

  createElements() {
    const doc = window.document;
    // Main wrapper
    this.footerDivWrapper = doc.createElement("div");
    this.footerDiv = doc.createElement("div");
    this.footerLeftDiv = doc.createElement("div");
    this.footerMidDiv = doc.createElement("div");
    this.footerRightDiv = doc.createElement("div");

    // React site link
    this.reactTextDiv = doc.createElement("div");
    this.reactImg = doc.createElement("img");

    // Social links
    this.midLinkedInIcon = doc.createElement("img");
    this.midEmailTextDiv = doc.createElement("div");
    this.midGithubIcon = doc.createElement("img");

    // Email popup
    this.emailPopupDiv = doc.createElement("div");
    this.copyDiv = doc.createElement("div");
    this.copyIcon = doc.createElement("img");
    this.copyText = doc.createElement("div");
    this.emailDiv = doc.createElement("div");
    this.emailIcon = doc.createElement("img");
    this.emailText = doc.createElement("div");

    // Set image sources
    this.copyIcon.src = this.images["copy"].altSrc;
    this.emailIcon.src = this.images["email"].altSrc;
    this.midLinkedInIcon.src = this.images["linkedIn"].src;
    this.midGithubIcon.src = this.images["github"].src;
    this.reactImg.src = this.images["react-b"].altSrc;

    // Set text content
    this.copyText.innerHTML = "Copy";
    this.emailText.innerHTML = "Email";
    this.reactTextDiv.innerHTML = "View site built using React & Typescript";
    this.midEmailTextDiv.innerHTML = "brandon.m.navarro@gmail.com";

    // Assemble email popup
    this.copyDiv.appendChild(this.copyIcon);
    this.copyDiv.appendChild(this.copyText);
    this.emailDiv.appendChild(this.emailIcon);
    this.emailDiv.appendChild(this.emailText);
    this.emailPopupDiv.appendChild(this.copyDiv);
    this.emailPopupDiv.appendChild(this.emailDiv);

    // Assemble left section (React site link)
    this.footerLeftDiv.appendChild(this.reactImg);
    this.footerLeftDiv.appendChild(this.reactTextDiv);

    // Assemble middle section (social links)
    this.footerMidDiv.appendChild(this.midLinkedInIcon);
    this.footerMidDiv.appendChild(this.midEmailTextDiv);
    this.footerMidDiv.appendChild(this.midGithubIcon);

    // Assemble main footer
    this.footerDiv.appendChild(this.footerLeftDiv);
    this.footerDiv.appendChild(this.footerMidDiv);
    this.footerDiv.appendChild(this.footerRightDiv);

    // Assemble wrapper
    this.footerDivWrapper.appendChild(this.footerDiv);

    // Set initial classes
    this.setInitialClasses();
  }

  setupEventListeners() {

    // Social links
    addEventListeners(this.midGithubIcon, () => {
      window.open("https://github.com/brandon-m-navarro", "_blank").focus();
    });

    addEventListeners(this.midLinkedInIcon, () => {
      window
        .open(
          "https://www.linkedin.com/in/brandon-navarro-b36b97149/",
          "_blank"
        )
        .focus();
    });

    addEventListeners(this.footerLeftDiv, () => {
      window.open("https://nextjs-site-sand.vercel.app", "_blank").focus();
    });

    // Email functionality
    addEventListeners(this.midEmailTextDiv, () => {
      this.showEmailPopup();
    });

    addEventListeners(this.copyDiv, () => {
      this.copyEmail();
    });

    addEventListeners(this.emailDiv, () => {
      this.openEmail();
    });
  }

  setInitialClasses() {
    // Set initial mode based on localStorage or default to light
    const currentMode = localStorage.getItem("mode") || "light";
    this.setDarkMode(currentMode === "dark");

    // Set component-specific classes
    this.footerDivWrapper.className = "footer-component-wrapper";
    this.footerDiv.className = "footer-component";
    this.footerLeftDiv.className = "footer-left";
    this.footerMidDiv.className = "footer-mid";
    this.footerRightDiv.className = "footer-right";
    this.emailPopupDiv.className = "email-popup";
    this.midEmailTextDiv.className = "email-text";
  }

  setDarkMode(isDark) {
    if (isDark) {
      this.footerDiv.classList.add("dark");
      this.emailPopupDiv.classList.add("dark");
      this.reactImg.src = this.images["react-b"].altSrc;
      this.midLinkedInIcon.src = this.images["linkedIn"].altSrc;
      this.midGithubIcon.src = this.images["github"].altSrc;
    } else {
      this.footerDiv.classList.remove("dark");
      this.emailPopupDiv.classList.remove("dark");
      this.reactImg.src = this.images["react-b"].altSrc;
      this.midLinkedInIcon.src = this.images["linkedIn"].src;
      this.midGithubIcon.src = this.images["github"].src;
    }
  }

  dispatchModeChange(mode) {
    this.footerDiv.dispatchEvent(
      new CustomEvent(mode, {
        detail: {},
        bubbles: true,
        cancelable: false,
      })
    );
  }

  showEmailPopup() {
    this.emailPopupDiv.classList.add("show-element");

    if (!this.emailPopupDiv.parentNode || this.emailPopupDiv.parentNode !== document.body) {
        document.body.appendChild(this.emailPopupDiv);
    }

    // Create overlay to close popup when clicking outside
    if (!this.emailContainerListenerDiv) {
      this.emailContainerListenerDiv = window.document.createElement("div");
      this.emailContainerListenerDiv.setAttribute("id", "email-container");
      this.emailContainerListenerDiv.className = "email-popup-overlay";

      document.body.appendChild(this.emailContainerListenerDiv);

      this.emailContainerListenerDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        this.hideEmailPopup();
      });
    }

    this.emailPopupDiv.addEventListener("click", this.handlePopupClick);

    this.emailContainerListenerDiv.classList.add("show-element");
  }

  // Prevent click from bubbling to overlay
  handlePopupClick = (e) => {
    e.stopPropagation();
  };

  hideEmailPopup() {
    this.emailPopupDiv.classList.remove("show-element");
    if (this.emailContainerListenerDiv) {
      this.emailContainerListenerDiv.classList.remove("show-element");
    }
  }

  copyEmail() {
    copyTextToClipboard("brandon.m.navarro@gmail.com");
    this.emailPopupDiv.classList.add("show-copied");
    setTimeout(() => {
      this.emailPopupDiv.classList.remove("show-copied");
    }, 1500);
  }

  openEmail() {
    window.location.href = "mailto:brandon.m.navarro@gmail.com?";
  }

  // Public methods
  getDiv() {
    return this.footerDivWrapper;
  }

  makeNight() {
    this.setDarkMode(true);
  }

  makeDay() {
    this.setDarkMode(false);
  }
}

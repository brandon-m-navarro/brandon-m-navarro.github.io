"use strict";

import BasePanel from "../../BasePanel.js";
import Images from "../../Images.js";
import { addEventListeners } from "../../utils/Utilities.js";
import FooterComponent from "../../components/Footer.js";

const images = new Images().getImages();

let // DOM elements
  doc = window.document,
  // DOM IDs (must be unique)
  baseId = "projects-panel",
  divId = baseId + "-div",
  frameDivId = baseId + "-frame-div",
  // Local variables
  showClassElement = "show-element",
  // Singleton reference
  self;

// Projects data
const projects = [
  {
    id: "1",
    title: "NextJS Dashboard",
    description:
      "A comprehensive dashboard application built as my introduction to Next.js, following the official Next.js tutorial. This project served as a hands-on learning experience for modern React frameworks and full-stack development patterns. As a prerequisite, I also completed their React Foundations course, which covers the fundamentals of React, such as components, props, state, and hooks, and newer features like Server Components and Suspense.",
    image: images["dashboard"].src,
    tags: ["Authentication", "Next.js", "Postgres"],
    github: "https://github.com/brandon-m-navarro/nextjs-dashboard",
    liveDemo: "https://nextjs-dashboard-sigma-eight-57.vercel.app/",
  },
  {
    id: "2",
    title: "Task Management App",
    description:
      "A full-stack task management web application built with Next.js, featuring a responsive design and real-time optimistic updates. The app enables users to efficiently organize tasks within projects, with intuitive filtering, sorting, and seamless cross-device synchronization. Developed with a mobile-first approach, this project provided extensive practice with React, TypeScript, Next.js, and Tailwind CSS, particularly focusing on Next.js routing and React Context for efficient database operations with Postgres.",
    image: images["todo"].src,
    tags: ["Next.js", "TypeScript", "Tailwind", "Postgres"],
    github: "https://github.com/brandon-m-navarro/nextjs-todo",
    liveDemo: "https://nextjs-todo-lake.vercel.app/",
  },
  {
    id: "3",
    title: "Portfolio Site",
    description:
      "A client-side application hosted on GitHub Pages showcasing scalable JavaScript architecture through ES6 classes and inheritance patterns. Implements persistent UI preferences via LocalStorage with full theme synchronization. Originally developed with vanilla JavaScript applying professional patterns from industry experience, then reimplemented with React/Next.js to demonstrate framework versatility and comparative understanding. The structure of this project was inspired by the codebase I'd worked on with MyChapter at Tramplezone LLC.",
    image: images["portfolio"].src,
    tags: ["JS (ES6)", "CSS3", "SVG"],
    github: "https://github.com/brandon-m-navarro/brandon-m-navarro.github.io",
    liveDemo: "https://brandon-m-navarro.github.io/",
  },
];

// Class
export default class ProjectsPanel extends BasePanel {
  // Constructor
  constructor() {
    // Preserve instance reference and enforce singleton
    if (typeof self === "object") {
      return self;
    } else {
      super();
      self = this;
    }

    // Track expanded state
    this.expandedCardId = null;
  }

  // Public Methods

  makeNight() {
    localStorage.setItem("mode", "dark");

    this.div.classList.add("dark");
    this.frameDiv.classList.add("dark");
    this.headerDiv.classList.add("dark");
    this.projectsGridDiv.classList.add("dark");

    // Update footer
    this.footerComponent.makeNight();

    // Update all project cards for dark mode
    const projectCards = this.projectsGridDiv.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
      card.classList.add("dark");
    });

    // Update tags for dark mode
    const tagSpans = this.projectsGridDiv.querySelectorAll(".project-tag");
    tagSpans.forEach((tag) => {
      tag.classList.add("dark");
    });
  }

  makeDay() {
    localStorage.setItem("mode", "light");

    this.div.classList.remove("dark");
    this.frameDiv.classList.remove("dark");
    this.headerDiv.classList.remove("dark");
    this.projectsGridDiv.classList.remove("dark");

    // Update footer
    this.footerComponent.makeDay();

    // Update all project cards for light mode
    const projectCards = this.projectsGridDiv.querySelectorAll(".project-card");
    projectCards.forEach((card) => {
      card.classList.remove("dark");
    });

    // Update tags for light mode
    const tagSpans = this.projectsGridDiv.querySelectorAll(".project-tag");
    tagSpans.forEach((tag) => {
      tag.classList.remove("dark");
    });
  }

  // Expand/collapse project card
  toggleProjectCard(cardId) {
    if (this.expandedCardId === cardId) {
      // Collapse currently expanded card
      this.collapseCard(cardId);
      this.expandedCardId = null;
    } else {
      // Collapse any currently expanded card
      if (this.expandedCardId) {
        this.collapseCard(this.expandedCardId);
      }

      // Expand the new card
      this.expandCard(cardId);
      this.expandedCardId = cardId;
    }
  }

  expandCard(cardId) {
    const card = this.projectsGridDiv.querySelector(
      `[data-project-id="${cardId}"]`
    );
    if (card) {
      // DESKTOP: Store dimensions and use expanding state
      if (window.innerWidth >= 768) {
        const originalRect = card.getBoundingClientRect();
        const gridRect = this.projectsGridDiv.getBoundingClientRect();

        card.style.setProperty("--original-width", `${originalRect.width}px`);
        card.style.setProperty("--original-height", `${originalRect.height}px`);
        card.style.setProperty(
          "--original-top",
          `${originalRect.top - gridRect.top}px`
        );
        card.style.setProperty(
          "--original-left",
          `${originalRect.left - gridRect.left}px`
        );

        card.classList.add("expanding");
      }

      // Update button text
      const detailsButton = card.querySelector(".project-details-btn");
      if (detailsButton) {
        detailsButton.textContent = "Show Less";
      }

      // Switch to long description if available
      const descriptionDiv = card.querySelector(".project-description");
      const longDescription = descriptionDiv.getAttribute(
        "data-long-description"
      );
      if (longDescription) {
        descriptionDiv.innerHTML = longDescription.replace(/\n/g, "<br>");
      }

      // DESKTOP: Complete expansion after animation
      if (window.innerWidth >= 768) {
        card.classList.remove("expanding");
        card.classList.add("expanded");

        const expandedRect = card.getBoundingClientRect();
        card.style.setProperty("--expanded-height", `${expandedRect.height}px`);

        setTimeout(() => {
          card.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      } else {
        // MOBILE: Just add expanded class
        card.classList.add("expanded");
        setTimeout(() => {
          card.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }, 100);
      }
    }
  }

  collapseCard(cardId) {
    const card = this.projectsGridDiv.querySelector(
      `[data-project-id="${cardId}"]`
    );
    if (card) {
      // DESKTOP: Use collapsing state
      if (window.innerWidth >= 768) {
        const expandedRect = card.getBoundingClientRect();
        card.style.setProperty("--expanded-height", `${expandedRect.height}px`);

        card.classList.remove("expanded");
        card.classList.add("collapsing");
      } else {
        // MOBILE: Just remove expanded class
        card.classList.remove("expanded");
      }

      // Update button text
      const detailsButton = card.querySelector(".project-details-btn");
      if (detailsButton) {
        detailsButton.textContent = "View Details";
      }

      // Switch back to short description
      const descriptionDiv = card.querySelector(".project-description");
      const shortDescription = descriptionDiv.getAttribute(
        "data-short-description"
      );
      if (shortDescription) {
        descriptionDiv.textContent = shortDescription;
      }

      // DESKTOP: Complete collapse after animation
      if (window.innerWidth >= 768) {
        card.classList.remove("collapsing");
        card.style.removeProperty("--original-width");
        card.style.removeProperty("--original-height");
        card.style.removeProperty("--original-top");
        card.style.removeProperty("--original-left");
        card.style.removeProperty("--expanded-height");
      }
    }
  }

  // Create elements used on the panel
  createElements() {
    this.frameDiv = doc.createElement("div");
    this.frameDiv.className = frameDivId;

    // Header section
    this.headerDiv = doc.createElement("div");
    this.headerDiv.className = "projects-header";
    this.headerTitleDiv = doc.createElement("div");
    this.headerTitleDiv.className = "projects-main-title";
    this.headerSubtitleDiv = doc.createElement("div");
    this.headerSubtitleDiv.className = "projects-subtitle";

    // Projects grid
    this.projectsGridDiv = doc.createElement("div");
    this.projectsGridDiv.className = "projects-grid";

    // Create project cards
    this.projectCards = [];
    projects.forEach((project, index) => {
      const projectCard = this.createProjectCard(project, index);
      this.projectCards.push(projectCard);
      this.projectsGridDiv.appendChild(projectCard);
    });

    // Initialize footer component
    this.footerComponent = new FooterComponent();

    // Assemble header
    this.headerDiv.appendChild(this.headerTitleDiv);
    this.headerDiv.appendChild(this.headerSubtitleDiv);

    // Assemble main content
    this.frameDiv.appendChild(this.headerDiv);
    this.frameDiv.appendChild(this.projectsGridDiv);

    // Listen for mode changes from footer
    this.footerComponent.getDiv().addEventListener("dark", () => {
      this.makeNight();
    });

    this.footerComponent.getDiv().addEventListener("light", () => {
      this.makeDay();
    });
  }

  // Create individual project card
  createProjectCard(project, index) {
    // Main card container
    const cardDiv = doc.createElement("div");
    cardDiv.className = "project-card";
    cardDiv.setAttribute("data-project-id", project.id);

    // Image container
    const imageDiv = doc.createElement("div");
    imageDiv.className = "project-image-container";
    const projectImg = doc.createElement("img");
    projectImg.src = project.image;
    projectImg.alt = project.title;
    imageDiv.appendChild(projectImg);

    // Content container
    const contentDiv = doc.createElement("div");
    contentDiv.className = "project-content";

    // Title
    const titleDiv = doc.createElement("div");
    titleDiv.className = "project-title";
    titleDiv.textContent = project.title;

    // Description
    const descriptionDiv = doc.createElement("div");
    descriptionDiv.className = "project-description";
    descriptionDiv.textContent = project.description;

    // Tags container
    const tagsDiv = doc.createElement("div");
    tagsDiv.className = "project-tags";

    // Create tags
    project.tags.forEach((tag) => {
      const tagSpan = doc.createElement("span");
      tagSpan.className = "project-tag";
      tagSpan.textContent = tag;
      tagsDiv.appendChild(tagSpan);
    });

    // Action buttons container
    const actionsDiv = doc.createElement("div");
    actionsDiv.className = "project-actions";

    // View Details button
    const detailsButton = doc.createElement("button");
    detailsButton.className = "project-details-btn";
    detailsButton.textContent = "View Details";
    addEventListeners(detailsButton, () => {
      this.toggleProjectCard(project.id);
    });

    // GitHub button
    const githubButton = doc.createElement("button");
    githubButton.className = "project-github-btn";
    githubButton.innerHTML = `
            <svg class="github-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        `;
    addEventListeners(githubButton, () => {
      window.open(project.github, "_blank").focus();
    });

    // Add buttons to actions container
    actionsDiv.appendChild(detailsButton);
    actionsDiv.appendChild(githubButton);

    // Live demo link
    const liveDemoLink = doc.createElement("a");
    liveDemoLink.className = "project-live-demo";
    liveDemoLink.href = project.liveDemo;
    liveDemoLink.target = "_blank";
    liveDemoLink.rel = "noopener noreferrer";
    liveDemoLink.textContent = "View Live Demo →";
    addEventListeners(liveDemoLink, (e) => {
      e.preventDefault();
      window.open(project.liveDemo, "_blank").focus();
    });

    // Assemble content
    contentDiv.appendChild(titleDiv);
    contentDiv.appendChild(descriptionDiv);
    contentDiv.appendChild(tagsDiv);
    contentDiv.appendChild(actionsDiv);
    contentDiv.appendChild(liveDemoLink);

    // Assemble card
    cardDiv.appendChild(imageDiv);
    cardDiv.appendChild(contentDiv);

    // Add image expand button
    const expandButton = doc.createElement("button");
    expandButton.className = "project-image-expand-btn";
    expandButton.innerHTML = "⛶";
    expandButton.title = "Expand image";

    // Add close button for expanded card
    const closeButton = doc.createElement("button");
    closeButton.className = "project-close-btn";
    closeButton.innerHTML = "×";
    closeButton.style.display = "none";

    // Create image modal
    const imageModal = doc.createElement("div");
    imageModal.className = "project-image-modal";
    imageModal.innerHTML = `
            <div class="project-image-modal-content">
                <img src="${project.image}" alt="${project.title}">
                <button class="modal-close-btn">×</button>
            </div>
        `;

    // Add event listeners
    addEventListeners(expandButton, () => {
      imageModal.classList.add("active");
      document.body.style.overflow = "hidden";
    });

    addEventListeners(imageModal.querySelector(".modal-close-btn"), () => {
      imageModal.classList.remove("active");
      document.body.style.overflow = "";
    });

    addEventListeners(closeButton, () => {
      this.toggleProjectCard(project.id);
    });

    // Add elements to card
    imageDiv.appendChild(expandButton);
    contentDiv.appendChild(closeButton);
    cardDiv.appendChild(imageModal);

    // Show/hide close button based on expanded state
    cardDiv.addEventListener("animationend", () => {
      if (cardDiv.classList.contains("expanded")) {
        closeButton.style.display = "flex";
      } else {
        closeButton.style.display = "none";
      }
    });

    // Close Modal
    addEventListeners(imageModal, (e) => {
      if (e.target === imageModal) {
        imageModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    return cardDiv;
  }

  // Append elements to the DOM
  assembleElements() {
    this.frameDiv.appendChild(this.projectsGridDiv);
    this.div.appendChild(this.frameDiv);
    this.div.appendChild(this.footerComponent.getDiv());
  }

  // Initialize text content for the panel
  initializeContent() {
    this.headerTitleDiv.textContent = "My Projects";
    this.headerSubtitleDiv.textContent =
      "A collection of projects I've built, featuring modern technologies and clean design principles.";
  }

  // Create and assemble panel elements
  initialize() {
    this.createElements();
    this.assembleElements();
    this.initializeContent();

    // Set panel class
    this.div.className = divId;

    // Initialization complete
    this.initialized = true;
  }
}

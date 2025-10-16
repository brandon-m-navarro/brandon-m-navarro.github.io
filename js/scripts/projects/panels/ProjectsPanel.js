/**
 * ProjectsPanel.js
 * 
 * The ProjectsPanel class is responsible for creating and managing the
 * projects panel within the application. It extends the BasePanel class
 * and provides methods for initializing the panel and handling projects display.
 */
'use strict';

import BasePanel from '../../BasePanel.js';
import Images from '../../Images.js';
import { addEventListeners } from '../../utils/Utilities.js';

let
    // DOM elements
    doc = window.document,

    // DOM IDs (must be unique)
    baseId = 'projects-panel',
    divId = baseId + '-div',
    frameDivId = baseId + '-frame-div',

    // Local variables
    showClassElement = 'show-element',

    // Singleton reference
    self;

// Projects data
const projects = [
    {
        id: "1",
        title: "NextJS Dashboard",
        description: "A comprehensive dashboard application built as my introduction to Next.js, following the official Next.js tutorial. This project served as a hands-on learning experience for modern React frameworks and full-stack development patterns.",
        image: "/dashboard.png",
        link: "/",
        tags: ["Authentication", "Next.js", "Postgres"],
        github: "https://github.com/brandon-m-navarro/nextjs-dashboard",
        liveDemo: "https://nextjs-dashboard-sigma-eight-57.vercel.app/"
    },
    {
        id: "2",
        title: "Task Management App",
        description: "A full-stack task management web application built with Next.js, featuring a responsive design and real-time optimistic updates. The app enables users to efficiently organize tasks within projects, with intuitive filtering, sorting, and seamless cross-device synchronization.",
        image: "/todo.png",
        link: "/",
        tags: ["Next.js", "TypeScript", "Tailwind", "Postgres"],
        github: "https://github.com/brandon-m-navarro/nextjs-todo",
        liveDemo: "https://nextjs-todo-lake.vercel.app/"
    },
    {
        id: "3",
        title: "Portfolio Site",
        description: "A client-side application hosted on GitHub Pages, built with ES6 classes and inheritance patterns to promote code reusability and scalable architecture through object-oriented design principles.",
        image: "/portfolio.png",
        link: "/",
        tags: ["JS (ES6)", "CSS3", "SVG"],
        github: "https://github.com/brandon-m-navarro/brandon-m-navarro.github.io",
        liveDemo: "https://brandon-m-navarro.github.io/"
    }
];

// Class
export default class ProjectsPanel extends BasePanel {

    // Constructor
    constructor() {
        // Preserve instance reference and enforce singleton
        if (typeof self === 'object') {
            return self;
        } else {
            super();
            self = this;
        }
    }

    // Public Methods

    makeNight() {
        localStorage.setItem("mode", "dark");
        
        this.div.classList.add('dark');
        this.frameDiv.classList.add('dark');
        this.headerDiv.classList.add('dark');
        this.projectsGridDiv.classList.add('dark');
        
        // Update all project cards for dark mode
        const projectCards = this.projectsGridDiv.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.classList.add('dark');
        });
        
        // Update tags for dark mode
        const tagSpans = this.projectsGridDiv.querySelectorAll('.project-tag');
        tagSpans.forEach(tag => {
            tag.classList.add('dark');
        });
    }

    makeDay() {
        localStorage.setItem("mode", "light");
        
        this.div.classList.remove('dark');
        this.frameDiv.classList.remove('dark');
        this.headerDiv.classList.remove('dark');
        this.projectsGridDiv.classList.remove('dark');
        
        // Update all project cards for light mode
        const projectCards = this.projectsGridDiv.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.classList.remove('dark');
        });
        
        // Update tags for light mode
        const tagSpans = this.projectsGridDiv.querySelectorAll('.project-tag');
        tagSpans.forEach(tag => {
            tag.classList.remove('dark');
        });
    }

    // Create elements used on the panel
    createElements() {
        this.frameDiv = doc.createElement('div');
        
        // Header section
        this.headerDiv = doc.createElement('div');
        this.headerTitleDiv = doc.createElement('div');
        this.headerSubtitleDiv = doc.createElement('div');
        
        // Projects grid
        this.projectsGridDiv = doc.createElement('div');
        
        // Create project cards
        this.projectCards = [];
        projects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, index);
            this.projectCards.push(projectCard);
            this.projectsGridDiv.appendChild(projectCard);
        });
        
        // Assemble header
        this.headerDiv.appendChild(this.headerTitleDiv);
        this.headerDiv.appendChild(this.headerSubtitleDiv);
        
        // Assemble main content
        this.frameDiv.appendChild(this.headerDiv);
        this.frameDiv.appendChild(this.projectsGridDiv);
    }

    // Create individual project card
    createProjectCard(project, index) {
        const images = new Images();
        
        // Main card container
        const cardDiv = doc.createElement('div');
        cardDiv.className = 'project-card';
        
        // Image container
        const imageDiv = doc.createElement('div');
        imageDiv.className = 'project-image-container';
        const projectImg = doc.createElement('img');
        projectImg.src = project.image;
        projectImg.alt = project.title;
        imageDiv.appendChild(projectImg);
        
        // Content container
        const contentDiv = doc.createElement('div');
        contentDiv.className = 'project-content';
        
        // Title
        const titleDiv = doc.createElement('div');
        titleDiv.className = 'project-title';
        titleDiv.textContent = project.title;
        
        // Description
        const descriptionDiv = doc.createElement('div');
        descriptionDiv.className = 'project-description';
        descriptionDiv.textContent = project.description;
        
        // Tags container
        const tagsDiv = doc.createElement('div');
        tagsDiv.className = 'project-tags';
        
        // Create tags
        project.tags.forEach(tag => {
            const tagSpan = doc.createElement('span');
            tagSpan.className = 'project-tag';
            tagSpan.textContent = tag;
            tagsDiv.appendChild(tagSpan);
        });
        
        // Action buttons container
        const actionsDiv = doc.createElement('div');
        actionsDiv.className = 'project-actions';
        
        // View Details button
        const detailsButton = doc.createElement('button');
        detailsButton.className = 'project-details-btn';
        detailsButton.textContent = 'View Details';
        addEventListeners(detailsButton, () => {
            // Navigate to project details - you'll need to implement this based on your routing
            console.log('Navigate to:', project.link);
        });
        
        // GitHub button
        const githubButton = doc.createElement('button');
        githubButton.className = 'project-github-btn';
        githubButton.innerHTML = `
            <svg class="github-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
        `;
        addEventListeners(githubButton, () => {
            window.open(project.github, '_blank').focus();
        });
        
        // Add buttons to actions container
        actionsDiv.appendChild(detailsButton);
        actionsDiv.appendChild(githubButton);
        
        // Live demo link
        const liveDemoLink = doc.createElement('a');
        liveDemoLink.className = 'project-live-demo';
        liveDemoLink.href = project.liveDemo;
        liveDemoLink.target = '_blank';
        liveDemoLink.rel = 'noopener noreferrer';
        liveDemoLink.textContent = 'View Live Demo →';
        addEventListeners(liveDemoLink, (e) => {
            e.preventDefault();
            window.open(project.liveDemo, '_blank').focus();
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
        
        return cardDiv;
    }

    // Append elements to the DOM
    assembleElements() {
        this.frameDiv.appendChild(this.projectsGridDiv);
        this.div.appendChild(this.frameDiv);
    }

    // Create and assemble panel elements
    initialize() {
        // Create needed HTML elements
        this.createElements();

        // Assemble elements
        this.assembleElements();

        // Set content
        this.headerTitleDiv.textContent = 'My Projects';
        this.headerSubtitleDiv.textContent = "A collection of projects I've built, featuring modern technologies and clean design principles.";

        // Assign IDs and classes
        this.div.setAttribute('id', divId);
        this.frameDiv.setAttribute('id', frameDivId);
        this.headerDiv.className = 'projects-header';
        this.headerTitleDiv.className = 'projects-main-title';
        this.headerSubtitleDiv.className = 'projects-subtitle';
        this.projectsGridDiv.className = 'projects-grid';

        // Initialization complete
        this.initialized = true;
    }
}

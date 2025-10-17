/**
 * HomePanel.js
 *
 * The HomePanel class is a singleton that extends BasePanel.
 * It is responsible for creating and managing the home panel
 * of the application, which includes various components such
 * as pictures, information about the developer, and contact information.
 * 
 */
'use strict';

// Imports
import BasePanel from '../../BasePanel.js';
import Picture from '../../components/Picture.js';
import Images from '../../Images.js';
import NightSky from '../../components/NightSky.js'
import FooterComponent from '../../components/Footer.js';
import { debounce, addEventListeners } from '../../utils/Utilities.js';

// Create images instance
const images = new Images();

// Create local variables
let doc = window.document,

    // Local variables
    showClassElement = 'show-element',

    // Singleton reference
    self;

// Class
export default class HomePanel extends BasePanel {

    // Constructor
    constructor () {

        // Preserve instance reference and enforce singleton
        if (typeof self === 'object') {
            return self;
        } else {
            super();
            self = this;
        }

        // Initialize footer component
        this.footerComponent = new FooterComponent();

        // Create and append elements
        this.initialize();

        // Listen for mode changes from footer
        this.footerComponent.getDiv().addEventListener('dark', () => {
            this.makeNight();
        });
        
        this.footerComponent.getDiv().addEventListener('light', () => {
            this.makeDay();
        });
    }

    // Create handler for resizing Mountain svg for window resizes 
    handleResize () {
        const pathGroup = window.document.getElementById('paths');
        if (typeof pathGroup !== 'undefined' && pathGroup !== null) {
            pathGroup.style.transform = 'scaleX(' + window.innerWidth / 9 + '%)';
        }
    }

    // Set the SVGs for the panel. This is called after the panel is
    // initialized to ensure the SVGs are set and displayed correctly.
    setSvgs () {
        this.sunMtnSvg = doc.getElementById('sun-mtn');
        this.sunMtnSvg.style.display = 'block';
        this.mtnSunSvgDiv.appendChild(this.sunMtnSvg);
    };

    // Make Day Mode (change colors, remove night sky, etc.)
    makeDay () {
        // Set localStorage to light mode
        localStorage.setItem("mode", "light");

        // Remove night sky from DOM (topDiv)
        if (this.nightSky && this.nightSky.getDiv()) {
            this.nightSky.getDiv().remove();
        }

        // Get SVG layers to update colors
        this.mtnMoonSun = doc.getElementById('mtn-moon-sun');
        this.mtnLayer1 = doc.getElementById('mtn-layer1');
        this.mtnLayer2 = doc.getElementById('mtn-layer2');
        this.mtnLayer3 = doc.getElementById('mtn-layer3');
        this.mtnLayer4 = doc.getElementById('mtn-layer4');
        this.mtnLayer5 = doc.getElementById('mtn-layer5');
        this.mtnLayer6 = doc.getElementById('mtn-layer6');
        this.mtnLayer7 = doc.getElementById('mtn-layer7');

        // Set colors for day mode
        if (this.mtnMoonSun) this.mtnMoonSun.setAttribute('fill', '#FFD102');
        if (this.mtnLayer1) this.mtnLayer1.setAttribute('fill', '#E72C27');
        if (this.mtnLayer2) this.mtnLayer2.setAttribute('fill', '#C72423');
        if (this.mtnLayer3) this.mtnLayer3.setAttribute('fill', '#A81C1F');
        if (this.mtnLayer4) this.mtnLayer4.setAttribute('fill', '#8A161A');
        if (this.mtnLayer5) this.mtnLayer5.setAttribute('fill', '#6D1015');
        if (this.mtnLayer6) this.mtnLayer6.setAttribute('fill', '#510B0E');
        if (this.mtnLayer7) this.mtnLayer7.setAttribute('fill', '#370601');

        // Update footer
        this.footerComponent.makeDay();

        // Remove dark class from elements
        this.welcomeTextDiv.classList.remove('dark');
        this.frameDiv.classList.remove('dark');
        this.div.classList.remove('dark');
    };

    // Make Night Mode (change colors, add night sky, etc.)
    makeNight () {
        // Set localStorage to dark mode
        localStorage.setItem("mode", "dark");

        // Start night sky
        this.nightSky.start();

        // Add night sky to topDiv
        this.topDiv.appendChild(this.nightSky.getDiv());

        // Get SVG layers to update colors
        this.mtnMoonSun = doc.getElementById('mtn-moon-sun');
        this.mtnLayer1 = doc.getElementById('mtn-layer1');
        this.mtnLayer2 = doc.getElementById('mtn-layer2');
        this.mtnLayer3 = doc.getElementById('mtn-layer3');
        this.mtnLayer4 = doc.getElementById('mtn-layer4');
        this.mtnLayer5 = doc.getElementById('mtn-layer5');
        this.mtnLayer6 = doc.getElementById('mtn-layer6');
        this.mtnLayer7 = doc.getElementById('mtn-layer7');

        // Set colors for night mode
        if (this.mtnMoonSun) this.mtnMoonSun.setAttribute('fill', '#F5E3B3');
        if (this.mtnLayer1) this.mtnLayer1.setAttribute('fill', '#020916');
        if (this.mtnLayer2) this.mtnLayer2.setAttribute('fill', '#0A111C');
        if (this.mtnLayer3) this.mtnLayer3.setAttribute('fill', '#101622');
        if (this.mtnLayer4) this.mtnLayer4.setAttribute('fill', '#151B28');
        if (this.mtnLayer5) this.mtnLayer5.setAttribute('fill', '#1A202F');
        if (this.mtnLayer6) this.mtnLayer6.setAttribute('fill', '#1F2435');
        if (this.mtnLayer7) this.mtnLayer7.setAttribute('fill', '#25293C');

        // Update footer
        this.footerComponent.makeNight();

        // Add dark class to elements
        this.welcomeTextDiv.classList.add('dark');
        this.frameDiv.classList.add('dark');
        this.div.classList.add('dark');
    };

    // Create elements used on the panel
    createElements () {
        this.frameDiv = doc.createElement('div');

        this.topDiv = doc.createElement('div');

        this.mtnSunSvgDiv = doc.createElement('div');

        // Hero section with image and welcome text
        this.heroDiv = doc.createElement('div');
        this.heroImageDiv = doc.createElement('div');
        this.heroImage = doc.createElement('img');
        this.heroTextDiv = doc.createElement('div');
        this.welcomeTextDiv = doc.createElement('div');

        // Cards container
        this.cardsContainerDiv = doc.createElement('div');

        // Numbered cards
        this.card1 = this.createNumberedCard(1, 'Research & Wireframing', 
            'After documenting requirements to fully understand the problem space, I conduct competitive analysis and UI research. This informs the creation of detailed wireframes and mockups that help identify overlooked requirements and effectively communicate vision to stakeholders.');
        
        this.card2 = this.createNumberedCard(2, 'Feedback & Collaboration', 
            'With wireframes established, I facilitate collaborative review sessions with cross-functional teams. This iterative feedback process not only enhances design quality but also fosters team alignment and creates an environment that values diverse perspectives.');
        
        this.card3 = this.createNumberedCard(3, 'Refinement & Prototyping', 
            'Incorporating team feedback, I evolve wireframes into high-fidelity prototypes with interactive elements. This stage focuses on usability testing, visual polish, and preparing assets for development handoff.');
        
        this.card4 = this.createNumberedCard(4, 'Experimentation & Learning', 
            'I embrace calculated experimentation to push creative boundaries. While not every concept succeeds, each iteration provides valuable insights that drive innovation and continuous improvement in the design process.');

        // About section
        this.aboutDiv = doc.createElement('div');
        this.aboutHeaderDiv = doc.createElement('div');
        this.aboutContentDiv = doc.createElement('div');
        this.aboutText1 = doc.createElement('p');
        this.aboutText2 = doc.createElement('p');
        this.aboutText3 = doc.createElement('p');

        // Images gallery
        this.galleryDiv = doc.createElement('div');
        this.galleryLeftDiv = doc.createElement('div');
        this.galleryRightDiv = doc.createElement('div');
        
        this.image1 = this.createImageWithCaption('skydive', 'Me skydiving in Swakopmund, Namibia during my IQP');
        this.image2 = this.createImageWithCaption('hout_bay', 'View of Hout Bay in Cape Town, South Africa');
        this.image3 = this.createImageWithCaption('hershey', 'Hershey the dog being photogenic');

        this.nightSky = new NightSky();
    };

    // Create numbered card component
    createNumberedCard(number, title, content) {
        const cardDiv = doc.createElement('div');
        cardDiv.className = 'numbered-card';

        const numberDiv = doc.createElement('div');
        numberDiv.className = 'card-number';
        numberDiv.textContent = number;

        const titleDiv = doc.createElement('div');
        titleDiv.className = 'card-title';
        titleDiv.textContent = title;

        const contentDiv = doc.createElement('div');
        contentDiv.className = 'card-content';
        contentDiv.textContent = content;

        cardDiv.appendChild(numberDiv);
        cardDiv.appendChild(titleDiv);
        cardDiv.appendChild(contentDiv);

        return cardDiv;
    }

    // Create image with caption component
    createImageWithCaption(imageKey, caption) {
        const containerDiv = doc.createElement('div');
        containerDiv.className = 'image-container';

        const img = doc.createElement('img');
        img.src = images.getImages()[imageKey].src;
        img.alt = caption;

        const captionSpan = doc.createElement('span');
        captionSpan.className = 'image-caption';
        captionSpan.textContent = caption;

        containerDiv.appendChild(img);
        containerDiv.appendChild(captionSpan);

        return containerDiv;
    }

    // Append elements to the DOM
    assembleElements () {
        // Hero section
        this.heroImageDiv.appendChild(this.heroImage);
        this.heroTextDiv.appendChild(this.welcomeTextDiv);
        this.heroDiv.appendChild(this.heroImageDiv);
        this.heroDiv.appendChild(this.heroTextDiv);

        // Top section with mountains and hero
        this.topDiv.appendChild(this.mtnSunSvgDiv);
        this.topDiv.appendChild(this.heroDiv);

        // Cards
        this.cardsContainerDiv.appendChild(this.card1);
        this.cardsContainerDiv.appendChild(this.card2);
        this.cardsContainerDiv.appendChild(this.card3);
        this.cardsContainerDiv.appendChild(this.card4);

        // About section
        this.aboutContentDiv.appendChild(this.aboutText1);
        this.aboutContentDiv.appendChild(this.aboutText2);
        this.aboutContentDiv.appendChild(this.aboutText3);
        this.aboutDiv.appendChild(this.aboutHeaderDiv);
        this.aboutDiv.appendChild(this.aboutContentDiv);

        // Gallery
        this.galleryLeftDiv.appendChild(this.image1);
        this.galleryRightDiv.appendChild(this.image2);
        this.galleryRightDiv.appendChild(this.image3);
        this.galleryDiv.appendChild(this.galleryLeftDiv);
        this.galleryDiv.appendChild(this.galleryRightDiv);

        // Assemble main content
        this.frameDiv.appendChild(this.topDiv);
        this.frameDiv.appendChild(this.cardsContainerDiv);
        this.frameDiv.appendChild(this.aboutDiv);
        this.frameDiv.appendChild(this.galleryDiv);

        // Add footer and main content to panel
        this.div.appendChild(this.frameDiv);
        this.div.appendChild(this.footerComponent.getDiv());
    };

    // Create and assemble panel elements
    initialize () {
        // Create needed HTML elements
        this.createElements();

        // Assemble elements
        this.assembleElements();

        // Handle sizing Mountains svg to window size
        const eventHandler = debounce(this.handleResize);
        window.addEventListener('resize', eventHandler);

        // Ensure SVG is appropriately sized on initial load
        this.handleResize();

        // Set content
        this.welcomeTextDiv.innerHTML = 
            'Welcome to my portfolio, built with modern technologies ' +
            'including React, Next.js, and Tailwind CSS. Thanks for stopping by!';

        this.aboutHeaderDiv.innerHTML = 'About';
        this.aboutText1.innerHTML =
            'During my sophomore year of college, I joined TrampleZone, a small ' +
            'startup where I collaborated with fellow students to enhance ' +
            'HotSpots—a desktop and mobile application that utilized ' +
            'OpenStreetMaps to enable users to rate and review local venues.';
        this.aboutText2.innerHTML =
            'Several months into my role, we embarked on developing MyChapter, a ' +
            'new application focused on Greek life organizations. Under the ' +
            'mentorship of founder Jim, I contributed to system architecture by ' +
            'creating UML diagrams and took ownership of frontend design and ' +
            'implementation. After graduating during the COVID-19 pandemic, I ' +
            'transitioned to a full-time software engineering position at ' +
            'TrampleZone, where I continued developing MyChapter and conducted ' +
            'pilot testing with multiple fraternities at my alma mater.';
        this.aboutText3.innerHTML =
            'Beyond my professional work, I enjoy exploring Somerville through ' +
            'walking and running routes, participating in local basketball ' +
            'recreational leagues, and embarking on backpacking hikes when ' +
            'visiting family in New Hampshire.';

        // Set images
        this.heroImage.src = images.getImages()['me_sitting'].src;

        // Assign classes
        this.div.className = 'home-panel';
        this.frameDiv.className = 'home-frame';
        this.heroDiv.className = 'hero-section';
        this.heroImageDiv.className = 'hero-image-container';
        this.heroTextDiv.className = 'hero-text-container';
        this.welcomeTextDiv.className = 'welcome-text';
        this.cardsContainerDiv.className = 'cards-container';
        this.aboutDiv.className = 'about-section';
        this.aboutHeaderDiv.className = 'about-header';
        this.aboutContentDiv.className = 'about-content';
        this.galleryDiv.className = 'gallery-section';
        this.galleryLeftDiv.className = 'gallery-left';
        this.galleryRightDiv.className = 'gallery-right';

        // Set SVG after DOM is ready
        setTimeout(() => {
            this.setSvgs();
        }, 100);

        // Initialization complete
        this.initialized = true;
    };
    
    // Cleanup method
    destroy() {
        if (this.footerComponent) {
            this.footerComponent.destroy();
        }
    }
}

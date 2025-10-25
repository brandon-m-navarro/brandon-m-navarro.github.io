"use strict";

import BasePanel from "../../BasePanel.js";
import Images from "../../Images.js";
import NightSky from "../../components/NightSky.js";
import FooterComponent from "../../components/Footer.js";
import { debounce, addEventListeners } from "../../utils/Utilities.js";

const images = new Images();
let doc = window.document,
  showClassElement = "show-element",
  self;

export default class HomePanel extends BasePanel {
  constructor() {
    if (typeof self === "object") {
      return self;
    } else {
      super();
      self = this;
    }

    this.initialize();
  }

  handleResize() {
    const pathGroup = window.document.getElementById("paths");
    if (typeof pathGroup !== "undefined" && pathGroup !== null) {
      pathGroup.style.transform = "scaleX(" + window.innerWidth / 9 + "%)";
    }
  }

  setSvgs() {
    this.sunMtnSvg = doc.getElementById("sun-mtn");
    this.sunMtnSvg.style.display = "block";
    this.mtnSunSvgDiv.appendChild(this.sunMtnSvg);
  }

  makeDay() {
    localStorage.setItem("mode", "light");
    if (this.nightSky && this.nightSky.getDiv()) {
      this.nightSky.getDiv().remove();
    }

    this.mtnMoonSun = doc.getElementById("mtn-moon-sun");
    this.mtnLayer1 = doc.getElementById("mtn-layer1");
    this.mtnLayer2 = doc.getElementById("mtn-layer2");
    this.mtnLayer3 = doc.getElementById("mtn-layer3");
    this.mtnLayer4 = doc.getElementById("mtn-layer4");
    this.mtnLayer5 = doc.getElementById("mtn-layer5");
    this.mtnLayer6 = doc.getElementById("mtn-layer6");
    this.mtnLayer7 = doc.getElementById("mtn-layer7");

    if (this.mtnMoonSun) this.mtnMoonSun.setAttribute("fill", "#FFD102");
    if (this.mtnLayer1) this.mtnLayer1.setAttribute("fill", "#E72C27");
    if (this.mtnLayer2) this.mtnLayer2.setAttribute("fill", "#C72423");
    if (this.mtnLayer3) this.mtnLayer3.setAttribute("fill", "#A81C1F");
    if (this.mtnLayer4) this.mtnLayer4.setAttribute("fill", "#8A161A");
    if (this.mtnLayer5) this.mtnLayer5.setAttribute("fill", "#6D1015");
    if (this.mtnLayer6) this.mtnLayer6.setAttribute("fill", "#510B0E");
    if (this.mtnLayer7) this.mtnLayer7.setAttribute("fill", "#370601");

    this.footerComponent.makeDay();
    this.frameDiv.classList.remove("dark");
    this.div.classList.remove("dark");
  }

  makeNight() {
    localStorage.setItem("mode", "dark");
    this.nightSky.start();
    this.topDiv.appendChild(this.nightSky.getDiv());

    this.mtnMoonSun = doc.getElementById("mtn-moon-sun");
    this.mtnLayer1 = doc.getElementById("mtn-layer1");
    this.mtnLayer2 = doc.getElementById("mtn-layer2");
    this.mtnLayer3 = doc.getElementById("mtn-layer3");
    this.mtnLayer4 = doc.getElementById("mtn-layer4");
    this.mtnLayer5 = doc.getElementById("mtn-layer5");
    this.mtnLayer6 = doc.getElementById("mtn-layer6");
    this.mtnLayer7 = doc.getElementById("mtn-layer7");

    if (this.mtnMoonSun) this.mtnMoonSun.setAttribute("fill", "#F5E3B3");
    if (this.mtnLayer1) this.mtnLayer1.setAttribute("fill", "#020916");
    if (this.mtnLayer2) this.mtnLayer2.setAttribute("fill", "#0A111C");
    if (this.mtnLayer3) this.mtnLayer3.setAttribute("fill", "#101622");
    if (this.mtnLayer4) this.mtnLayer4.setAttribute("fill", "#151B28");
    if (this.mtnLayer5) this.mtnLayer5.setAttribute("fill", "#1A202F");
    if (this.mtnLayer6) this.mtnLayer6.setAttribute("fill", "#1F2435");
    if (this.mtnLayer7) this.mtnLayer7.setAttribute("fill", "#25293C");

    this.footerComponent.makeNight();
    this.frameDiv.classList.add("dark");
    this.div.classList.add("dark");
  }

  createElements() {
    this.frameDiv = doc.createElement("div");
    this.frameDiv.className = "home-frame";

    this.topDiv = doc.createElement("div");
    this.topDiv.className = "top-section";

    this.reactDiv = doc.createElement("div");
    this.reactDiv.className = 'react-div';
    this.reactTextDiv = doc.createElement("div");
    this.reactImg = doc.createElement("img");
    this.reactTextDiv.innerHTML = "View site built using React & Typescript";
    this.reactImg.src = images.getImages()["react-b"].altSrc;

    this.reactDiv.appendChild(this.reactImg);
    this.reactDiv.appendChild(this.reactTextDiv);

    this.mtnSunSvgDiv = doc.createElement("div");
    this.mtnSunSvgDiv.className = "mtn-sun-svg-container";

    this.meDiv = doc.createElement("div");
    this.meDiv.className = "hero-section";

    this.meImgDiv = doc.createElement("div");
    this.meImgDiv.className = "hero-image-container";
    this.meImg = doc.createElement("img");

    this.meAboutTextDiv = doc.createElement("div");
    this.meAboutTextDiv.className = "hero-text-container";

    this.cardsContainerDiv = doc.createElement("div");
    this.cardsContainerDiv.className = "cards-container";

    this.card1 = this.createNumberedCard(
      1,
      "Research & Wireframing",
      "After documenting requirements to fully understand the problem space, I conduct competitive analysis and UI research. This informs the creation of detailed wireframes and mockups that help identify overlooked requirements and effectively communicate vision to stakeholders."
    );

    this.card2 = this.createNumberedCard(
      2,
      "Feedback & Collaboration",
      "With wireframes established, I facilitate collaborative review sessions with cross-functional teams. This iterative feedback process not only enhances design quality but also fosters team alignment and creates an environment that values diverse perspectives."
    );

    this.card3 = this.createNumberedCard(
      3,
      "Refinement & Prototyping",
      "Incorporating team feedback, I evolve wireframes into high-fidelity prototypes with interactive elements. This stage focuses on usability testing, visual polish, and preparing assets for development handoff."
    );

    this.card4 = this.createNumberedCard(
      4,
      "Experimentation & Learning",
      "I embrace calculated experimentation to push creative boundaries. While not every concept succeeds, each iteration provides valuable insights that drive innovation and continuous improvement in the design process."
    );

    this.aboutDiv = doc.createElement("div");
    this.aboutDiv.className = "about-section";
    this.aboutHeaderDiv = doc.createElement("div");
    this.aboutHeaderDiv.className = "about-header";
    this.aboutContentDiv = doc.createElement("div");
    this.aboutContentDiv.className = "about-content";
    this.aboutText1 = doc.createElement("p");
    this.aboutText1.className = "about-text";
    this.aboutText2 = doc.createElement("p");
    this.aboutText2.className = "about-text";
    this.aboutText3 = doc.createElement("p");
    this.aboutText3.className = "about-text";

    this.galleryDiv = doc.createElement("div");
    this.galleryDiv.className = "gallery-section";
    this.galleryLeftDiv = doc.createElement("div");
    this.galleryLeftDiv.className = "gallery-left";
    this.galleryRightDiv = doc.createElement("div");
    this.galleryRightDiv.className = "gallery-right";

    this.image1 = this.createImageWithCaption(
      "skydive",
      "Me skydiving in Swakopmund, Namibia during my IQP"
    );
    this.image2 = this.createImageWithCaption(
      "hershey",
      "Hershey the dog being photogenic"
    );
    this.image3 = this.createImageWithCaption(
      "hout_bay",
      "View of Hout Bay in Cape Town, South Africa"
    );

    this.nightSky = new NightSky();

    this.footerComponent = new FooterComponent();
  }

  createNumberedCard(number, title, content) {
    const cardDiv = doc.createElement("div");
    cardDiv.className = "numbered-card";

    const numberDiv = doc.createElement("div");
    numberDiv.className = "card-number";
    numberDiv.textContent = number;

    const titleDiv = doc.createElement("div");
    titleDiv.className = "card-title";
    titleDiv.textContent = title;

    const contentDiv = doc.createElement("div");
    contentDiv.className = "card-content";
    contentDiv.textContent = content;

    cardDiv.appendChild(numberDiv);
    cardDiv.appendChild(titleDiv);
    cardDiv.appendChild(contentDiv);

    return cardDiv;
  }

  createImageWithCaption(imageKey, caption) {
    const containerDiv = doc.createElement("div");
    containerDiv.className = "image-container";

    const img = doc.createElement("img");
    img.src = images.getImages()[imageKey].src;
    img.alt = caption;

    const captionSpan = doc.createElement("span");
    captionSpan.className = "image-caption";
    captionSpan.textContent = caption;

    containerDiv.appendChild(img);
    containerDiv.appendChild(captionSpan);

    return containerDiv;
  }

  assembleElements() {
    this.nightSky = new NightSky();

    this.meImgDiv.appendChild(this.meImg);
    this.meDiv.appendChild(this.meImgDiv);
    this.meDiv.appendChild(this.meAboutTextDiv);

    this.topDiv.appendChild(this.mtnSunSvgDiv);
    this.topDiv.appendChild(this.meDiv);
    this.topDiv.appendChild(this.reactDiv);

    this.cardsContainerDiv.appendChild(this.card1);
    this.cardsContainerDiv.appendChild(this.card2);
    this.cardsContainerDiv.appendChild(this.card3);
    this.cardsContainerDiv.appendChild(this.card4);

    this.aboutContentDiv.appendChild(this.aboutText1);
    this.aboutContentDiv.appendChild(this.aboutText2);
    this.aboutContentDiv.appendChild(this.aboutText3);
    this.aboutDiv.appendChild(this.aboutHeaderDiv);
    this.aboutDiv.appendChild(this.aboutContentDiv);

    this.galleryLeftDiv.appendChild(this.image1);
    this.galleryRightDiv.appendChild(this.image2);
    this.galleryRightDiv.appendChild(this.image3);
    this.galleryDiv.appendChild(this.galleryLeftDiv);
    this.galleryDiv.appendChild(this.galleryRightDiv);

    this.frameDiv.appendChild(this.topDiv);
    this.frameDiv.appendChild(this.cardsContainerDiv);
    this.frameDiv.appendChild(this.aboutDiv);
    this.frameDiv.appendChild(this.galleryDiv);

    this.div.appendChild(this.frameDiv);
    this.div.appendChild(this.footerComponent.getDiv());
  }

  attachListeners() {
    const eventHandler = debounce(this.handleResize);
    window.addEventListener("resize", eventHandler);
    this.reactDiv.addEventListener("click", () => {
        window.open("https://nextjs-site-sand.vercel.app", "_blank").focus();
    })
  }

  initializeContent() {
    this.meAboutTextDiv.innerHTML =
      "My name is Brandon. I'm a software engineer looking to expand " +
      "my knowledge in a close-knit, team environment. I've previously " +
      "worked at a small startup developing a mobile/web application " +
      "called MyChapter. My work was primarily focused on frontend " +
      "development, but I'm always looking to learn about new " +
      "frameworks, languages, and any other technology under the sun.";

    this.aboutHeaderDiv.innerHTML = "About";
    this.aboutText1.innerHTML =
      "During my sophomore year of college, I joined TrampleZone, a small " +
      "startup where I collaborated with fellow students to enhance " +
      "HotSpots—a desktop and mobile application that utilized " +
      "OpenStreetMaps to enable users to rate and review local venues.";
    this.aboutText2.innerHTML =
      "Several months into my role, we embarked on developing MyChapter, a " +
      "new application focused on Greek life organizations. Under the " +
      "mentorship of founder Jim, I contributed to system architecture by " +
      "creating UML diagrams and took ownership of frontend design and " +
      "implementation. After graduating during the COVID-19 pandemic, I " +
      "transitioned to a full-time software engineering position at " +
      "TrampleZone, where I continued developing MyChapter and conducted " +
      "pilot testing with multiple fraternities at my alma mater.";
    this.aboutText3.innerHTML =
      "Beyond my professional work, I enjoy exploring Somerville through " +
      "walking and running routes, participating in local basketball " +
      "recreational leagues, and embarking on backpacking hikes when " +
      "visiting family in New Hampshire.";
  }

  initializeStaticImages() {
    this.meImg.src = images.getImages()["me_sitting"].src;
  }

  initialize() {
    this.createElements();
    this.assembleElements();
    this.attachListeners();
    this.initializeContent();
    this.initializeStaticImages();

    // Initial mode setup
    const savedMode = localStorage.getItem("mode");
    if (savedMode === "dark") {
      this.makeNight();
    } else {
      this.makeDay();
    }

    // Initial resize handling
    this.handleResize();

    // Set panel class
    this.div.className = "home-panel";

    // Set SVG background
    this.setSvgs();

    this.initialized = true;
  }
}

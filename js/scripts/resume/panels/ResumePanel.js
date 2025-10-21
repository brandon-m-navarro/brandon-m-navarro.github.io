'use strict'

import BasePanel from "../../BasePanel.js";
import Icon from "../../components/Icon.js";
import ExpandableImage from "../../components/ExpandableImage.js";
import Images from "../../Images.js";
import SkillRating from "../../components/SkillRating.js";
import FooterComponent from "../../components/Footer.js";
import { addEventListeners } from "../../utils/Utilities.js";
import { URLS } from "../../utils/url-configs.js"
const images = new Images();

let // DOM elements
  doc = window.document,
  // Local variables
  showClassElement = "show-element",
  // Singleton reference
  self;

// Class
export default class ResumePanel extends BasePanel {
  // Constructor
  constructor() {
    // Preserve instance reference and enforce singleton
    if (typeof self === "object") {
      return self;
    } else {
      super();
      self = this;
    }
  }

  // Public Methods

  // Switch to night mode
  makeNight() {
    localStorage.setItem("mode", "dark");

    this.div.classList.add("dark");
    this.frameDiv.classList.add("dark");
    this.professionalDiv.classList.add("dark");
    this.professionalDiv2.classList.add("dark");
    this.projectDiv.classList.add("dark");

    // Update footer
    this.footerComponent.makeNight();

    // Change Icons
    this.imgs.forEach(({ element, key }) => {
      element.src = images.getImages()[key].altSrc;
    });

    // Change img elements
    this.icons.forEach(({ element, key }) => {
      element.setImage(images.getImages()[key].altSrc);
    });

    // Change <a>'s
    let aTags = Array.from(doc.getElementsByClassName("anchor"));
    aTags.forEach((aTag) => {
      aTag.classList.add("dark");
    });

    // Change SkillRatings
    this.skillRatings.forEach((skillRating) => {
      skillRating.setFillColor("#86467C");
    });
  }

  // Switch to day mode
  makeDay() {
    localStorage.setItem("mode", "light");

    this.div.classList.remove("dark");
    this.frameDiv.classList.remove("dark");
    this.professionalDiv.classList.remove("dark");
    this.professionalDiv2.classList.remove("dark");
    this.projectDiv.classList.remove("dark");

    // Update footer
    this.footerComponent.makeDay();

    // Change Icons
    this.imgs.forEach(({ element, key }) => {
      element.src = images.getImages()[key].src;
    });

    // Change img elements
    this.icons.forEach(({ element, key }) => {
      element.setImage(images.getImages()[key].src);
    });

    // Change <a>'s
    let aTags = Array.from(doc.getElementsByClassName("anchor"));
    aTags.forEach((aTag) => {
      aTag.classList.remove("dark");
    });

    // Change SkillRatings
    this.skillRatings.forEach((skillRating) => {
      skillRating.setFillColor("#0b3948");
    });
  }

  // Create elements used on the panel
  createElements() {
    this.frameDiv = doc.createElement("div");
    this.topDiv = doc.createElement("div");
    this.nameSubnameDiv = doc.createElement("div");
    this.meImgDiv = doc.createElement("div");
    this.meImg = doc.createElement("img");
    this.nameTextDiv = doc.createElement("div");
    this.subnameTextDiv = doc.createElement("div");
    this.leftDiv = doc.createElement("div");
    this.contactDiv = doc.createElement("div");
    this.contactTitleDiv = doc.createElement("div");
    this.contactTitleTextDiv = doc.createElement("div");
    this.contactEmailIcon = new Icon({
      img: images.getImages()["email"].src,
      text: "brandon.m.navarro@gmail.com",
      imgSize: "18px",
      fontSize: "12px",
    });
    this.locationIcon = new Icon({
      img: images.getImages()["location"].src,
      text: "Somerville, MA",
      imgSize: "18px",
      fontSize: "12px",
    });
    this.websiteIcon = new Icon({
      img: images.getImages()["github"].src,
      text: "https://brandon-m-navarro.github.io/",
      imgSize: "18px",
      fontSize: "12px",
    });
    this.linkedInIcon = new Icon({
      img: images.getImages()["linkedIn"].src,
      text: "brandon-m-navarro",
      imgSize: "18px",
      fontSize: "12px",
    });

    this.skillsDiv = doc.createElement("div");
    this.skillsTextDiv = doc.createElement("div");

    this.javascriptSkillRating =
        new SkillRating({ total: 5, fill: 4, label: "Javascript" });
    this.htmlSkillRating =
        new SkillRating({ total: 5, fill: 4, label: "HTML" });
    this.cssSkillRating =
        new SkillRating({ total: 5, fill: 4, label: "CSS" });
    this.typescriptSkillRating =
        new SkillRating({ total: 5, fill: 4, label: "Typescript" });
    this.sqlSkillRating =
        new SkillRating({ total: 5, fill: 2, label: "SQL" });
    this.javaSkillRating =
        new SkillRating({ total: 5, fill: 3, label: "Java" });
    this.cSkillRating =
        new SkillRating({ total: 5, fill: 2, label: "C" });
    this.pythonSkillRating =
        new SkillRating({ total: 5, fill: 2, label: "Python" });
    this.nodeSkillRating =
        new SkillRating({ total: 5, fill: 3, label: "Node" });
    this.phpSkillRating =
        new SkillRating({ total: 5, fill: 2, label: "PHP" });
    this.cplusSkillRating =
        new SkillRating({ total: 5, fill: 2, label: "C++" });
    this.windowsOsSkillRating =
        new SkillRating({ total: 5, fill: 4, label: "Windows" });
    this.macOsSkillRating =
        new SkillRating({ total: 5, fill: 3, label: "MacOS" });
    this.iOsSkillRating =
        new SkillRating({ total: 5, fill: 2, label: "iOS" });
    this.androidOsSkillRating =
        new SkillRating({ total: 5, fill: 2, label: "Android" });
    this.gitToolsSkillRating =
        new SkillRating({ total: 5, fill: 4, label: "Git" });
    this.dockerToolsSkillRating =
        new SkillRating({ total: 5, fill: 2, label: "Docker" });
    this.figmaToolsSkillRating =
        new SkillRating({ total: 5, fill: 5, label: "Figma" });
    this.adobePremiereToolsSkillRating =
        new SkillRating({ total: 5, fill: 3, label: "Adobe Premiere" });
    this.androidStudioToolsSkillRating =
        new SkillRating({ total: 5, fill: 2, label: "Android Studio" });
    this.requireFrameworkSkillRating =
        new SkillRating({ total: 5, fill: 4, label: "Require.js" });
    this.tailwindFrameworkSkillRating =
        new SkillRating({ total: 5, fill: 4, label: "TailwindCSS" });
    this.reactFrameworkSkillRating =
        new SkillRating({ total: 5, fill: 3, label: "React" });
    this.nextJsFrameworkSkillRating =
        new SkillRating({ total: 5, fill: 3, label: "Next.js" });

    this.programmingDiv = doc.createElement("div");
    this.programmingTitleTextDiv = doc.createElement("div");
    this.programmingListDiv = doc.createElement("div");

    this.osDiv = doc.createElement("div");
    this.osTitleTextDiv = doc.createElement("div");
    this.osListDiv = doc.createElement("div");

    this.toolsDiv = doc.createElement("div");
    this.toolsTitleTextDiv = doc.createElement("div");
    this.toolsListDiv = doc.createElement("div");

    this.frameworksDiv = doc.createElement("div");
    this.frameworksTitleTextDiv = doc.createElement("div");
    this.frameworksListDiv = doc.createElement("div");

    // Collect all SkillRatings into an array for easier access
    this.skillRatings = [
      this.javascriptSkillRating,
      this.htmlSkillRating,
      this.cssSkillRating,
      this.typescriptSkillRating,
      this.javaSkillRating,
      this.nodeSkillRating,
      this.phpSkillRating,
      this.pythonSkillRating,
      this.sqlSkillRating,
      this.cSkillRating,
      this.cplusSkillRating,
      this.windowsOsSkillRating,
      this.macOsSkillRating,
      this.iOsSkillRating,
      this.androidOsSkillRating,
      this.requireFrameworkSkillRating,
      this.tailwindFrameworkSkillRating,
      this.reactFrameworkSkillRating,
      this.nextJsFrameworkSkillRating,
      this.figmaToolsSkillRating,
      this.gitToolsSkillRating,
      this.adobePremiereToolsSkillRating,
      this.androidOsSkillRating,
      this.dockerToolsSkillRating,
    ];

    this.rightDiv = doc.createElement("div");
    this.educationDiv = doc.createElement("div");
    this.educationTitleDiv = doc.createElement("div");
    this.educationTitleIcon = new Icon({
      img: images.getImages()["education"].src,
      text: "EDUCATION",
      imgSize: "18px",
      fontSize: "14px",
      fontWeight: "600",
    });
    this.educationTopDiv = doc.createElement("div");
    this.educationDateLocationDiv = doc.createElement("div");
    this.educationDateIcon = new Icon({
      img: images.getImages()["calendar"].src,
      text: "2016 - 2020",
      imgSize: "18px",
      fontSize: "12px",
    });
    this.educationLocationIcon = new Icon({
      img: images.getImages()["location-2"].src,
      text: "Worcester, MA",
      imgSize: "18px",
      fontSize: "12px",
    });
    this.topRightEducationDiv = doc.createElement("div");
    this.bachelorsTextDiv = doc.createElement("div");
    this.gpaTextDiv = doc.createElement("div");

    this.campusInvolvementDiv = doc.createElement("div");
    this.campusInvolvementHeaderTextDiv = doc.createElement("div");
    this.campusInvolvementListDiv = doc.createElement("div");
    this.sigmaPiHeaderDiv = doc.createElement("div");
    this.sigmaPiDiv = doc.createElement("div");
    this.sigmaPiImgDiv = doc.createElement("div");
    this.sigmaPiImg = doc.createElement("img");
    this.sigmaPiTextDiv = doc.createElement("div");
    this.sigmaPiDateTextDiv = doc.createElement("div");
    this.sigmaPiUl = doc.createElement("ul");
    this.sigmaPiLi1 = doc.createElement("li");
    this.sigmaPiLi2 = doc.createElement("li");
    this.sigmaPiLi3 = doc.createElement("li");
    this.sigmaPiLi4 = doc.createElement("li");
    this.sparcHeaderDiv = doc.createElement("div");
    this.sparcDiv = doc.createElement("div");
    this.sparcImgDiv = doc.createElement("div");
    this.sparcImg = doc.createElement("img");
    this.sparcTextDiv = doc.createElement("div");
    this.sparcDateTextDiv = doc.createElement("div");
    this.sparcUl = doc.createElement("ul");
    this.sparcLi1 = doc.createElement("li");
    this.sparcLi2 = doc.createElement("li");
    this.sparcLi3 = doc.createElement("li");

    this.professionalTopDiv = doc.createElement("div");
    this.professionalDateLocationDiv = doc.createElement("div");
    this.professionalDateIcon = new Icon({
      img: images.getImages()["calendar"].src,
      text: "2018 - 2024",
      imgSize: "18px",
      fontSize: "12px",
    });
    this.professionalLocationIcon = new Icon({
      img: images.getImages()["location-2"].src,
      text: "Remote",
      imgSize: "18px",
      fontSize: "12px",
    });
    this.professionalJobDiv = doc.createElement("div");
    this.professionalJobTextDiv = doc.createElement("div");
    this.professionalJobTitleTextDiv = doc.createElement("div");
    this.professionalTextDiv = doc.createElement("div");
    this.professionalExtraDiv = doc.createElement("div");
    this.professionalImgDiv = doc.createElement("div");
    this.professionalImg = doc.createElement("img");
    this.professionalButtonsDiv = doc.createElement("div");

    this.appStoreButtonDiv = doc.createElement("div");
    this.appStoreImgDiv = doc.createElement("div");
    this.appStoreImg = doc.createElement("img");
    this.appStoreTextDiv = doc.createElement("div");
    this.appStoreSubtext = doc.createElement("div");
    this.appStoreText = doc.createElement("div");

    this.playStoreButtonDiv = doc.createElement("div");
    this.playStoreImgDiv = doc.createElement("div");
    this.playStoreImg = doc.createElement("img");
    this.playStoreTextDiv = doc.createElement("div");
    this.playStoreSubtext = doc.createElement("div");
    this.playStoreText = doc.createElement("div");

    this.professionalDiv = doc.createElement("div");
    this.professionalTitleDiv = doc.createElement("div");
    this.professionalTitleIcon = new Icon({
      img: images.getImages()["work"].src,
      text: "Professional Experience",
      imgSize: "18px",
      fontSize: "14px",
      fontWeight: "600",
    });

    this.professionalTopDiv2 = doc.createElement("div");
    this.professionalDateLocationDiv2 = doc.createElement("div");
    this.professionalDateIcon2 = new Icon({
      img: images.getImages()["calendar"].src,
      text: "2018 - 2024",
      imgSize: "18px",
      fontSize: "12px",
    });
    this.professionalLocationIcon2 = new Icon({
      img: images.getImages()["location-2"].src,
      text: "Remote",
      imgSize: "18px",
      fontSize: "12px",
    });
    this.professionalJobDiv2 = doc.createElement("div");
    this.professionalJobTextDiv2 = doc.createElement("div");
    this.professionalJobTitleTextDiv2 = doc.createElement("div");
    this.professionalTextDiv2 = doc.createElement("div");
    this.professionalExtraDiv2 = doc.createElement("div");
    this.professionalImgDiv2 = doc.createElement("div");
    this.professionalImg2 = doc.createElement("img");
    this.professionalButtonsDiv2 = doc.createElement("div");

    this.appStoreButtonDiv2 = doc.createElement("div");
    this.appStoreImgDiv2 = doc.createElement("div");
    this.appStoreImg2 = doc.createElement("img");
    this.appStoreTextDiv2 = doc.createElement("div");
    this.appStoreSubtext2 = doc.createElement("div");
    this.appStoreText2 = doc.createElement("div");

    this.playStoreButtonDiv2 = doc.createElement("div");
    this.playStoreImgDiv2 = doc.createElement("div");
    this.playStoreImg2 = doc.createElement("img");
    this.playStoreTextDiv2 = doc.createElement("div");
    this.playStoreSubtext2 = doc.createElement("div");
    this.playStoreText2 = doc.createElement("div");

    this.professionalDiv2 = doc.createElement("div");
    this.professionalTitleDiv2 = doc.createElement("div");
    this.professionalTitleIcon2 = new Icon({
      img: images.getImages()["work"].src,
      text: "Professional Experience",
      imgSize: "18px",
      fontSize: "14px",
      fontWeight: "600",
    });

    this.projectDiv = doc.createElement("div");
    this.projectTitleDiv = doc.createElement("div");
    this.projectTitleIcon = new Icon({
      img: images.getImages()["project"].src,
      text: "PROJECTS",
      imgSize: "18px",
      fontSize: "14px",
      fontWeight: "600",
    });

    this.escapeDiv = doc.createElement("div");
    this.escapeHeaderDiv = doc.createElement("div");
    this.escapeHeaderTextDiv = doc.createElement("div");
    this.escapeLinkImgDiv = doc.createElement("div");
    this.escapeLinkImg = doc.createElement("img");
    this.escapeYearTextDiv = doc.createElement("div");
    this.escapeContentDiv = doc.createElement("div");
    this.escapeImgDiv = doc.createElement("div");
    this.escapeImg = doc.createElement("img");
    this.escapeTextDiv = doc.createElement("div");

    this.ttbDiv = doc.createElement("div");
    this.ttbHeaderDiv = doc.createElement("div");
    this.ttbHeaderTextDiv = doc.createElement("div");
    this.ttbLinkImgDiv = doc.createElement("div");
    this.ttbLinkImg = doc.createElement("img");
    this.ttbYearTextDiv = doc.createElement("div");
    this.ttbContentDiv = doc.createElement("div");
    this.ttbTextDiv = doc.createElement("div");
    this.ttbSubtitleTextDiv = doc.createElement("div");
    this.ttbDocAnalystDiv = doc.createElement("div");
    this.ttbDocAnalystTitleTextDiv = doc.createElement("div");
    this.ttbDocAnalystUl = doc.createElement("ul");
    this.ttbDocAnalystLi = doc.createElement("li");
    this.ttbSoftEngDiv = doc.createElement("div");
    this.ttbSoftEngTitleTextDiv = doc.createElement("div");
    this.ttbSoftEngUl = doc.createElement("ul");
    this.ttbSoftEngLi1 = doc.createElement("li");
    this.ttbSoftEngLi2 = doc.createElement("li");
    this.ttbSoftEngLi3 = doc.createElement("li");

    this.mqpDiv = doc.createElement("div");
    this.mqpHeaderDiv = doc.createElement("div");
    this.mqpHeaderTextDiv = doc.createElement("div");
    this.mqpLinkImgDiv = doc.createElement("div");
    this.mqpLinkImg = doc.createElement("img");
    this.mqpYearTextDiv = doc.createElement("div");
    this.mqpContentDiv = doc.createElement("div");
    this.mqpTextDiv = doc.createElement("div");
    this.mqpImgListDiv = doc.createElement("div");
    this.mqpPosterImgDiv = doc.createElement("div");
    this.mqpTrinaImgDiv = doc.createElement("div");

    this.iqpDiv = doc.createElement("div");
    this.iqpHeaderDiv = doc.createElement("div");
    this.iqpHeaderTextDiv = doc.createElement("div");
    this.iqpLinkImgDiv = doc.createElement("div");
    this.iqpLinkImg = doc.createElement("img");
    this.iqpYearTextDiv = doc.createElement("div");
    this.iqpContentDiv = doc.createElement("div");
    this.iqpTextDiv = doc.createElement("div");
    this.iqpGroupImgDiv = doc.createElement("div");

    this.mqpGroupExpandableImage = new ExpandableImage({
      container: this.mqpPosterImgDiv,
      imageSrc: images.getImages()["mqp-poster"].src,
      imageAlt: 'MQP Poster'
    });
    this.iqpGroupExpandableImage = new ExpandableImage({
      container: this.iqpGroupImgDiv,
      imageSrc: images.getImages()["iqp_team"].src,
      imageAlt: 'IQP Team'
    });
    this.mqpTrinaExpandableImage = new ExpandableImage({
      container: this.mqpTrinaImgDiv,
      imageSrc: images.getImages()["trina"].src,
      imageAlt: 'TRINA Robot'
    });

    this.footerComponent = new FooterComponent();

    // Collect images and Icons for easier access
    this.imgs = [
      { element: this.escapeLinkImg, key: "link" },
      { element: this.ttbLinkImg, key: "link" },
      { element: this.mqpLinkImg, key: "link" },
      { element: this.iqpLinkImg, key: "link" },
      { element: this.appStoreImg, key: "apple" },
      { element: this.playStoreImg, key: "google-play" },
      { element: this.appStoreImg2, key: "apple" },
      { element: this.playStoreImg2, key: "google-play" },
    ];
    this.icons = [
      { element: this.contactEmailIcon, key: "email" },
      { element: this.locationIcon, key: "location" },
      { element: this.websiteIcon, key: "github" },
      { element: this.linkedInIcon, key: "linkedIn" },
      { element: this.educationTitleIcon, key: "education" },
      { element: this.educationDateIcon, key: "calendar" },
      { element: this.educationLocationIcon, key: "location-2" },
      { element: this.professionalDateIcon, key: "calendar" },
      { element: this.professionalLocationIcon, key: "location-2" },
      { element: this.professionalTitleIcon, key: "work" },
      { element: this.projectTitleIcon, key: "project" },
      { element: this.professionalDateIcon2, key: "calendar" },
      { element: this.professionalLocationIcon2, key: "location-2" },
    ];

    // Collect linkable elements to reduce amount of needed listeners to one
    this.linkConfigs = [
      { element: this.websiteIcon.getDiv(), url: URLS.GITHUB },
      { element: this.linkedInIcon.getDiv(), url: URLS.LINKEDIN },
      { element: this.escapeLinkImgDiv, url: URLS.ESCAPE },
      { element: this.ttbLinkImgDiv, url: URLS.TTB },
      { element: this.mqpLinkImgDiv, url: URLS.MQP },
      { element: this.iqpLinkImgDiv, url: URLS.IQP },
      { element: this.appStoreButtonDiv, url: URLS.MYCHAPTER_APPSTORE },
      { element: this.playStoreButtonDiv, url: URLS.MYCHAPTER_PLAYSTORE },
      { element: this.appStoreButtonDiv2, url: URLS.MYCHAPTER_APPSTORE },
      { element: this.playStoreButtonDiv2, url: URLS.MYCHAPTER_PLAYSTORE },
    ];
  }

  // Attach event listeners to elements
  attachListeners() {

    // Open a new tab when user selects project links or contact infos
    this.linkConfigs.forEach(({ element, url }) => {
      addEventListeners(element, () => {
        window.open(url, "_blank").focus();
      });
    });

    // Listen for mode changes from footer
    this.footerComponent.getDiv().addEventListener("dark", () => {
      this.makeNight();
    });

    this.footerComponent.getDiv().addEventListener("light", () => {
      this.makeDay();
    });
  }

  // Initialize text content for the panel
  initializeContent() {
    this.nameTextDiv.innerHTML = "Brandon Manuel Navarro";
    this.subnameTextDiv.innerHTML =
      "Software engineer with a focus on frontend development";
    this.skillsTextDiv.innerHTML = "SKILLS";
    this.programmingTitleTextDiv.innerHTML = "Programming";
    this.osTitleTextDiv.innerHTML = "Operating Systems";
    this.frameworksTitleTextDiv.innerHTML = "Frameworks";
    this.toolsTitleTextDiv.innerHTML = "Tools";
    this.bachelorsTextDiv.innerHTML = "Bachelor of Science in Computer Science";

    this.gpaTextDiv.innerHTML = "3.25 GPA";
    this.sigmaPiTextDiv.innerHTML =
      "Sigma Pi Fraternity International, Gamma Iota Chapter";
    this.sigmaPiDateTextDiv.innerHTML = "2016 - 2020";
    this.sigmaPiLi1.innerHTML = "Active member and former PR chair";
    this.sigmaPiLi4.innerHTML =
      "Was on the WebTech committee for 2 years, which made drastic " +
      "improvements to our " +
      '<a class="anchor" target="_blank" href="https://sigmapigammaiota.org/"> chapter site</a>';
    this.sigmaPiLi2.innerHTML =
      "Helped organize a multi-day campus event, Amazing Day, to " +
      "raise awareness for mental health and suicide in the WPI community";
    this.sigmaPiLi3.innerHTML =
      "Volunteered weekly at a local food pantry, Mustard Seed to help " +
      "setup, cook, & clean";
    this.sparcTextDiv.innerHTML = "SPARC Member";
    this.sparcDateTextDiv.innerHTML = "2018 - 2020";
    this.sparcLi1.innerHTML =
      "Was an active member of a SPARC, a student run committee that " +
      "interfaced with college admins and hosted campus events to " +
      "raise awareness and provide resources for sexual assualt " +
      "victims in the WPI community";
    this.sparcLi2.innerHTML =
      "Helped run the annual, campus-wide event, " +
      '<a class="anchor" target="_blank" href="https://www.wpi.edu/news/take-back-night">Take Back the Night</a>';
    this.sparcLi3.innerHTML =
      "Created and distributed electronic surveys to gauge students " +
      "sentiments about safety on campus which were then presented to WPI admins";
    this.contactTitleTextDiv.innerHTML = "CONTACT";
    this.professionalJobTextDiv.innerHTML = "TrampleZone LLC.";
    this.professionalJobTextDiv2.innerHTML = "TrampleZone LLC.";
    this.professionalJobTitleTextDiv.innerHTML = "Software Engineer II";
    this.professionalJobTitleTextDiv2.innerHTML = "Software Engineer II";
    this.professionalTextDiv.innerHTML =
      "Worked closely with the founder of the company in planning and developing a single page application that is currently available across mobile and desktop. I was involved in the initial planning for the application and created most of the model classes, UI components, and panels on the frontend. I also created promotional content and app store materials using various Adobe tools along with Figma. Throughout my time there I also trained several new hires and was involved in the recruitment process.";
    this.professionalTextDiv2.innerHTML =
      "Worked closely with the founder of the company in planning and developing a single page application that is currently available across mobile and desktop. I was involved in the initial planning for the application and created most of the model classes, UI components, and panels on the frontend. I also created promotional content and app store materials using various Adobe tools along with Figma. Throughout my time there I also trained several new hires and was involved in the recruitment process.";
    this.campusInvolvementHeaderTextDiv.innerHTML = "Campus Involvement";
    this.escapeHeaderTextDiv.innerHTML = "Escape (Board Game)";
    this.escapeYearTextDiv.innerHTML = "2020";
    this.escapeTextDiv.innerHTML =
      "Escape is a family of board games, designed for the term project of  CS4233: Object-Oriented Analysis & Design. The game is initialized using a collection of XML files to control different aspects like board dimension and shape, game pieces, victory conditions, and different battle rules. The course focused on using a TDD approach and evolutionary code design to continually add to and improve the game throughout the 7 weeks of development.";
    this.ttbHeaderTextDiv.innerHTML = "TTB Application";
    this.ttbYearTextDiv.innerHTML = "2018";
    this.ttbTextDiv.innerHTML =
      "Worked within a team of 8 to develop an application to aid the Alcohol and Tobacco Tax and Trade Bureau (TTB) in the submission and review process of new product applications. The class was a 7 week, intensive simulation of what it was like working in an Agile Software development team. Our team held daily standup meetings to keep an open line of communication and to delegate work. Gave a presentation at the end of the class to a panel of our professor and government officials.";
    this.ttbSubtitleTextDiv.innerHTML = "Roles and responsibilities";
    this.ttbDocAnalystTitleTextDiv.innerHTML = "Documentation Analyst";
    this.ttbDocAnalystLi.innerHTML =
      "Created and maintained all technical documentation including UML diagrams, sequence diagrams, training materials, and software code documentation.";
    this.ttbSoftEngTitleTextDiv.innerHTML = "Software Engineer";
    this.ttbSoftEngLi1.innerHTML =
      "Helped design the UI for the application using a mockup tool Figma.";
    this.ttbSoftEngLi2.innerHTML =
      "Helped implement the designed UI using JavaFX and FXML (an XML-based markup language for constructing Java object graphs).";
    this.ttbSoftEngLi3.innerHTML =
      "Implemented the algorithm that was used to search through a database seeded with a collection of alcohols. The fuzzy search I implemented adapted the Damerau-Levenshtein approach and ran in O(n*m) time.";
    this.mqpYearTextDiv.innerHTML = "2019-2020";
    this.mqpHeaderTextDiv.innerHTML =
      "Active Telepresence Assistance for Supervisory Control: A User Study with a Multi-Camera Tele-Nursing Robot";
    this.mqpTextDiv.innerHTML =
      'Worked within a team of 7 with an advisor to conduct a study which explored autonomous camera control and selection on a TRINA robot using a VR headset. Was involved in creating the software used to control the cameras by reading the inertial measurement unit (IMU) data from the VR headset using Unity and GStreamer library. Using C++ and Python scripts to interface with <a class="anchor" href="https://wiki.ros.org/ROS/Introduction">ROS</a>, our team was able to control TRINAs arms and main camera using the VR headset and controllers. Also helped in running ~10 participants through the study.';
    this.iqpYearTextDiv.innerHTML = "2018-2019";
    this.iqpHeaderTextDiv.innerHTML = "Mathematics Tutoring Center at NUST";
    this.iqpTextDiv.innerHTML =
      "Worked within a team of 4 to create and implement e-learning modules at the Namibia University of Science and Technology (NUST). Our team worked with university staff to test these modules in various mathematics courses as a supplemental learning tool for students. My main contributions to the project were creating the modules as well as writing and editing the final paper. The e-learning modules were developed using a software created by a WPI professor (ASSISTments), which I also worked with before the project.";
    this.playStoreSubtext.innerHTML = "View in the";
    this.playStoreText.innerHTML = "Google Play Store";
    this.appStoreSubtext.innerHTML = "View in the";
    this.appStoreText.innerHTML = "App Store";
    this.playStoreSubtext2.innerHTML = "View in the";
    this.playStoreText2.innerHTML = "Google Play Store";
    this.appStoreSubtext2.innerHTML = "View in the";
    this.appStoreText2.innerHTML = "App Store";
  }

  // Set static images' src attributes
  initializeStaticImages() {
    this.sigmaPiImg.src = images.getImages()["sigma-pi_t"].src;
    this.sparcImg.src = images.getImages()["sparc_t"].src;
    this.escapeImg.src = images.getImages()["escape"].src;
    this.meImg.src = images.getImages()["me_hd"].src;
    this.professionalImg.src = images.getImages()["my-chapter"].src;
    this.professionalImg2.src = images.getImages()["my-chapter"].src;
  }

  // Apply CSS classes to elements
  initializeStyles() {
    this.div.className = "resume-panel";
    this.frameDiv.className = "resume-frame";
    this.contactDiv.className = "contact-section";
    this.skillsDiv.className = "skills-section";
    this.programmingDiv.className = "skill-section";
    this.osDiv.className = "skill-section";
    this.frameworksDiv.className = "skill-section";
    this.toolsDiv.className = "skill-section";
    this.educationDiv.className = "education-section";
    this.campusInvolvementDiv.className = "campus-involvement-section";
    this.professionalDiv.className = "professional-section";
    this.professionalDiv2.className = "professional-section";
    this.projectDiv.className = "project-section";
    this.escapeDiv.className = "project-escape";
    this.ttbDiv.className = "project-ttb";
    this.mqpDiv.className = "project-mqp";
    this.iqpDiv.className = "project-iqp";
  }

  // Append elements to the DOM
  assembleElements() {
    this.meImgDiv.appendChild(this.meImg);

    this.nameSubnameDiv.appendChild(this.nameTextDiv);
    this.nameSubnameDiv.appendChild(this.subnameTextDiv);

    this.topDiv.appendChild(this.meImgDiv);
    this.topDiv.appendChild(this.nameSubnameDiv);

    this.contactTitleDiv.appendChild(this.contactTitleTextDiv);
    this.contactDiv.appendChild(this.contactTitleDiv);
    this.contactDiv.appendChild(this.contactEmailIcon.getDiv());
    this.contactDiv.appendChild(this.locationIcon.getDiv());
    this.contactDiv.appendChild(this.websiteIcon.getDiv());
    this.contactDiv.appendChild(this.linkedInIcon.getDiv());

    this.programmingListDiv.appendChild(this.javascriptSkillRating.getDiv());
    this.programmingListDiv.appendChild(this.htmlSkillRating.getDiv());
    this.programmingListDiv.appendChild(this.cssSkillRating.getDiv());
    this.programmingListDiv.appendChild(this.typescriptSkillRating.getDiv());
    this.programmingListDiv.appendChild(this.javaSkillRating.getDiv());
    this.programmingListDiv.appendChild(this.nodeSkillRating.getDiv());
    this.programmingListDiv.appendChild(this.phpSkillRating.getDiv());
    this.programmingListDiv.appendChild(this.pythonSkillRating.getDiv());
    this.programmingListDiv.appendChild(this.sqlSkillRating.getDiv());
    this.programmingListDiv.appendChild(this.cSkillRating.getDiv());
    this.programmingListDiv.appendChild(this.cplusSkillRating.getDiv());

    this.osListDiv.appendChild(this.windowsOsSkillRating.getDiv());
    this.osListDiv.appendChild(this.macOsSkillRating.getDiv());
    this.osListDiv.appendChild(this.iOsSkillRating.getDiv());
    this.osListDiv.appendChild(this.androidOsSkillRating.getDiv());

    this.frameworksListDiv.appendChild(
      this.requireFrameworkSkillRating.getDiv()
    );
    this.frameworksListDiv.appendChild(
      this.tailwindFrameworkSkillRating.getDiv()
    );
    this.frameworksListDiv.appendChild(
        this.reactFrameworkSkillRating.getDiv()
    );
    this.frameworksListDiv.appendChild(
      this.nextJsFrameworkSkillRating.getDiv()
    );

    this.toolsListDiv.appendChild(this.figmaToolsSkillRating.getDiv());
    this.toolsListDiv.appendChild(this.gitToolsSkillRating.getDiv());
    this.toolsListDiv.appendChild(this.adobePremiereToolsSkillRating.getDiv());
    this.toolsListDiv.appendChild(this.androidOsSkillRating.getDiv());
    this.toolsListDiv.appendChild(this.dockerToolsSkillRating.getDiv());

    this.programmingDiv.appendChild(this.programmingTitleTextDiv);
    this.programmingDiv.appendChild(this.programmingListDiv);

    this.osDiv.appendChild(this.osTitleTextDiv);
    this.osDiv.appendChild(this.osListDiv);

    this.frameworksDiv.appendChild(this.frameworksTitleTextDiv);
    this.frameworksDiv.appendChild(this.frameworksListDiv);

    this.toolsDiv.appendChild(this.toolsTitleTextDiv);
    this.toolsDiv.appendChild(this.toolsListDiv);

    this.skillsDiv.appendChild(this.skillsTextDiv);
    this.skillsDiv.appendChild(this.programmingDiv);
    this.skillsDiv.appendChild(this.frameworksDiv);
    this.skillsDiv.appendChild(this.osDiv);
    this.skillsDiv.appendChild(this.toolsDiv);

    this.leftDiv.appendChild(this.contactDiv);
    this.leftDiv.appendChild(this.skillsDiv);

    this.educationTitleDiv.appendChild(this.educationTitleIcon.getDiv());

    this.educationDateLocationDiv.appendChild(this.educationDateIcon.getDiv());
    this.educationDateLocationDiv.appendChild(
      this.educationLocationIcon.getDiv()
    );

    this.topRightEducationDiv.appendChild(this.bachelorsTextDiv);
    this.topRightEducationDiv.appendChild(this.gpaTextDiv);

    this.educationTopDiv.appendChild(this.educationDateLocationDiv);
    this.educationTopDiv.appendChild(this.topRightEducationDiv);

    this.sigmaPiImgDiv.appendChild(this.sigmaPiImg);
    this.sigmaPiHeaderDiv.appendChild(this.sigmaPiImgDiv);
    this.sigmaPiHeaderDiv.appendChild(this.sigmaPiTextDiv);
    this.sigmaPiHeaderDiv.appendChild(this.sigmaPiDateTextDiv);
    this.sigmaPiUl.appendChild(this.sigmaPiLi1);
    this.sigmaPiUl.appendChild(this.sigmaPiLi4);
    this.sigmaPiUl.appendChild(this.sigmaPiLi2);
    this.sigmaPiUl.appendChild(this.sigmaPiLi3);

    this.sigmaPiDiv.appendChild(this.sigmaPiHeaderDiv);
    this.sigmaPiDiv.appendChild(this.sigmaPiUl);

    this.sparcImgDiv.appendChild(this.sparcImg);
    this.sparcHeaderDiv.appendChild(this.sparcImgDiv);
    this.sparcHeaderDiv.appendChild(this.sparcTextDiv);
    this.sparcHeaderDiv.appendChild(this.sparcDateTextDiv);
    this.sparcUl.appendChild(this.sparcLi1);
    this.sparcUl.appendChild(this.sparcLi2);
    this.sparcUl.appendChild(this.sparcLi3);

    this.sparcDiv.appendChild(this.sparcHeaderDiv);
    this.sparcDiv.appendChild(this.sparcUl);

    this.campusInvolvementListDiv.appendChild(this.sigmaPiDiv);
    this.campusInvolvementListDiv.appendChild(this.sparcDiv);

    this.campusInvolvementDiv.appendChild(this.campusInvolvementHeaderTextDiv);
    this.campusInvolvementDiv.appendChild(this.campusInvolvementListDiv);

    this.educationDiv.appendChild(this.educationTitleDiv);
    this.educationDiv.appendChild(this.educationTopDiv);
    this.educationDiv.appendChild(this.campusInvolvementDiv);

    this.professionalTitleDiv.appendChild(this.professionalTitleIcon.getDiv());
    this.professionalDiv.appendChild(this.professionalTitleDiv);
    this.professionalDateLocationDiv.appendChild(
      this.professionalDateIcon.getDiv()
    );
    this.professionalDateLocationDiv.appendChild(
      this.professionalLocationIcon.getDiv()
    );

    this.professionalJobDiv.appendChild(this.professionalJobTitleTextDiv);
    this.professionalJobDiv.appendChild(this.professionalJobTextDiv);

    this.professionalTopDiv.appendChild(this.professionalDateLocationDiv);
    this.professionalTopDiv.appendChild(this.professionalJobDiv);

    this.professionalImgDiv.appendChild(this.professionalImg);

    this.appStoreImgDiv.appendChild(this.appStoreImg);
    this.appStoreTextDiv.appendChild(this.appStoreSubtext);
    this.appStoreTextDiv.appendChild(this.appStoreText);
    this.appStoreButtonDiv.appendChild(this.appStoreImgDiv);
    this.appStoreButtonDiv.appendChild(this.appStoreTextDiv);

    this.playStoreImgDiv.appendChild(this.playStoreImg);
    this.playStoreTextDiv.appendChild(this.playStoreSubtext);
    this.playStoreTextDiv.appendChild(this.playStoreText);
    this.playStoreButtonDiv.appendChild(this.playStoreImgDiv);
    this.playStoreButtonDiv.appendChild(this.playStoreTextDiv);

    this.professionalButtonsDiv.appendChild(this.appStoreButtonDiv);
    this.professionalButtonsDiv.appendChild(this.playStoreButtonDiv);

    this.professionalExtraDiv.appendChild(this.professionalImgDiv);
    this.professionalExtraDiv.appendChild(this.professionalButtonsDiv);

    this.professionalDiv.appendChild(this.professionalTitleDiv);
    this.professionalDiv.appendChild(this.professionalTopDiv);
    this.professionalDiv.appendChild(this.professionalTextDiv);

    this.professionalDiv.appendChild(this.professionalExtraDiv);

    this.professionalTitleDiv2.appendChild(
      this.professionalTitleIcon2.getDiv()
    );
    this.professionalDiv2.appendChild(this.professionalTitleDiv2);

    this.professionalDateLocationDiv2.appendChild(
      this.professionalDateIcon2.getDiv()
    );
    this.professionalDateLocationDiv2.appendChild(
      this.professionalLocationIcon2.getDiv()
    );

    this.professionalJobDiv2.appendChild(this.professionalJobTitleTextDiv2);
    this.professionalJobDiv2.appendChild(this.professionalJobTextDiv2);

    this.professionalTopDiv2.appendChild(this.professionalDateLocationDiv2);
    this.professionalTopDiv2.appendChild(this.professionalJobDiv2);

    this.professionalImgDiv2.appendChild(this.professionalImg2);

    this.appStoreImgDiv2.appendChild(this.appStoreImg2);
    this.appStoreTextDiv2.appendChild(this.appStoreSubtext2);
    this.appStoreTextDiv2.appendChild(this.appStoreText2);
    this.appStoreButtonDiv2.appendChild(this.appStoreImgDiv2);
    this.appStoreButtonDiv2.appendChild(this.appStoreTextDiv2);

    this.playStoreImgDiv2.appendChild(this.playStoreImg2);
    this.playStoreTextDiv2.appendChild(this.playStoreSubtext2);
    this.playStoreTextDiv2.appendChild(this.playStoreText2);
    this.playStoreButtonDiv2.appendChild(this.playStoreImgDiv2);
    this.playStoreButtonDiv2.appendChild(this.playStoreTextDiv2);

    this.professionalButtonsDiv2.appendChild(this.appStoreButtonDiv2);
    this.professionalButtonsDiv2.appendChild(this.playStoreButtonDiv2);

    this.professionalExtraDiv2.appendChild(this.professionalImgDiv2);
    this.professionalExtraDiv2.appendChild(this.professionalButtonsDiv2);

    this.professionalDiv2.appendChild(this.professionalTitleDiv2);
    this.professionalDiv2.appendChild(this.professionalTopDiv2);
    this.professionalDiv2.appendChild(this.professionalTextDiv2);
    this.professionalDiv2.appendChild(this.professionalExtraDiv2);

    this.projectTitleDiv.appendChild(this.projectTitleIcon.getDiv());
    this.projectDiv.appendChild(this.projectTitleDiv);

    this.rightDiv.appendChild(this.educationDiv);
    this.rightDiv.appendChild(this.professionalDiv);

    this.escapeHeaderDiv.appendChild(this.escapeHeaderTextDiv);
    this.escapeLinkImgDiv.appendChild(this.escapeLinkImg);
    this.escapeHeaderDiv.appendChild(this.escapeLinkImgDiv);
    this.escapeHeaderDiv.appendChild(this.escapeYearTextDiv);

    this.escapeImgDiv.appendChild(this.escapeImg);
    this.escapeContentDiv.appendChild(this.escapeImgDiv);
    this.escapeContentDiv.appendChild(this.escapeTextDiv);

    this.escapeDiv.appendChild(this.escapeHeaderDiv);
    this.escapeDiv.appendChild(this.escapeContentDiv);

    this.ttbHeaderDiv.appendChild(this.ttbHeaderTextDiv);
    this.ttbLinkImgDiv.appendChild(this.ttbLinkImg);
    this.ttbHeaderDiv.appendChild(this.ttbLinkImgDiv);
    this.ttbHeaderDiv.appendChild(this.ttbYearTextDiv);

    this.ttbDocAnalystDiv.appendChild(this.ttbDocAnalystTitleTextDiv);
    this.ttbDocAnalystUl.appendChild(this.ttbDocAnalystLi);
    this.ttbDocAnalystDiv.appendChild(this.ttbDocAnalystUl);

    this.ttbSoftEngDiv.appendChild(this.ttbSoftEngTitleTextDiv);
    this.ttbSoftEngUl.appendChild(this.ttbSoftEngLi1);
    this.ttbSoftEngUl.appendChild(this.ttbSoftEngLi2);
    this.ttbSoftEngUl.appendChild(this.ttbSoftEngLi3);
    this.ttbSoftEngDiv.appendChild(this.ttbSoftEngUl);

    this.ttbContentDiv.appendChild(this.ttbTextDiv);
    this.ttbContentDiv.appendChild(this.ttbSubtitleTextDiv);
    this.ttbContentDiv.appendChild(this.ttbDocAnalystDiv);
    this.ttbContentDiv.appendChild(this.ttbSoftEngDiv);

    this.ttbDiv.appendChild(this.ttbHeaderDiv);
    this.ttbDiv.appendChild(this.ttbContentDiv);

    this.mqpHeaderDiv.appendChild(this.mqpHeaderTextDiv);
    this.mqpLinkImgDiv.appendChild(this.mqpLinkImg);
    this.mqpHeaderDiv.appendChild(this.mqpLinkImgDiv);
    this.mqpHeaderDiv.appendChild(this.mqpYearTextDiv);

    this.mqpContentDiv.appendChild(this.mqpTextDiv);
    this.mqpImgListDiv.appendChild(this.mqpPosterImgDiv);
    this.mqpImgListDiv.appendChild(this.mqpTrinaImgDiv);
    this.mqpContentDiv.appendChild(this.mqpImgListDiv);

    this.mqpDiv.appendChild(this.mqpHeaderDiv);
    this.mqpDiv.appendChild(this.mqpContentDiv);

    this.iqpHeaderDiv.appendChild(this.iqpHeaderTextDiv);
    this.iqpLinkImgDiv.appendChild(this.iqpLinkImg);
    this.iqpHeaderDiv.appendChild(this.iqpLinkImgDiv);
    this.iqpHeaderDiv.appendChild(this.iqpYearTextDiv);

    this.iqpContentDiv.appendChild(this.iqpTextDiv);
    this.iqpContentDiv.appendChild(this.iqpGroupImgDiv);

    this.iqpDiv.appendChild(this.iqpHeaderDiv);
    this.iqpDiv.appendChild(this.iqpContentDiv);

    this.projectDiv.appendChild(this.escapeDiv);
    this.projectDiv.appendChild(this.ttbDiv);
    this.projectDiv.appendChild(this.mqpDiv);
    this.projectDiv.appendChild(this.iqpDiv);

    // Assemble
    this.frameDiv.appendChild(this.topDiv);
    this.frameDiv.appendChild(this.leftDiv);
    this.frameDiv.appendChild(this.rightDiv);
    this.frameDiv.appendChild(this.professionalDiv2);
    this.frameDiv.appendChild(this.projectDiv);
    this.div.appendChild(this.frameDiv);
    this.div.appendChild(this.footerComponent.getDiv());
  }

  // Main initialization function
  initialize() {
    this.createElements();
    this.assembleElements();
    this.attachListeners();
    this.initializeContent();
    this.initializeStaticImages();
    this.initializeStyles();

    // Initialization complete
    this.initialized = true;
  }
}

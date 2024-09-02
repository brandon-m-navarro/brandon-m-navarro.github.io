// ResumePanel Module extends BasePanel
//
// DESCRIPTION:
//
//   ResumePanel will contain a variety of text artifacts that mirror my
//   current resume
//

import BasePanel from '../../BasePanel.js';
import Icon from '../../components/Icon.js';
import SkillRating from '../../components/SkillRating.js';
import Images from '../../Images.js';
import Utilities from '../../utils/Utilities.js';
const images = new Images();
const utilities = new Utilities();

let
    // DOM elements
    doc = window.document,

    // DOM IDs (must be unique)
    baseId = 'resume-panel',
    divId = baseId + '-div',
    frameDivId = baseId + '-frame-div',

    // Local variables
    showClassElement = 'show-element',

    // Singleton reference
    self;


// Class
export default class ResumePanel extends BasePanel {

    // Constructor
    constructor () {

        // Preserve instance reference and enforce singleton
        if (typeof self === 'object') {
            return self;
        } else {
            super();
            self = this;
        }

        // Private Functions
    }

    // Public Methods

    // Create elements used on the panel
    createElements () {
        this.frameDiv = doc.createElement('div');

        this.topDiv = doc.createElement('div');
        this.nameTextDiv = doc.createElement('div');
        this.subnameTextDiv = doc.createElement('div');

        this.leftDiv = doc.createElement('div');

        this.contactDiv = doc.createElement('div');
        this.contactTitleDiv = doc.createElement('div');
        this.contactTitleTextDiv = doc.createElement('div');
        this.contactEmailIcon = new Icon({
            img: images.getImages()['email'].src,
            text: 'brandon.m.navarro@gmail.com',
            imgSize: '24px',
            fontSize: '12px'
        });
        this.locationIcon = new Icon({
            img: images.getImages()['location'].src,
            text: 'Somerville, MA',
            imgSize: '24px',
            fontSize: '12px'
        });
        this.websiteIcon = new Icon({
            img: images.getImages()['github'].src,
            text: 'https://brandon-m-navarro.github.io/',
            imgSize: '24px',
            fontSize: '12px'
        });
        this.linkedInIcon = new Icon({
            img: images.getImages()['linkedIn'].src,
            text: 'brandon-m-navarro', // need to make link
            imgSize: '24px',
            fontSize: '12px'
        });

        this.skillsDiv = doc.createElement('div');
        this.skillsTextDiv = doc.createElement('div');

        this.programmingDiv = doc.createElement('div');
        this.programmingTitleTextDiv = doc.createElement('div');
        this.programmingListDiv = doc.createElement('div');

        this.javascriptSkillDiv = doc.createElement('div');
        this.javascriptSkillTextDiv = doc.createElement('div');
        this.javascriptSkillRating = new SkillRating({
            total: 5,
            fill: 4
        });

        this.htmlSkillDiv = doc.createElement('div');
        this.htmlSkillTextDiv = doc.createElement('div');
        this.htmlSkillRating = new SkillRating({
            total: 5,
            fill: 4
        });

        this.cssSkillDiv = doc.createElement('div');
        this.cssSkillTextDiv = doc.createElement('div');
        this.cssSkillRating = new SkillRating({
            total: 5,
            fill: 4
        });

        this.sqlSkillDiv = doc.createElement('div');
        this.sqlSkillTextDiv = doc.createElement('div');
        this.sqlSkillRating = new SkillRating({
            total: 5,
            fill: 2
        });

        this.javaSkillDiv = doc.createElement('div');
        this.javaSkillTextDiv = doc.createElement('div');
        this.javaSkillRating = new SkillRating({
            total: 5,
            fill: 3
        });

        this.cSkillDiv = doc.createElement('div');
        this.cSkillTextDiv = doc.createElement('div');
        this.cSkillRating = new SkillRating({
            total: 5,
            fill: 2
        });

        this.pythonSkillDiv = doc.createElement('div');
        this.pythonSkillTextDiv = doc.createElement('div');
        this.pythonSkillRating = new SkillRating({
            total: 5,
            fill: 2
        });

        this.nodeSkillDiv = doc.createElement('div');
        this.nodeSkillTextDiv = doc.createElement('div');
        this.nodeSkillRating = new SkillRating({
            total: 5,
            fill: 3
        });

        this.phpSkillDiv = doc.createElement('div');
        this.phpSkillTextDiv = doc.createElement('div');
        this.phpSkillRating = new SkillRating({
            total: 5,
            fill: 2
        });

        this.cplusSkillDiv = doc.createElement('div');
        this.cplusSkillTextDiv = doc.createElement('div');
        this.cplusSkillRating = new SkillRating({
            total: 5,
            fill: 2
        });

        this.programmingListDiv = doc.createElement('div');

        this.osDiv = doc.createElement('div');
        this.osTitleTextDiv = doc.createElement('div');

        this.windowsOsDiv = doc.createElement('div');
        this.windowsOsTextDiv = doc.createElement('div');
        this.windowsOsSkillRating = new SkillRating({
            total: 5,
            fill: 4
        });

        this.macOsDiv = doc.createElement('div');
        this.macOsTextDiv = doc.createElement('div');
        this.macOsSkillRating = new SkillRating({
            total: 5,
            fill: 3
        });

        this.iOsDiv = doc.createElement('div');
        this.iOsTextDiv = doc.createElement('div');
        this.iOsSkillRating = new SkillRating({
            total: 5,
            fill: 2
        });

        this.androidOsDiv = doc.createElement('div');
        this.androidOsTextDiv = doc.createElement('div');
        this.androidOsSkillRating = new SkillRating({
            total: 5,
            fill: 2
        });

        this.osListDiv = doc.createElement('div');

        this.toolsDiv = doc.createElement('div');
        this.toolsTitleTextDiv = doc.createElement('div');

        this.gitToolsDiv = doc.createElement('div');
        this.gitToolsTextDiv = doc.createElement('div');
        this.gitToolsSkillRating = new SkillRating({
            total: 5,
            fill: 4
        });

        this.dockerToolsDiv = doc.createElement('div');
        this.dockerToolsTextDiv = doc.createElement('div');
        this.dockerToolsSkillRating = new SkillRating({
            total: 5,
            fill: 2
        });

        this.figmaToolsDiv = doc.createElement('div');
        this.figmaToolsTextDiv = doc.createElement('div');
        this.figmaToolsSkillRating = new SkillRating({
            total: 5,
            fill: 5
        });

        this.adobePremiereToolsDiv = doc.createElement('div');
        this.adobePremiereToolsTextDiv = doc.createElement('div');
        this.adobePremiereToolsSkillRating = new SkillRating({
            total: 5,
            fill: 3
        });

        this.androidStudioToolsDiv = doc.createElement('div');
        this.androidStudioToolsTextDiv = doc.createElement('div');
        this.androidStudioToolsSkillRating = new SkillRating({
            total: 5,
            fill: 2
        });

        this.toolsListDiv = doc.createElement('div');

        this.rightDiv = doc.createElement('div');

        this.educationDiv = doc.createElement('div');

        this.educationTitleDiv = doc.createElement('div');
        this.educationTitleIcon = new Icon({
            img: images.getImages()['education'].src,
            text: 'EDUCATION',
            imgSize: '24px',
            fontSize: '14px',
            fontWeight: '600'
        });

        this.educationTopDiv = doc.createElement('div');
        this.educationDateLocationDiv = doc.createElement('div');
        this.educationDateIcon = new Icon({
            img: images.getImages()['calendar'].src,
            text: '2016 - 2020',
            imgSize: '18px',
            fontSize: '12px'
        });
        this.educationLocationIcon = new Icon({
            img: images.getImages()['location-2'].src,
            text: 'Worcester, MA',
            imgSize: '18px',
            fontSize: '12px'
        });
        this.topRightEducationDiv = doc.createElement('div');
        this.bachelorsTextDiv = doc.createElement('div');
        this.gpaTextDiv = doc.createElement('div');

        this.campusInvolvementDiv = doc.createElement('div');
        this.campusInvolvementHeaderTextDiv = doc.createElement('div');

        this.campusInvolvementListDiv = doc.createElement('div');

        this.sigmaPiHeaderDiv = doc.createElement('div');
        this.sigmaPiDiv = doc.createElement('div');
        this.sigmaPiImgDiv = doc.createElement('div');
        this.sigmaPiImg = doc.createElement('img');

        this.sigmaPiTextDiv = doc.createElement('div');
        this.sigmaPiDateTextDiv = doc.createElement('div');
        this.sigmaPiUl = doc.createElement('ul');
        this.sigmaPiLi1 = doc.createElement('li');
        this.sigmaPiLi2 = doc.createElement('li');
        this.sigmaPiLi3 = doc.createElement('li');

        this.sparcHeaderDiv = doc.createElement('div');
        this.sparcDiv = doc.createElement('div');
        this.sparcImgDiv = doc.createElement('div');
        this.sparcImg = doc.createElement('img');

        this.sparcTextDiv = doc.createElement('div');
        this.sparcDateTextDiv = doc.createElement('div');

        this.sparcUl = doc.createElement('ul');
        this.sparcLi1 = doc.createElement('li');
        this.sparcLi2 = doc.createElement('li');
        this.sparcLi3 = doc.createElement('li');

        this.professionalTopDiv = doc.createElement('div');
        this.professionalDateLocationDiv = doc.createElement('div');
        this.professionalDateIcon = new Icon({
            img: images.getImages()['calendar'].src,
            text: '2018 - 2024',
            imgSize: '18px',
            fontSize: '12px'
        });
        this.professionalLocationIcon = new Icon({
            img: images.getImages()['location-2'].src,
            text: 'Remote',
            imgSize: '18px',
            fontSize: '12px'
        });
        this.professionalJobDiv = doc.createElement('div');
        this.professionalJobTextDiv = doc.createElement('div');
        this.professionalJobTitleTextDiv = doc.createElement('div');

        this.professionalTextDiv = doc.createElement('div');

        this.professionalDiv = doc.createElement('div');
        this.professionalTitleDiv = doc.createElement('div');
        this.professionalTitleIcon = new Icon({
            img: images.getImages()['work'].src,
            text: 'Professional Experience',
            imgSize: '24px',
            fontSize: '14px',
            fontWeight: '600'
        });

        this.projectDiv = doc.createElement('div');
        this.projectTitleDiv = doc.createElement('div');
        this.projectTitleIcon = new Icon({
            img: images.getImages()['project'].src,
            text: 'PROJECTS',
            imgSize: '24px',
            fontSize: '14px',
            fontWeight: '600'
        });

        // Listeners
        utilities.addEventListeners(this.websiteIcon.getDiv(), () => {
            window.open(
                'https://github.com/brandon-m-navarro/brandon-m-navarro.github.io',
                '_blank'
            ).focus();
        });
        utilities.addEventListeners(this.linkedInIcon.getDiv(), () => {
            window.open(
                'https://www.linkedin.com/in/brandon-navarro-b36b97149',
                '_blank'
            ).focus();
        });
    };

    // Append elements to the DOM
    assembleElements () {

        // Add elements to container

        //
        this.topDiv.appendChild(this.nameTextDiv);
        this.topDiv.appendChild(this.subnameTextDiv);

        //
        this.contactTitleDiv.appendChild(this.contactTitleTextDiv);
        this.contactDiv.appendChild(this.contactTitleDiv);
        this.contactDiv.appendChild(this.contactEmailIcon.getDiv());
        this.contactDiv.appendChild(this.locationIcon.getDiv());
        this.contactDiv.appendChild(this.websiteIcon.getDiv());
        this.contactDiv.appendChild(this.linkedInIcon.getDiv());

        this.javascriptSkillDiv.appendChild(this.javascriptSkillTextDiv);
        this.javascriptSkillDiv.appendChild(this.javascriptSkillRating.getDiv());

        this.htmlSkillDiv.appendChild(this.htmlSkillTextDiv);
        this.htmlSkillDiv.appendChild(this.htmlSkillRating.getDiv());

        this.cssSkillDiv.appendChild(this.cssSkillTextDiv);
        this.cssSkillDiv.appendChild(this.cssSkillRating.getDiv());

        this.javaSkillDiv.appendChild(this.javaSkillTextDiv);
        this.javaSkillDiv.appendChild(this.javaSkillRating.getDiv());

        this.phpSkillDiv.appendChild(this.phpSkillTextDiv);
        this.phpSkillDiv.appendChild(this.phpSkillRating.getDiv());

        this.pythonSkillDiv.appendChild(this.pythonSkillTextDiv);
        this.pythonSkillDiv.appendChild(this.pythonSkillRating.getDiv());

        this.sqlSkillDiv.appendChild(this.sqlSkillTextDiv);
        this.sqlSkillDiv.appendChild(this.sqlSkillRating.getDiv());

        this.nodeSkillDiv.appendChild(this.nodeSkillTextDiv);
        this.nodeSkillDiv.appendChild(this.nodeSkillRating.getDiv());

        this.cSkillDiv.appendChild(this.cSkillTextDiv);
        this.cSkillDiv.appendChild(this.cSkillRating.getDiv());

        this.cplusSkillDiv.appendChild(this.cplusSkillTextDiv);
        this.cplusSkillDiv.appendChild(this.cplusSkillRating.getDiv());


        //
        this.programmingListDiv.appendChild(this.javascriptSkillDiv);
        this.programmingListDiv.appendChild(this.htmlSkillDiv);
        this.programmingListDiv.appendChild(this.cssSkillDiv);
        this.programmingListDiv.appendChild(this.javaSkillDiv);
        this.programmingListDiv.appendChild(this.nodeSkillDiv);
        this.programmingListDiv.appendChild(this.phpSkillDiv);
        this.programmingListDiv.appendChild(this.pythonSkillDiv);
        this.programmingListDiv.appendChild(this.sqlSkillDiv);
        this.programmingListDiv.appendChild(this.cSkillDiv);
        this.programmingListDiv.appendChild(this.cplusSkillDiv);

        //
        this.programmingDiv.appendChild(this.programmingTitleTextDiv);
        this.programmingDiv.appendChild(this.programmingListDiv);

        //
        this.windowsOsDiv.appendChild(this.windowsOsTextDiv);
        this.windowsOsDiv.appendChild(this.windowsOsSkillRating.getDiv());
        this.macOsDiv.appendChild(this.macOsTextDiv);
        this.macOsDiv.appendChild(this.macOsSkillRating.getDiv());
        this.iOsDiv.appendChild(this.iOsTextDiv);
        this.iOsDiv.appendChild(this.iOsSkillRating.getDiv());
        this.androidOsDiv.appendChild(this.androidOsTextDiv);
        this.androidOsDiv.appendChild(this.androidOsSkillRating.getDiv());

        //
        this.osListDiv.appendChild(this.windowsOsDiv);
        this.osListDiv.appendChild(this.macOsDiv);
        this.osListDiv.appendChild(this.iOsDiv);
        this.osListDiv.appendChild(this.androidOsDiv);

        //
        this.osDiv.appendChild(this.osTitleTextDiv);
        this.osDiv.appendChild(this.osListDiv);

        //
        this.gitToolsDiv.appendChild(this.gitToolsTextDiv);
        this.gitToolsDiv.appendChild(this.gitToolsSkillRating.getDiv());
        this.figmaToolsDiv.appendChild(this.figmaToolsTextDiv);
        this.figmaToolsDiv.appendChild(this.figmaToolsSkillRating.getDiv());
        this.adobePremiereToolsDiv.appendChild(this.adobePremiereToolsTextDiv);
        this.adobePremiereToolsDiv.appendChild(this.adobePremiereToolsSkillRating.getDiv());
        this.androidStudioToolsDiv.appendChild(this.androidStudioToolsTextDiv);
        this.androidStudioToolsDiv.appendChild(this.androidStudioToolsSkillRating.getDiv());
        this.dockerToolsDiv.appendChild(this.dockerToolsTextDiv);
        this.dockerToolsDiv.appendChild(this.dockerToolsSkillRating.getDiv());

        //
        this.toolsListDiv.appendChild(this.figmaToolsDiv);
        this.toolsListDiv.appendChild(this.gitToolsDiv);
        this.toolsListDiv.appendChild(this.adobePremiereToolsDiv);
        this.toolsListDiv.appendChild(this.androidStudioToolsDiv);
        this.toolsListDiv.appendChild(this.dockerToolsDiv);

        //
        this.toolsDiv.appendChild(this.toolsTitleTextDiv);
        this.toolsDiv.appendChild(this.toolsListDiv);

        //
        this.skillsDiv.appendChild(this.skillsTextDiv);
        this.skillsDiv.appendChild(this.programmingDiv);
        this.skillsDiv.appendChild(this.osDiv);
        this.skillsDiv.appendChild(this.toolsDiv);

        //
        this.leftDiv.appendChild(this.contactDiv);
        this.leftDiv.appendChild(this.skillsDiv);

        this.educationTitleDiv.appendChild(this.educationTitleIcon.getDiv());

        this.educationDateLocationDiv.appendChild(this.educationDateIcon.getDiv());
        this.educationDateLocationDiv.appendChild(this.educationLocationIcon.getDiv());

        this.topRightEducationDiv.appendChild(this.bachelorsTextDiv);
        this.topRightEducationDiv.appendChild(this.gpaTextDiv);

        this.educationTopDiv.appendChild(this.educationDateLocationDiv);
        this.educationTopDiv.appendChild(this.topRightEducationDiv);

        // this.educationTopDiv.appendChild(this.bachelorsTextDiv);

        this.sigmaPiImgDiv.appendChild(this.sigmaPiImg);

        this.sigmaPiHeaderDiv.appendChild(this.sigmaPiImgDiv);
        this.sigmaPiHeaderDiv.appendChild(this.sigmaPiTextDiv);
        this.sigmaPiHeaderDiv.appendChild(this.sigmaPiDateTextDiv);;

        this.sigmaPiUl.appendChild(this.sigmaPiLi1);
        this.sigmaPiUl.appendChild(this.sigmaPiLi2);
        this.sigmaPiUl.appendChild(this.sigmaPiLi3);

        this.sigmaPiDiv.appendChild(this.sigmaPiHeaderDiv);
        this.sigmaPiDiv.appendChild(this.sigmaPiUl);

        //
        this.sparcImgDiv.appendChild(this.sparcImg);

        this.sparcHeaderDiv.appendChild(this.sparcImgDiv);
        this.sparcHeaderDiv.appendChild(this.sparcTextDiv);
        this.sparcHeaderDiv.appendChild(this.sparcDateTextDiv);;

        this.sparcUl.appendChild(this.sparcLi1);
        this.sparcUl.appendChild(this.sparcLi2);
        this.sparcUl.appendChild(this.sparcLi3);

        this.sparcDiv.appendChild(this.sparcHeaderDiv);
        this.sparcDiv.appendChild(this.sparcUl);

        this.campusInvolvementListDiv.appendChild(this.sigmaPiDiv);
        this.campusInvolvementListDiv.appendChild(this.sparcDiv);

        //
        this.campusInvolvementDiv.appendChild(this.campusInvolvementHeaderTextDiv);
        this.campusInvolvementDiv.appendChild(this.campusInvolvementListDiv);

        this.educationDiv.appendChild(this.educationTitleDiv);
        this.educationDiv.appendChild(this.educationTopDiv);

        this.educationDiv.appendChild(this.campusInvolvementDiv);

        this.professionalTitleDiv.appendChild(this.professionalTitleIcon.getDiv());
        this.professionalDiv.appendChild(this.professionalTitleDiv);

        this.professionalDateLocationDiv.appendChild(this.professionalDateIcon.getDiv());
        this.professionalDateLocationDiv.appendChild(this.professionalLocationIcon.getDiv());

        this.professionalJobDiv.appendChild(this.professionalJobTitleTextDiv);
        this.professionalJobDiv.appendChild(this.professionalJobTextDiv);

        this.professionalTopDiv.appendChild(this.professionalDateLocationDiv);
        this.professionalTopDiv.appendChild(this.professionalJobDiv);

        this.professionalDiv.appendChild(this.professionalTitleDiv);
        this.professionalDiv.appendChild(this.professionalTopDiv);
        this.professionalDiv.appendChild(this.professionalTextDiv);

        this.projectTitleDiv.appendChild(this.projectTitleIcon.getDiv());
        this.projectDiv.appendChild(this.projectTitleDiv);

        this.rightDiv.appendChild(this.educationDiv);
        this.rightDiv.appendChild(this.professionalDiv);
        this.rightDiv.appendChild(this.projectDiv);


        // Assemble
        this.frameDiv.appendChild(this.topDiv);
        this.frameDiv.appendChild(this.leftDiv);
        this.frameDiv.appendChild(this.rightDiv);
        this.div.appendChild(this.frameDiv);
    };

    // Create and assemble panel elements
    initialize () {

        // Create needed HTML elms
        this.createElements();

        // Assemble elements
        this.assembleElements();

        // Non icon Images
        this.sigmaPiImg.src = images.getImages()['sigma-pi'].src;
        this.sparcImg.src = images.getImages()['sparc'].src;

        // innerHTMLs
        this.nameTextDiv.innerHTML = 'Brandon Manuel Navarro';
        this.subnameTextDiv.innerHTML =
            'Software engineer with a focus on frontend development';
        this.skillsTextDiv.innerHTML = 'SKILLS';
        this.programmingTitleTextDiv.innerHTML = 'Programming';
        this.osTitleTextDiv.innerHTML = 'Operating Systems';
        this.toolsTitleTextDiv.innerHTML = 'Tools';
        this.bachelorsTextDiv.innerHTML = 'Bachelor of Science in Computer Science';

        this.gpaTextDiv.innerHTML = '3.25 GPA';
        this.sigmaPiTextDiv.innerHTML =
            'Sigma Pi Fraternity International, Gamma Iota Chapter';
        this.sigmaPiDateTextDiv.innerHTML =
            '2016 - 2020';
        this.sigmaPiLi1.innerHTML = 'Active member and former PR chair';
        this.sigmaPiLi2.innerHTML =
            'Helped organize a multi-day campus event, Amazing Day, to ' +
            'raise awareness for mental health and suicide in the WPI community';
        this.sigmaPiLi3.innerHTML =
            'Volunteered weekly at a local food pantry, Mustard Seed to help ' +
            'setup, cook, & clean';
        this.sparcTextDiv.innerHTML = 'SPARC Member';
        this.sparcDateTextDiv.innerHTML = '2018 - 2020';
        this.sparcLi1.innerHTML =
            'Was an active member of a SPARC, a student run committee that ' +
            'interfaced with college admins and hosted campus events to ' +
            'raise awareness and provide resources for sexual assualt ' +
            'victims in the WPI community';
        this.sparcLi2.innerHTML =
            'Helped run the annual, campus-wide event, ' +
            '<a target="_blank" href="https://www.wpi.edu/news/take-back-night">Take Back the Night</a>';
        this.sparcLi3.innerHTML =
            'Created and distributed electronic surveys to gauge students ' +
            'sentiments about safety on campus';
        this.contactTitleTextDiv.innerHTML = 'CONTACT';
        this.professionalJobTextDiv.innerHTML = 'TrampleZone LLC.';
        this.professionalJobTitleTextDiv.innerHTML = 'Software Developer';
        this.professionalTextDiv.innerHTML =
            'Worked closely with the founder of the company in planning and ' +
            'developing a SPA that is available across mobile & desktop. I created ' +
            'most of the model classes, UI components, and panels on the frontend. ' +
            'I also created promotional content and app store materials using various ' +
            'Adobe tools along with Figma.';

        this.javascriptSkillTextDiv.innerHTML = 'Javascript';
        this.htmlSkillTextDiv.innerHTML = 'HTML';
        this.cssSkillTextDiv.innerHTML = 'CSS';
        this.pythonSkillTextDiv.innerHTML = 'Python';
        this.javaSkillTextDiv.innerHTML = 'Java';
        this.sqlSkillTextDiv.innerHTML = 'SQL';
        this.cSkillTextDiv.innerHTML = 'C';
        this.cplusSkillTextDiv.innerHTML = 'C++';
        this.phpSkillTextDiv.innerHTML = 'PHP';
        this.nodeSkillTextDiv.innerHTML = 'Node';

        this.gitToolsTextDiv.innerHTML = 'Git';
        this.figmaToolsTextDiv.innerHTML = 'Figma';
        this.adobePremiereToolsTextDiv.innerHTML = 'Adobe Premiere';
        this.macOsTextDiv.innerHTML = 'MacOS';
        this.windowsOsTextDiv.innerHTML = 'Windows';
        this.androidOsTextDiv.innerHTML = 'Android';
        this.iOsTextDiv.innerHTML = 'iOs';
        this.androidStudioToolsTextDiv.innerHTML = 'Android Studio';
        this.dockerToolsTextDiv.innerHTML = 'Docker';
        this.campusInvolvementHeaderTextDiv.innerHTML =
            'Campus Involvement';

        // Assign IDs to DOM elements, if needed
        this.skillsDiv.setAttribute('id', baseId + '-skills-div');
        this.programmingDiv.setAttribute('id', baseId + '-programming-div');
        this.osDiv.setAttribute('id', baseId + '-os-div');
        this.toolsDiv.setAttribute('id', baseId + '-tools-div');

        this.contactDiv.setAttribute('id', baseId + '-contact-div');
        this.educationDiv.setAttribute('id', baseId + '-education-div');
        this.professionalDiv.setAttribute('id', baseId + '-professional-div');
        this.projectDiv.setAttribute('id', baseId + '-project-div');
        this.campusInvolvementDiv.setAttribute('id', baseId + '-campus-involvement-div');

        this.frameDiv.setAttribute('id', frameDivId);
        this.div.setAttribute('id', divId);

        // Initialization complete
        this.initialized = true;
    };
}

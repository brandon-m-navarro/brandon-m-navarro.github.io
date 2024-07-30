// ResumePanel Module extends BasePanel
//
// DESCRIPTION:
//
//   ResumePanel will contain a variety of text artifacts that mirror my
//   current resume
//

import BasePanel from '../../BasePanel.js';
import Icon from '../../components/Icon.js';
import Images from '../../Images.js';
const images = new Images();

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
        // this.contactEmailDiv = doc.createElement('div');
        this.contactEmailIcon = new Icon({
            img: images.getImages()['email'].src,
            text: 'brandon.m.navarro@gmail.com',
            imgSize: '32px',
            fontSize: '14px'
        });
        this.locationIcon = new Icon({
            img: images.getImages()['location'].src,
            text: 'Somerville, MA',
            imgSize: '32px',
            fontSize: '14px'
        });
        this.websiteIcon = new Icon({
            img: images.getImages()['website'].src,
            text: 'https://brandon-m-navarro.github.io/',
            imgSize: '32px',
            fontSize: '14px'
        });
        this.linkedInIcon = new Icon({
            img: images.getImages()['linkedIn'].src,
            text: 'brandon-m-navarro', // need to make link
            imgSize: '32px',
            fontSize: '14px'
        });

        this.skillsDiv = doc.createElement('div');
        this.skillsTextDiv = doc.createElement('div');

        this.programmingDiv = doc.createElement('div');
        this.programmingTitleTextDiv = doc.createElement('div');
        this.programmingListDiv = doc.createElement('div');

        this.osDiv = doc.createElement('div');
        this.osTitleTextDiv = doc.createElement('div');
        this.osListDiv = doc.createElement('div');

        this.toolsDiv = doc.createElement('div');
        this.toolsTitleTextDiv = doc.createElement('div');
        this.toolsListDiv = doc.createElement('div');

        this.rightDiv = doc.createElement('div');

        this.educationDiv = doc.createElement('div');

        this.educationTitleDiv = doc.createElement('div');
        this.educationTitleIcon = new Icon({
            img: images.getImages()['education'].src,
            text: 'Education',
            imgSize: '42px',
            fontSize: '36px'
        });

        this.educationTopDiv = doc.createElement('div');
        this.educationDateLocationDiv = doc.createElement('div');
        this.educationDateIcon = new Icon({
            img: images.getImages()['calendar'].src,
            text: '2016 - 2020',
            imgSize: '24px',
            fontSize: '18px'
        });
        this.educationLocationIcon = new Icon({
            img: images.getImages()['location-2'].src,
            text: 'Worcester, MA',
            imgSize: '24px',
            fontSize: '18px'
        });
        this.bachelorsTextDiv = doc.createElement('div');
        this.bulletListUl = doc.createElement('ul');
        this.bulletLi1 = doc.createElement('li');
        this.bulletLi2 = doc.createElement('li');
        this.bulletLi3 = doc.createElement('li');
        this.bulletLi4 = doc.createElement('li');

        this.professionalTopDiv = doc.createElement('div');
        this.professionalDateLocationDiv = doc.createElement('div');
        this.professionalDateIcon = new Icon({
            img: images.getImages()['calendar'].src,
            text: '2018 - 2024',
            imgSize: '24px',
            fontSize: '18px'
        });
        this.professionalLocationIcon = new Icon({
            img: images.getImages()['location-2'].src,
            text: 'Remte',
            imgSize: '24px',
            fontSize: '18px'
        });
        this.professionalJobTextDiv = doc.createElement('div');
        this.professionalTextDiv = doc.createElement('div');

        this.professionalDiv = doc.createElement('div');
        this.professionalTitleDiv = doc.createElement('div');
        this.professionalTitleIcon = new Icon({
            img: images.getImages()['work'].src,
            text: 'Professional Experience',
            imgSize: '42px',
            fontSize: '36px'
        });

        this.projects = doc.createElement('div');
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

        //
        this.programmingDiv.appendChild(this.programmingTitleTextDiv);

        //
        this.osDiv.appendChild(this.osTitleTextDiv);

        //
        this.toolsDiv.appendChild(this.toolsTitleTextDiv);

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

        this.educationTopDiv.appendChild(this.educationDateLocationDiv);
        this.educationTopDiv.appendChild(this.bachelorsTextDiv);

        this.bulletListUl.appendChild(this.bulletLi1);
        this.bulletListUl.appendChild(this.bulletLi2);
        this.bulletListUl.appendChild(this.bulletLi3);
        this.bulletListUl.appendChild(this.bulletLi4);

        this.educationDiv.appendChild(this.educationTitleDiv);
        this.educationDiv.appendChild(this.educationTopDiv);
        this.educationDiv.appendChild(this.bulletListUl);

        this.educationDiv.appendChild(this.educationTitleDiv);
        this.educationDiv.appendChild(this.educationTopDiv);
        this.educationDiv.appendChild(this.bulletListUl);

        
        this.professionalTitleDiv.appendChild(this.professionalTitleIcon);
        this.professionalDiv.appendChild(this.professionalTitleDiv);

        this.professionalDateLocationDiv.appendChild(this.professionalDateIcon.getDiv());
        this.professionalDateLocationDiv.appendChild(this.professionalLocationIcon.getDiv());

        this.professionalTopDiv.appendChild(this.professionalDateLocationDiv);
        this.professionalTopDiv.appendChild(this.professionalJobTextDiv);

        this.professionalDiv.appendChild(this.professionalTitleDiv);
        this.professionalDiv.appendChild(this.professionalTopDiv);
        this.professionalDiv.appendChild(this.professionalTextDiv);

        this.rightDiv.appendChild(this.educationDiv);
        this.rightDiv.appendChild(this.professionalDiv);


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

        // innerHTMLs
        this.nameTextDiv.innerHTML = 'Brandon Manuel Navarro';
        this.subnameTextDiv.innerHTML = 'Some punchy text that makes you say wahwah';
        this.skillsTextDiv.innerHTML = 'SKILLS';
        this.programmingTitleTextDiv.innerHTML = 'Programming';
        this.osTitleTextDiv.innerHTML = 'Operating Systems';
        this.toolsTitleTextDiv.innerHTML = 'Tools';
        this.bachelorsTextDiv.innerHTML = 'Bachelors in Computer Science';
        this.bulletLi1.innerHTML = '3.something average';
        this.bulletLi2.innerHTML = 'List classes?';
        this.bulletLi3.innerHTML = 
            'Sigma Pi Fraternity International, Gamma Iota, ' +
            'Active Member & Former PR Chair';
        this.bulletLi4.innerHTML =
            'Link to MQP? Talk about learning ROS and using GStreamer ' +
            'to read in a stream of data from different VR headsets ' +
            'through python scripts and Unity.';
        this.contactTitleTextDiv.innerHTML = 'CONTACT';
        this.professionalJobTextDiv.innerHTML = 'Software Developer';
        this.professionalTextDiv.innerHTML =
            'Worked closely with the founder of the company in planning and ' +
            'developing a SPA that is available across mobile & desktop. I created ' +
            'most of the model classes, UI components, and panels on the frontend. ' +
            'I also created promotional content and app store materials using various ' +
            'Adobe tools along with Figma.';


        // Assign IDs to DOM elements, if needed
        this.contactDiv.setAttribute('id', baseId + '-contact-div');
        this.educationDiv.setAttribute('id', baseId + '-education-div');
        this.professionalDiv.setAttribute('id', baseId + '-professional-div');
        this.frameDiv.setAttribute('id', frameDivId);
        this.div.setAttribute('id', divId);

        // Initialization complete
        this.initialized = true;
    };
}

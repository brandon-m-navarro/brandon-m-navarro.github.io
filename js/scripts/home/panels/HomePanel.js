// HomePanel Module extends BasePanel
//
// DESCRIPTION:
//
//   HomePanel will contain a variety of text artifacts that mirror my
//   current home
//

import BasePanel from '../../BasePanel.js';
import Picture from '../../components/Picture.js';

import Images from '../../Images.js';
import Utilities from '../../utils/Utilities.js';
const images = new Images();
const utilities = new Utilities();

let
    // DOM elements
    doc = window.document,

    // DOM IDs (must be unique)
    baseId = 'home-panel',
    divId = baseId + '-div',
    frameDivId = baseId + '-frame-div',

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

        // Create and append elements
        this.initialize();

        // Append inline SVGs to appropriate divs
        // window.onload = event => {
        //     // Get SVGs by ID and append to appropriate div
        //     this.sunMtnSvg = doc.getElementById('sun-mtn');
        //     this.sunMtnSvg.style.display = 'block';
            
        //     //
        //     this.mtnSunSvgDiv.appendChild(this.sunMtnSvg);

        //     //
        // }
    }

    // Create handler for resizing Mountain svg for window resizes 
    handleResize () {

        const pathGroup = window.document.getElementById('paths');
        // console.log(pathGroup)
        console.log(window.innerWidth / 9)
        if (typeof pathGroup !== 'undefined' && pathGroup !== null) {
            pathGroup.style.transform = 'scaleX(' + window.innerWidth / 9 + '%)';
        }
    }

    // Set all SVGs
    setSvgs () {
        // Get SVGs by ID and append to appropriate div
        this.sunMtnSvg = doc.getElementById('sun-mtn');
        this.sunMtnSvg.style.display = 'block';
        
        //
        this.mtnSunSvgDiv.appendChild(this.sunMtnSvg);
    };

    makeDay () {
        this.mtnBackground = doc.getElementById('mtn-background');
        this.mtnMoonSun = doc.getElementById('mtn-moon-sun');
        this.mtnLayer1 = doc.getElementById('mtn-layer1');
        this.mtnLayer2 = doc.getElementById('mtn-layer2');
        this.mtnLayer3 = doc.getElementById('mtn-layer3');
        this.mtnLayer4 = doc.getElementById('mtn-layer4');
        this.mtnLayer5 = doc.getElementById('mtn-layer5');
        this.mtnLayer6 = doc.getElementById('mtn-layer6');
        this.mtnLayer7 = doc.getElementById('mtn-layer7');

        this.mtnBackground.setAttribute('fill', '#FB532C');
        this.mtnMoonSun.setAttribute('fill', '#FFD102');
        this.mtnLayer1.setAttribute('fill', '#E72C27');
        this.mtnLayer2.setAttribute('fill', '#C72423');
        this.mtnLayer3.setAttribute('fill', '#A81C1F');
        this.mtnLayer4.setAttribute('fill', '#8A161A');
        this.mtnLayer5.setAttribute('fill', '#6D1015');
        this.mtnLayer6.setAttribute('fill', '#510B0E');
        this.mtnLayer7.setAttribute('fill', '#370601');

        this.quoteTextDiv.classList.remove('dark');

        this.frameDiv.classList.remove('dark');
        this.div.classList.remove('dark');
    };

    makeNight () {
        this.mtnBackground = doc.getElementById('mtn-background');
        this.mtnMoonSun = doc.getElementById('mtn-moon-sun');
        this.mtnLayer1 = doc.getElementById('mtn-layer1');
        this.mtnLayer2 = doc.getElementById('mtn-layer2');
        this.mtnLayer3 = doc.getElementById('mtn-layer3');
        this.mtnLayer4 = doc.getElementById('mtn-layer4');
        this.mtnLayer5 = doc.getElementById('mtn-layer5');
        this.mtnLayer6 = doc.getElementById('mtn-layer6');
        this.mtnLayer7 = doc.getElementById('mtn-layer7');

        this.mtnBackground.setAttribute('fill', '#35364A');
        this.mtnMoonSun.setAttribute('fill', '#F5E3B3');
        this.mtnLayer1.setAttribute('fill', '#020916');
        this.mtnLayer2.setAttribute('fill', '#0A111C');
        this.mtnLayer3.setAttribute('fill', '#101622');
        this.mtnLayer4.setAttribute('fill', '#151B28');
        this.mtnLayer5.setAttribute('fill', '#1A202F');
        this.mtnLayer6.setAttribute('fill', '#1F2435');
        this.mtnLayer7.setAttribute('fill', '#25293C');

        this.quoteTextDiv.classList.add('dark');

        this.frameDiv.classList.add('dark');
        this.div.classList.add('dark');
    };

    // Public Methods

    // Create elements used on the panel
    createElements () {
        this.frameDiv = doc.createElement('div');

        this.topDiv = doc.createElement('div');

        this.middleDiv = doc.createElement('div');

        this.mtnSunSvgDiv = doc.createElement('div');

        this.meDiv = doc.createElement('div');
        this.meImgDiv = doc.createElement('div');
        this.meImg = doc.createElement('img');
        this.meAboutTextDiv = doc.createElement('div');

        this.quoteTextDiv = doc.createElement('div');

        this.stepsDiv = doc.createElement('div');
        
        this.stepOneDiv = doc.createElement('div');
        this.stepOneTextDiv = doc.createElement('div');
        this.stepOneHeaderTextDiv = doc.createElement('div');
        this.stepOneSubTextDiv = doc.createElement('div');

        this.stepTwoDiv = doc.createElement('div');
        this.stepTwoTextDiv = doc.createElement('div');
        this.stepTwoHeaderTextDiv = doc.createElement('div');
        this.stepTwoSubTextDiv = doc.createElement('div');

        this.stepThreeDiv = doc.createElement('div');
        this.stepThreeTextDiv = doc.createElement('div');
        this.stepThreeHeaderTextDiv = doc.createElement('div');
        this.stepThreeSubTextDiv = doc.createElement('div');

        this.stepFourDiv = doc.createElement('div');
        this.stepFourTextDiv = doc.createElement('div');
        this.stepFourHeaderTextDiv = doc.createElement('div');
        this.stepFourSubTextDiv = doc.createElement('div');

        this.moreAboutDiv = doc.createElement('div');
        this.moreAboutHeaderTextDiv = doc.createElement('div');
        this.moreAboutTextDiv1 = doc.createElement('div');
        this.moreAboutTextDiv2 = doc.createElement('div');
        this.moreAboutTextDiv3 = doc.createElement('div');

        this.bottomDiv = doc.createElement('div');
        this.bottomLeftDiv = doc.createElement('div');
        this.bottomRightDiv = doc.createElement('div');

        this.picture1 = new Picture({
            img: images.getImages()['skydive'].src,
            text: 'Me skydiving in Swakopmund, Namibia (IQP) '
        });
        this.picture2 = new Picture({
            img: images.getImages()['hershey'].src,
            text: 'Hershey being photogenic'
        });
        this.picture3 = new Picture({
            img: images.getImages()['hout_bay'].src,
            text: 'The Hout Bay in Cape Town'
        });
    };

    // Append elements to the DOM
    assembleElements () {

        this.meImgDiv.appendChild(this.meImg);
        this.meDiv.appendChild(this.meImgDiv);
        this.meDiv.appendChild(this.meAboutTextDiv);

        this.topDiv.appendChild(this.mtnSunSvgDiv);
        this.topDiv.appendChild(this.meDiv);
        this.topDiv.appendChild(this.quoteTextDiv);

        this.stepOneDiv.appendChild(this.stepOneTextDiv);
        this.stepOneDiv.appendChild(this.stepOneHeaderTextDiv);
        this.stepOneDiv.appendChild(this.stepOneSubTextDiv);

        this.stepTwoDiv.appendChild(this.stepTwoTextDiv);
        this.stepTwoDiv.appendChild(this.stepTwoHeaderTextDiv);
        this.stepTwoDiv.appendChild(this.stepTwoSubTextDiv);

        this.stepThreeDiv.appendChild(this.stepThreeTextDiv);
        this.stepThreeDiv.appendChild(this.stepThreeHeaderTextDiv);
        this.stepThreeDiv.appendChild(this.stepThreeSubTextDiv);

        this.stepFourDiv.appendChild(this.stepFourTextDiv);
        this.stepFourDiv.appendChild(this.stepFourHeaderTextDiv);
        this.stepFourDiv.appendChild(this.stepFourSubTextDiv);

        this.middleDiv.appendChild(this.stepOneDiv);
        this.middleDiv.appendChild(this.stepTwoDiv);
        this.middleDiv.appendChild(this.stepThreeDiv);
        this.middleDiv.appendChild(this.stepFourDiv);

        this.moreAboutDiv.appendChild(this.moreAboutHeaderTextDiv);
        this.moreAboutDiv.appendChild(this.moreAboutTextDiv1);
        this.moreAboutDiv.appendChild(this.moreAboutTextDiv2);
        this.moreAboutDiv.appendChild(this.moreAboutTextDiv3);

        this.bottomLeftDiv.appendChild(this.picture1.getDiv());
        this.bottomRightDiv.appendChild(this.picture2.getDiv());
        this.bottomRightDiv.appendChild(this.picture3.getDiv());

        this.bottomDiv.appendChild(this.bottomLeftDiv);
        this.bottomDiv.appendChild(this.bottomRightDiv);

        // Add elements to container
        this.frameDiv.appendChild(this.topDiv);
        this.frameDiv.appendChild(this.middleDiv);
        this.frameDiv.appendChild(this.moreAboutDiv);
        this.frameDiv.appendChild(this.bottomDiv);

        // Assemble
        this.div.appendChild(this.frameDiv);
    };

    // Create and assemble panel elements
    initialize () {

        // Create needed HTML elms
        this.createElements();

        // Assemble elements
        this.assembleElements();

        // Handle sizing Mountains svg to window size

        // Put handleResize call into a variable so we can later remove the event listener
        const eventHandler = utilities.debounce(this.handleResize);
        window.addEventListener('resize', eventHandler);

        // Ensure SVG is appropriatly sized on initial load
        this.handleResize();

        // innerHTMLs
        this.quoteTextDiv.innerHTML = 'Please, I need a job!!!';
        this.meAboutTextDiv.innerHTML =
            'My name is Brandon. I\'m a software engineer looking to expand ' +
            'my knowledge in a close-knit, team environment. I\'ve previously ' +
            'worked at a small startup developing a mobile/web application ' +
            'called MyChapter. My work was primarily focused on frontend ' +
            'development, but I\'m always looking to learn about new ' +
            'frameworks, languages, and any other technology under the sun.';

        this.stepOneTextDiv.innerHTML = '1.';
        this.stepTwoTextDiv.innerHTML = '2.';
        this.stepThreeTextDiv.innerHTML = '3.';
        this.stepFourTextDiv.innerHTML = '4.';

        this.stepOneHeaderTextDiv.innerHTML = 'Research / Wireframe';
        this.stepTwoHeaderTextDiv.innerHTML = 'Feedback / Collaboration';
        this.stepThreeHeaderTextDiv.innerHTML = 'Refine';
        this.stepFourHeaderTextDiv.innerHTML = 'Experiment';

        this.stepOneSubTextDiv.innerHTML =
            'After writing down a list of requirements to better understand ' +
            'the problem, I like to begin by looking for other UI\'s that ' +
            'have tackled the same or a similar problem. Then I begin ' +
            'drafting wireframes and mockups. These allow me to discover ' +
            'requirements I may have missed and gives me a resource that ' +
            'can better convey my ideas to my team.';
        this.stepTwoSubTextDiv.innerHTML =
            'With a wireframe in hand, I can now share with the rest of my ' +
            'team to further improve the design. Iteration based on team ' +
            'feedback leads to better designs, and helps build team ' +
            'cohesion by promoting a more open environment which encourages ' +
            'feedback.';
        this.stepThreeSubTextDiv.innerHTML =
            'Using feedback from my team, it\'s time to update and further ' +
            'build out my wireframes to more complete prototypes.';
        this.stepFourSubTextDiv.innerHTML =
            'Not everything will work, but it\'s worth trying if it means ' +
            'learning and gaining insights from what doesn\'t.';
        this.moreAboutHeaderTextDiv.innerHTML = 'About';
        this.moreAboutTextDiv1.innerHTML =
            'Around the end of my Sophomore year in college, I began working at a small startup called TrampleZone. I was mainly working alongside other college kids helping improve the company\'s existing application HotSpots, a desktop & mobile app that leveraged OpenStreetMaps to let users rate local venues.';
        this.moreAboutTextDiv2.innerHTML = 'A couple of months into my time there, we began developing a new app with a focus on greek life organizations called MyChapter. With the guidance of the company\'s founder Jim, I helped map out the expected class structure using UML diagrams and began designing and implementing the frontend. After graduating in the year of COVID, I was fortunate to get a software engineering role at TrampleZone, where I got to continue my work on MyChapter and even began testing out the service with multiple fraternities at my alma mater.';
        this.moreAboutTextDiv3.innerHTML = 'Outside of work, I like to go out on walks and runs around Somerville, play in local basketball rec leagues, and go out for backpacking hikes when I\'m visiting family in New Hampshire. ';


        // imgs
        this.meImg.src = images.getImages()['me_sitting'].src;

        // Assign IDs to DOM elements, if needed
        this.frameDiv.setAttribute('id', frameDivId);
        this.div.setAttribute('id', divId);

        // Initialization complete
        this.initialized = true;
    };
}

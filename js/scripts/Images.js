export default class Images {
    constructor () {
        // Site image ids and corresponding image files
        this.siteImages = {
            'calendar': {
                src: '../../img/calendar-regular.png',
                alt: 'Calendar'
            },
            'computer': {
                src: '../../img/computer-solid.png',
                alt: 'Computer'
            },
            'computer-svg': {
                src: '../../img/computer-solid.svg',
                viewBox: "0 0 640 512",
                path_d: "M384 96l0 224L64 320 64 96l320 0zM64 32C28.7 32 0 60.7 0 96L0 320c0 35.3 28.7 64 64 64l117.3 0-10.7 32L96 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-74.7 0-10.7-32L384 384c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L64 32zm464 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0zm16 64l32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm-16 80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16zm32 160a32 32 0 1 1 0 64 32 32 0 1 1 0-64z",
                alt: 'Computer'
            },
            'dadongo': {
                src: '../../img/Dodongo.jpg',
                alt: 'Dodongo [oot]'
            },
            'education': {
                src: '../../img/school-solid.png',
                alt: 'Education'
            },
            'email': {
                src: '../../img/envelope-regular.png',
                alt: 'Email'
            },
            'escape': {
                src: '../../img/escape.png',
                alt: 'Escape Game'
            },
            'github': {
                src: '../../img/square-github-solid.svg',
                alt: 'Github'
            },
            'linkedIn': {
                src: '../../img/linkedin-brands-solid.png',
                alt: 'LinkedIn'
            },
            'link': {
                src: '../../img/link-solid.png',
                alt: 'Link'
            },
            'location': {
                src: '../../img/location-dot-solid.png',
                alt: 'Location'
            },
            'location-2': {
                src: '../../img/location-dot-solid.png',
                alt: 'Location_2'
            },
            'moon': {
                src: '../../img/moon.svg',
                alt: 'Moon'
            },
            'mqp-poster': {
                src: '../../img/mqp-poster.svg',
                alt: 'MoMQP Poster'
            },
            'project': {
                src: '../../img/brush-solid.png',
                alt: 'Project'
            },
            'sigma-pi': {
                src: '../../img/sigmapi.jpg',
                alt: 'Sigma Pi'
            },
            'sparc': {
                src: '../../img/sparc.jpeg',
                alt: 'Sparc'
            },
            'sun': {
                src: '../../img/sun.svg',
                alt: 'Sun'
            },
            'trina': {
                src: '../../img/trina.png',
                alt: 'Trina'
            },
            'website': {
                src: '../../img/computer-solid.png',
                alt: 'Website'
            },
            'work': {
                src: '../../img/briefcase-solid.png',
                alt: 'Work'
            }
        }
    }

    getImages () {
        return this.siteImages;
    }
}

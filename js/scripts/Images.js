export default class Images {
    constructor () {
        // Site image ids and corresponding image files
        this.siteImages = {
            'apple': {
                src: '../../img/apple-brands-solid.svg',
                alt: 'Apple',
                altSrc: '../../img/apple-brands-solid_w.svg'
            },
            'calendar': {
                src: '../../img/calendar-regular.png',
                alt: 'Calendar',
                altSrc: '../../img/calendar-regular_w.png'
            },
            'close': {
                src: '../../img/xmark-solid.svg',
                alt: 'Close',
                altSrc: '../../img/xmark-solid_w.svg'
            },
            'computer': {
                src: '../../img/computer-solid.png',
                alt: 'Computer',
                altSrc: '../../img/computer-solid_w.png'
            },
            'computer-svg': {
                src: '../../img/computer-solid.svg',
                viewBox: "0 0 640 512",
                path_d: "M384 96l0 224L64 320 64 96l320 0zM64 32C28.7 32 0 60.7 0 96L0 320c0 35.3 28.7 64 64 64l117.3 0-10.7 32L96 416c-17.7 0-32 14.3-32 32s14.3 32 32 32l256 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-74.7 0-10.7-32L384 384c35.3 0 64-28.7 64-64l0-224c0-35.3-28.7-64-64-64L64 32zm464 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0zm16 64l32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm-16 80c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16zm32 160a32 32 0 1 1 0 64 32 32 0 1 1 0-64z",
                alt: 'Computer'
            },
            'copy': {
                src: '../../img/copy-solid.svg',
                alt: 'Copy',
                altSrc: '../../img/copy-solid_w.svg'
            },
            'dadongo': {
                src: '../../img/Dodongo.jpg',
                alt: 'Dodongo [oot]'
            },
            'education': {
                src: '../../img/school-solid.png',
                alt: 'Education',
                altSrc: '../../img/school-solid_w.png',
            },
            'email': {
                src: '../../img/envelope-regular.png',
                alt: 'Email',
                altSrc: '../../img/envelope-regular_w.png'
            },
            'escape': {
                src: '../../img/escape.png',
                alt: 'Escape Game'
            },
            'github': {
                src: '../../img/square-github-solid.svg',
                alt: 'Github',
                altSrc: '../../img/square-github-brands-solid_w.png'
            },
            'google-play': {
                src: '../../img/google-play-brands-solid.svg',
                alt: 'Google Play',
                altSrc: '../../img/google-play-brands-solid_w.svg'
            },
            'hershey': {
                src: '../../img/hershey.JPG',
                alt: 'Hershey'
            },
            'hout_bay': {
                src: '../../img/Hout_Bay.JPG',
                alt: 'Hout Bay'
            },
            'iqp_team': {
                src: '../../img/iqp_team.png',
                alt: 'GitIQP Team'
            },
            'linkedIn': {
                src: '../../img/linkedin-brands-solid.png',
                alt: 'LinkedIn',
                altSrc: '../../img/linkedin-brands-solid_w.png',
            },
            'link': {
                src: '../../img/link-solid.png',
                alt: 'Link',
                altSrc: '../../img/link-solid_w.png'
            },
            'location': {
                src: '../../img/location-dot-solid.png',
                alt: 'Location',
                altSrc: '../../img/location-dot-solid_w.png',
            },
            'location-2': {
                src: '../../img/location-dot-solid.png',
                alt: 'Location_2',
                altSrc: '../../img/location-dot-solid_w.png'
            },
            'me': {
                src: '../../img/myface.jpg',
                alt: 'Brandon'
            },
            'me_hd': {
                src: '../../img/myface_hd.jpg',
                alt: 'Brandon'
            },
            'me_onclif': {
                src: '../../img/me_onclif.JPG',
                alt: 'Brandon On Cliff'
            },
            'me_sitting': {
                src: '../../img/me_sitting.JPG',
                alt: 'Brandon Sitting'
            },
            'me_ajay_dune': {
                src: '../../img/me_ajay_dune.JPG',
                alt: 'Brandon'
            },
            'moon': {
                src: '../../img/moon.svg',
                alt: 'Moon'
            },
            'mqp-poster': {
                src: '../../img/mqp-poster.svg',
                alt: 'MQP Poster'
            },
            'my-chapter': {
                src: '../../img/mychapter.png',
                alt: 'MyChapter'
            },
            'project': {
                src: '../../img/brush-solid.png',
                alt: 'Project',
                altSrc: '../../img/brush-solid_w.png',
            },
            'react': {
                src: '../../img/react-brands-solid.svg',
                alt: 'React',
                altSrc: '../../img/react-brands-solid_w.svg',
            },
            'react-b': {
                src: '../../img/react-brands-solid_b.svg',
                alt: 'React',
                altSrc: '../../img/react-brands-solid_b.svg',
            },
            'sigma-pi': {
                src: '../../img/sigmapi.jpg',
                alt: 'Sigma Pi'
            },
            'sigma-pi_t': {
                src: '../../img/sigmapi_t.png',
                alt: 'Sigma Pi'
            },
            'skydive': {
                src: '../../img/skydive.png',
                alt: 'Skydive'
            },
            'sparc': {
                src: '../../img/sparc.jpeg',
                alt: 'Sparc'
            },
            'sparc_t': {
                src: '../../img/sparc_t.png',
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
                alt: 'Website',
                altSrc: '../../img/computer-solid_w.png',
            },
            'work': {
                src: '../../img/briefcase-solid.png',
                alt: 'Work',
                altSrc: '../../img/briefcase-solid_w.png',
            }
        }
    }

    getImages () {
        return this.siteImages;
    }
}

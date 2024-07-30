export default class Images {
    constructor () {
        // Site image ids and corresponding image files
        this.siteImages = {
            'dadongo': {
                src: '../../img/Dodongo.jpg',
                alt: 'Dodongo [oot]'
            },
            'email': {
                src: '../../img/envelope-regular.svg',
                alt: 'Email'
            },
            'location': {
                src: '../../img/location-dot-solid.svg',
                alt: 'Location'
            },
            'location-2': {
                src: '../../img/location-dot-solid.svg',
                alt: 'Location_2'
            },
            'website': {
                src: '../../img/computer-solid.svg',
                alt: 'Website'
            },
            'linkedIn': {
                src: '../../img/linkedin-brands-solid.svg',
                alt: 'LinkedIn'
            },
            'education': {
                src: '../../img/school-solid.svg',
                alt: 'Education'
            },
            'calendar': {
                src: '../../img/calendar-solid.svg',
                alt: 'Calendar'
            },
            'work': {
                src: '../../img/briefcase-solid.svg',
                alt: 'Work'
            }
        }
    }

    getImages () {
        return this.siteImages;
    }
}

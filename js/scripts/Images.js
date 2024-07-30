export default class Images {
    constructor () {
        // Site image ids and corresponding image files
        this.siteImages = {
            'dadongo': {
                src: '../../img/Dodongo.jpg',
                alt: 'Dodongo [oot]'
            },
            'email': {
                src: '../../img/envelope-regular.png',
                alt: 'Email'
            },
            'location': {
                src: '../../img/location-dot-solid.png',
                alt: 'Location'
            },
            'location-2': {
                src: '../../img/location-dot-solid.png',
                alt: 'Location_2'
            },
            'website': {
                src: '../../img/computer-solid.png',
                alt: 'Website'
            },
            'linkedIn': {
                src: '../../img/linkedin-brands-solid.png',
                alt: 'LinkedIn'
            },
            'education': {
                src: '../../img/school-solid.png',
                alt: 'Education'
            },
            'calendar': {
                src: '../../img/calendar-solid.png',
                alt: 'Calendar'
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

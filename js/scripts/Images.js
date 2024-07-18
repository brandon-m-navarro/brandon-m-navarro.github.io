export default class Images {
    constructor () {
        // Site image ids and corresponding image files
        this.siteImages = {
            'dadongo': {
                src: '../../img/Dodongo.jpg',
                alt: 'Dodongo [oot]'
            }
        }
    }

    getImages () {
        return this.siteImages;
    }
}

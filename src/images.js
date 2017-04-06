import yelp0Stars from './images/yelp_stars/0.png'
import yelp1Star from './images/yelp_stars/1.png'
import yelp1HalfStars from './images/yelp_stars/1_half.png'
import yelp2Stars from './images/yelp_stars/2.png'
import yelp2HalfStars from './images/yelp_stars/2_half.png'
import yelp3Stars from './images/yelp_stars/3.png'
import yelp3HalfStars from './images/yelp_stars/3_half.png'
import yelp4Stars from './images/yelp_stars/4.png'
import yelp4HalfStars from './images/yelp_stars/4_half.png'
import yelp5Stars from './images/yelp_stars/5.png'
import yelpLogo from './images/yelp_logo_tm/Yelp_trademark_RGB.png'
import yelpLogoOutline from './images/yelp_logo_tm/Yelp_trademark_RGB_outline.png'

//Stars downloaded here: https://www.yelp.com/developers/display_requirements 
const YELP_STARS = {
    zero: yelp0Stars,
    one: yelp1Star,
    oneHalf: yelp1HalfStars,
    two: yelp2Stars,
    twoHalf: yelp2HalfStars,
    three: yelp3Stars,
    threeHalf: yelp3HalfStars,
    four: yelp4Stars,
    fourHalf: yelp4HalfStars,
    five: yelp5Stars
}

//Brand downloaded here: https://www.yelp.com/brand
const YELP_LOGO = {
    logo: yelpLogo,
    logoOutlined: yelpLogoOutline
}


/**
 * Returns the Yelp stars image corresponding to the given rating.
 * 
 * @param {int} rating rating of the business
 */
function getStars(rating) {
    switch (rating) {
        case 0:
            return YELP_STARS.zero;

        case 1:
            return YELP_STARS.one;

        case 1.5:
            return YELP_STARS.oneHalf;

        case 2:
            return YELP_STARS.two;

        case 2.5:
            return YELP_STARS.twoHalf;

        case 3:
            return YELP_STARS.three;

        case 3.5:
            return YELP_STARS.threeHalf;

        case 4:
            return YELP_STARS.four;

        case 4.5:
            return YELP_STARS.fourHalf;

        case 5:
            return YELP_STARS.five;

        default:
            return null;
    }
}

module.exports = {
    yelpStars: YELP_STARS,
    yelpLogo: YELP_LOGO,
    getStars: getStars
};
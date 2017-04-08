

const PAGE = {
    HOME: 0,
    RESULTS: 1,
    DETAILS: 2
}

const RADIUS_PROPS = {
    defaultRadius: 5,
    maxRadius: 40, // max API value according to the docs
    minRadius: 1,
    radiusStep: 1
}

const YELP_API = {
    CATEGORIES: "food,restaurants",
    RESULTS_LIMIT: 20 // max API value is 50 according to the docs
}


// All constant strings displayed in the UI
const STRINGS = {
    API_READY: "Yelp API client ready",
    API_REQUEST_ERROR: "Error while interfacing with Yelp",
    API_SETUP_ERROR: "Error while setting up the communication with Yelp",
    NO_RESULTS: "No results found for the inserted location",
    CREDITS_URL: "https://ecamellini.github.io",
    SOURCE_URL: "https://github.com/ecamellini/buildo-yelp-challenge",
    HOME_TITLE: "Welcome to " + document.title,
    HOME_TEXT: "Enter a location in the search bar, select the radius and press enter. " +
    "Displayed results are updated dynamically according to range variations.",
    HINT_TEXT: "Insert a location and press enter",
    BACK_TO_RESULTS: "Back to results list",
    YELP_LOGO: "Yelp logo tm",
    CREDITS: "Credits",
    SOURCE: "Source"
}

const MESSAGE_DURATION = 2000

module.exports = {
    PAGE, RADIUS_PROPS,
    YELP_API,
    MESSAGE_DURATION,
    STRINGS
}
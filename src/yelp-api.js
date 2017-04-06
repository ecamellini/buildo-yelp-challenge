import YelpConfig from './yelp-api-config.js';


const AUTH_URL = "https://api.yelp.com/oauth2/token"

class YelpApi {

    constructor() {
        console.log("Requesting Yelp API token.");
        getYelpToken((response) => {
            let tokenObj = JSON.parse(response);
            this.access_token = tokenObj.access_token;
            this.tokenType = tokenObj.token_type;
            this.expiresIn = tokenObj.expires_in;
        });
    }
};

function getYelpToken(callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("POST", YelpConfig.CORS_PROXY_URL + AUTH_URL, true);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    const params = ("client_id=" + YelpConfig.APP_ID +
        "&client_secret=" + YelpConfig.APP_SECRET +
        "&grant_type=client_credentials");
    xmlHttp.send(params);
}

export default YelpApi;
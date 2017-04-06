
/**
 * This object contains ID and secret needed to obtain a Yelp API token.
 * 
 * Default values must be subsistuted with the real provided by Yelp
 * when creating a Yelp Fusion API app (https://www.yelp.it/developers/).
 * 
 * The CORS proxy should be such that it accepts the destination
 * URL to be appended to the proxy URL as it is.
 */
const YELP_FUSION_API_CONFIG = {
    APP_ID: "<YOUR_APP_ID>",
    APP_SECRET: "<YOUR_APP_SECRET>",
    CORS_PROXY_URL: "<YOUR_CORS_PROXY>"
};

export default YELP_FUSION_API_CONFIG;
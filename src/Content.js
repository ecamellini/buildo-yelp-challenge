import React from 'react';
import InputArea from './InputArea'
import Page from './Page'
import YELP_CONFIG from './yelp-api-config.js';
import YelpFusion from './yelp-fusion.js'
import DisplayMessage from './DisplayMessage'
import { PAGE, RADIUS_PROPS, YELP_API, STRINGS } from './constants.js'
import { MESSAGE_DURATION } from './constants.js'


// TODO: cache token
// TODO: show more button
// TODO: handle lat long



/**
 * Content component: it contains the top input area and the page.
 * The state attribute page controls what page should be rendered.
 * 
 * This is also the component that encloses all the state of the app: 
 * the search query and value, the radius, the results returned from Yelp
 * and the item selected in the list.
 */
class Content extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            searchText: "", // current value in the search box
            autoCompleteSource: [], // autocomplete source for the search box
            request: "", /* search query, filled when the user presses enter 
            while writing in the search box*/
            radius: RADIUS_PROPS.defaultRadius, // current radius in the slider
            results: [], // search results
            page: PAGE.HOME, // rendered page
            message: "", // auto-hiding message displayed at the bottom
            selectedItem: "" // item selected from the results list
        };
    }

    componentDidMount() {
        // Setting up the API client instance
        YelpFusion.accessToken(YELP_CONFIG.APP_ID, YELP_CONFIG.APP_SECRET,
            YELP_CONFIG.CORS_PROXY_URL).then(response => {
                this.yelpClient = YelpFusion.client(
                    response.jsonBody.access_token,
                    YELP_CONFIG.CORS_PROXY_URL);
                console.log(STRINGS.API_READY)
            }).catch(e => {
                this.displayMessage(STRINGS.API_SETUP_ERROR)
                console.log(e);
            });
    }

    /**
     * Callback passed to the SearchBar. It is triggered when the
     * user presses enter and starts the search.
     * 
     * This is the method that also performs API call to search for
     * restaurants and go to the results page if necessary.
     * 
     * @param {string} value The searched value
     */
    handleNewRequest = (value) => {
        this.yelpClient.search({
            location: value,  // Location inserted by the user
            radius: (this.state.radius * 1000), // Radius selected in the slider
            categories: YELP_API.CATEGORIES, // Categories
            limit: YELP_API.RESULTS_LIMIT // Max number of items returened
        }).then(response => {
            let results = response.jsonBody.businesses;
            //console.log(JSON.stringify(r[1], null, 4));

            // We go to the results page only if there are results,
            // otherwise we display a message
            if (results.length > 0) {
                this.setState({
                    request: value,
                    results: results.length > 0 ? results : this.state.results,
                    page: PAGE.RESULTS,
                });
            } else {
                this.displayMessage(STRINGS.NO_RESULTS)
            }
        }).catch(e => {
            console.log(e);
            this.displayMessage(STRINGS.API_REQUEST_ERROR)
        });
    }

    /**
     * Callback passed to the SearchBar. It is triggered when the
     * user changes the content of the search bar.
     * 
     * @param {string} value The value in the search bar
     */
    handleUpdateInput = (value) => {
        this.setState({
            searchText: value,
        });
    }

    /**
     * Callback passed to the RangeSlider. It is triggered when the
     * user changes the value of the Slider.
     * 
     * @param {object} event the event that triggered this change
     * @param {string} value The value in the search bar
     */
    handleRadiusChange = (event, value) => {
        this.setState({
            radius: value,
        });
    }

    /**
     * Callback passed to DisplayResults. It is triggered when the user
     * clicks on one of the displayed results.
     * 
     * @param {object} item the element of the results clicked by the user
     */
    showItemDetails = (item) => {
        this.setState({
            page: PAGE.DETAILS, //we go to the details page
            selectedItem: item
        });
    }

    /**
     * Callback passed to the RangeSlider, triggered when the user
     * stops dragging the slider. Used to dinamically update results
     * for a new slider value.
     */
    onDragStop = () => {
        // This call is to update the displayed results for every change in radius
        if (this.state.request) {
            this.handleNewRequest(this.state.request);
        }
    }

    /**
     * Method to go back to the results page. Passed as a callback
     * to the ItemDetails component.
     */
    backToResults = () => {
        this.setState({
            page: PAGE.RESULTS
        });

    }

    /**
     * Method that can be called to display an auto-hiding message.
     */
    displayMessage = (message) => {
        this.setState({
            message: message
        });
    }

    /**
     * Callback passed to the DisplayMessage component, triggered when
     * the message hides.
     * It goes back to the homepage if there is nothing to display
     * (i.e., no results and no selected item)
     */
    onMessageClose = () => {
        this.setState({
            message: "",
            page: (this.state.results.length === 0 &&
                !this.state.selectedItem) ? PAGE.HOME : this.state.page
        });
    }

    render() {
        return (
            <div style={{ marginTop: this.props.marginTop }}>
                <InputArea
                    handleNewRequest={this.handleNewRequest}
                    handleUpdateInput={this.handleUpdateInput}
                    searchText={this.state.searchText}
                    hintText={STRINGS.HINT_TEXT}
                    autoCompleteSource={this.state.autoCompleteSource}
                    radius={this.state.radius}
                    handleRadiusChange={this.handleRadiusChange}
                    onDragStop={this.onDragStop}
                    minRadius={RADIUS_PROPS.minRadius}
                    maxRadius={RADIUS_PROPS.maxRadius}
                    radiusStep={RADIUS_PROPS.radiusStep}
                    defaultRadius={RADIUS_PROPS.defaultRadius}
                />
                <Page
                    page={this.state.page}
                    request={this.state.request}
                    radius={this.state.radius}
                    results={this.state.results}
                    onResultClick={this.showItemDetails}
                    item={this.state.selectedItem}
                    backToResults={this.backToResults}
                />
                <DisplayMessage // This is not visible when message is empty
                    message={this.state.message}
                    autoHideDuration={MESSAGE_DURATION}
                    onMessageClose={this.onMessageClose}
                />
            </div>
        );
    }
}

export default Content;
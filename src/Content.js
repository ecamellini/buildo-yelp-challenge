import React from 'react';
import SearchBar from './SearchBar';
import DisplayResults from './DisplayResults';
import RangeSlider from './RangeSlider'
import YelpConfig from './yelp-api-config.js';
import YelpFusion from './yelp-fusion.js'
import Snackbar from 'material-ui/Snackbar';
import ItemDetails from './ItemDetails'
import Colors from './colors.js'


// TODO: fill autoCompleteSource with location autocomplete information

const STATE = {
    HOME: 0,
    RESULTS: 1,
    DETAILS: 2,
    NO_RESULTS: 4
}


const styles = {
    inputArea: {
        backgroundColor: Colors.APP_GREY,
        display: 'flex',
        flexFlow: 'row wrap'
    }
}


/**
 * Content component:
 * it contains the search bar, the radius slider 
 * and the area where to display the search results.
 */
class Content extends React.Component {
    defaultRadius = 5;
    maxRadius = 40; // max API value according to the docs
    minRadius = 1;
    radiusStep = 1;
    categories = "food,restaurants"
    resultsLimit = 50; // Max is 50

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            autoCompleteSource: [],
            request: "",
            radius: this.defaultRadius,
            results: [],
            page: STATE.HOME
        };

        this.handleNewRequest = this.handleNewRequest.bind(this);
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.handleRadiusChange = this.handleRadiusChange.bind(this);
        this.showItemDetails = this.showItemDetails.bind(this);

        // Setting up the API client instance
        YelpFusion.accessToken(YelpConfig.APP_ID, YelpConfig.APP_SECRET,
            YelpConfig.CORS_PROXY_URL).then(response => {
                this.yelpClient = YelpFusion.client(
                    response.jsonBody.access_token,
                    YelpConfig.CORS_PROXY_URL);
            }).catch(e => {
                console.log(e);
            });
    }

    /**
     * Callback passed to the SearchBar. It is triggered when the
     * user presses enter and starts the search.
     * 
     * This is the method that also performs API call to search for
     * restaurants.
     * 
     * @param {string} value The searched value
     */
    handleNewRequest(value) {
        this.yelpClient.search({
            location: value,  // Location inserted by the user
            radius: (this.state.radius * 1000), // Radius selected in the slider
            categories: this.categories, // Categories
            limit: this.resultsLimit // Max number of items returened
        }).then(response => {
            let r = response.jsonBody.businesses;
            let s = r.length > 0 ? STATE.RESULTS : STATE.NO_RESULTS
            this.setState({
                request: value,
                results: r,
                page: s
            });
        }).catch(e => {
            console.log(e);
        });
    }

    /**
     * Callback passed to the SearchBar. It is triggered when the
     * user changes the content of the search bar.
     * 
     * @param {string} value The value in the search bar
     */
    handleUpdateInput(value) {
        this.setState({
            searchText: value,
        });
    }

    /**
     * Callback passed to the RangeSlider. It is triggered when the
     * user changes the value of the Slider.
     * 
     * It also calls handleNewRequest so that the displayed results are
     * directly updated if the user already searched something.
     * 
     * @param {string} value The value in the search bar
     * @param {object} the event that triggered this change
     */
    handleRadiusChange(event, value) {
        this.setState({
            radius: value,
        });
        // This call is to update the displayed results for every change in radius
        if (this.state.request) {
            this.handleNewRequest(this.state.request);
        }
    }

    /**
     * Callback passed to DisplayResults. It is triggered when the user
     * clicks on one of the displayed results.
     * 
     * @param {object} item the element of the results clicked by the user
     */
    showItemDetails(item) {
        this.setState({
            page: STATE.DETAILS,
            selectedItem: item
        });
    }

    render() {
        return (
            <div>
                <div style={styles.inputArea}>
                    <SearchBar
                        handleNewRequest={this.handleNewRequest}
                        handleUpdateInput={this.handleUpdateInput}
                        searchText={this.state.searchText}
                        dataSource={this.state.autoCompleteSource} />
                    <RangeSlider
                        min={this.minRadius}
                        max={this.maxRadius}
                        step={this.radiusStep}
                        defaultValue={this.defaultRadius}
                        value={this.state.radius}
                        onChange={this.handleRadiusChange} />
                </div>
                <br />
                {this.state.page === STATE.RESULTS &&
                    <DisplayResults request={this.state.request}
                        radius={this.state.radius}
                        results={this.state.results}
                        onResultClick={this.showItemDetails} />}
                {this.state.page === STATE.DETAILS &&
                    <ItemDetails item={this.state.selectedItem} />}

                <Snackbar
                    open={this.state.page === STATE.NO_RESULTS}
                    message="No results found for the inserted location."
                    autoHideDuration={2000}
                />

            </div>
        );
    }
}

export default Content;
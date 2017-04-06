import React from 'react';
import SearchBar from './SearchBar';
import DisplayResults from './DisplayResults';
import RangeSlider from './RangeSlider'
import YelpConfig from './yelp-api-config.js';
import YelpFusion from './yelp-fusion.js'


// TODO: fill autoCompleteSource with location autocomplete information

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
            results: []
        };

        this.handleNewRequest = this.handleNewRequest.bind(this);
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.handleRadiusChange = this.handleRadiusChange.bind(this);

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
            this.setState({
                request: value,
                results: response.jsonBody.businesses
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
    showItemDetails(item){
        alert(item.name);
    }

    render() {
        return (
            <div>
                <div>
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
                <DisplayResults request={this.state.request}
                    radius={this.state.radius}
                    results={this.state.results}
                    onResultClick={this.showItemDetails}/>
            </div>
        );
    }
}

export default Content;
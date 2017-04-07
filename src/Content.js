import React from 'react';
import SearchBar from './SearchBar';
import DisplayResults from './DisplayResults';
import RangeSlider from './RangeSlider'
import YelpConfig from './yelp-api-config.js';
import YelpFusion from './yelp-fusion.js'
import Snackbar from 'material-ui/Snackbar';
import ItemDetails from './ItemDetails'
import Colors from './colors.js'
import HomePage from './HomePage'


// TODO: fill autoCompleteSource with location autocomplete information
// TODO: split in two components


const STATE = {
    HOME: 0,
    RESULTS: 1,
    DETAILS: 2
}


const styles = {
    inputArea: {
        backgroundColor: Colors.APP_GREY,
        display: 'flex',
        flexFlow: 'row wrap',
    },
    contentContainer: {
        padding: 10,
        maxWidth: 1000,
        margin: '0 auto'
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
    resultsLimit = 50; // max API value according to the docs

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            autoCompleteSource: [],
            request: "",
            radius: this.defaultRadius,
            results: [],
            page: STATE.HOME,
            message: "",
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
                console.log("Yelp API client ready.")
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
            //console.log(JSON.stringify(r[1], null, 4));
            let s = r.length > 0 ? STATE.RESULTS : this.state.page
            let m = r.length > 0 ? "" : "No results found for the inserted location"
            this.setState({
                request: value,
                results: r.length > 0 ? r : this.state.results,
                page: s,
                message: m,
            });
        }).catch(e => {
            console.log(e);
            this.setState({
                message: "Error while interfacing with Yelp",
            });
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
            <div style={{marginTop: this.props.marginTop}}>
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
                        onChange={this.handleRadiusChange}
                        onDragStop={() => {
                            // This call is to update the displayed results for every change in radius
                            if (this.state.request) {
                                this.handleNewRequest(this.state.request);
                            }
                        }} />
                </div>
                <div style={styles.contentContainer}>
                    {this.state.page === STATE.RESULTS &&
                        <DisplayResults request={this.state.request}
                            radius={this.state.radius}
                            results={this.state.results}
                            onResultClick={this.showItemDetails} />}
                    {this.state.page === STATE.DETAILS &&
                        <ItemDetails item={this.state.selectedItem} />}
                    {this.state.page === STATE.HOME &&
                        <HomePage />}
                </div>
                <Snackbar
                    open={this.state.message.length > 0}
                    message={this.state.message}
                    autoHideDuration={2000}
                    onRequestClose={() => {
                        console.log(this.state.results);
                        console.log(this.state.selectedItem);
                        this.setState({
                            message: "",
                            page: (this.state.results.length === 0 &&
                                !this.state.selectedItem) ? STATE.HOME : this.state.page
                        });
                    }}
                />

            </div>
        );
    }
}

export default Content;
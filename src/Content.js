import React from 'react';
import SearchBar from './SearchBar';
import DisplayResults from './DisplayResults';
import RangeSlider from './RangeSlider'
import YelpApi from './yelp-api'


const yelpApi = new YelpApi();
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

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            autoCompleteSource: [],
            request: "",
            radius: this.defaultRadius
        };

        this.handleNewRequest = this.handleNewRequest.bind(this);
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
        this.handleRadiusChange = this.handleRadiusChange.bind(this);
    }

    /**
     * Callback passed to the SearchBar. It is triggered when the
     * user presses enter and starts the search.
     * 
     * @param {string} value The searched value
     */
    handleNewRequest(value) {
        this.setState({
            request: value,
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

    handleRadiusChange(event, value) {
        this.setState({
            radius: value,
        });
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
                    radius={this.state.radius} />
            </div>
        );
    }
}

export default Content;
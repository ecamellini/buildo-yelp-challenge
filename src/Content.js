import React from 'react'
import SearchBar from './SearchBar'
import DisplayResults from './DisplayResults'
import Slider from 'material-ui/Slider';


// TODO: fill autoCompleteSource with locations

/**
 * Content component:
 * it contains the search bar, the radius slider 
 * and the area where to display the search results.
 */
class Content extends React.Component {
    defaultRadius = 5;

    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            autoCompleteSource: [],
            request: "",
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
                    <Slider
                        min={1}
                        max={40} // max value of the API according to the docs
                        step={1}
                        defaultValue={this.defaultRadius}
                        value={this.state.radius}
                        onChange={this.handleRadiusChange} />
                    <label>Radius: {this.state.radius ? this.state.radius
                        : this.defaultRadius} KM</label>
                </div>
                <DisplayResults request={this.state.request}
                    radius={this.state.radius ? this.state.radius :
                        this.defaultRadius} />
            </div>
        );
    }
}

export default Content;
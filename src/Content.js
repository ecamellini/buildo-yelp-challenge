import React from 'react'
import SearchBar from './SearchBar'
import DisplayResults from './DisplayResults'


// TODO: fill autoCompleteSource

/**
 * Content component:
 * it contains the search bar and the area where
 * to display the search results.
 */
class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            autoCompleteSource: [],
            request: "",
        };

        this.handleNewRequest = this.handleNewRequest.bind(this);
        this.handleUpdateInput = this.handleUpdateInput.bind(this);
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
    
    render() {
        return (
            <div>
                <SearchBar handleNewRequest={this.handleNewRequest}
                    handleUpdateInput={this.handleUpdateInput}
                    searchText={this.state.searchText}
                    dataSource={this.state.autoCompleteSource} />
                <DisplayResults request={this.state.request} />
            </div>
        );
    }
}

export default Content;
import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';


/**
 * SearchBar component: 
 * it contains a field where the user can type the
 * item to be searched.
 */
class SearchBar extends React.Component {
    render() {
        return (
            <div>
                <AutoComplete
                    id="searchBar" // To fix a Material UI warning
                    hintText="Insert a location and press enter"
                    searchText={this.props.searchText} // The value
                    dataSource={this.props.dataSource} // Source for the autocomplete
                    onUpdateInput={this.props.handleUpdateInput}
                    onNewRequest={this.props.handleNewRequest} // When enter is pressed
                //fullWidth={true}
                />
            </div>
        );
    }
}

export default SearchBar;
import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';


const styles = {
    searchBar: {
        alignSelf: 'center',
        order: 0,
        flex: '1 6 30%',
        paddingLeft: 20,
        paddingRight: 20,
    }
}


/**
 * SearchBar component: 
 * it contains a field where the user can type the
 * item to be searched.
 * 
 * This component is controlled by another component that should pass
 * searchText (real time value), onUpdateInput and onNewRequest.
 */
class SearchBar extends React.Component {
    render() {
        return (
            <div style={styles.searchBar}>
                <AutoComplete
                    hintText={this.props.hintText ? this.props.hintText : ""}
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
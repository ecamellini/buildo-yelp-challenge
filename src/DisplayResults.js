import React from 'react';
import { List, ListItem } from 'material-ui/List';


/**
 * Component that, given a search request, interacts with the Yelp API
 * and displays the results.
 */
class DisplayResults extends React.Component {
    render() {

        const results = this.props.results.map((item, idx) => {
            return <ListItem key={"result_" + idx}
            primaryText={item.name}
            onClick={() => this.props.onResultClick(item)}
            />
        });

        return (
            <div>
                <List>
                    {results}
                </List>
            </div>
        );
    }
}

export default DisplayResults;
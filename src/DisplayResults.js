import React from 'react';


/**
 * Component that, given a search request, interacts with the Yelp API
 * and displays the results.
 */
class DisplayResults extends React.Component {
    render() {
        return (
            <div>
                {this.props.request ? "You searched " + this.props.request +
                    " with radius " + this.props.radius : ""}
                <br/>
                {JSON.stringify(this.props.results, null, 4)}
            </div>
        );
    }
}

export default DisplayResults;
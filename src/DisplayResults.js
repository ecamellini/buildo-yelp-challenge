import React from 'react'


/**
 * Component that, given a search request,
 * interacts with the Yelp API and display
 * an interactive list of results
 */
class DisplayResults extends React.Component {
    render() {
        return (
            <div>
                {this.props.request ? "You searched " + this.props.request : ""}
            </div>
        );
    }
}

export default DisplayResults;
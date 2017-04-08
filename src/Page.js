import React from 'react';
import DisplayResults from './DisplayResults';
import ItemDetails from './ItemDetails'
import HomePage from './HomePage'
import { PAGE } from './constants.js'


const styles = {
    pageContainer: {
        padding: 10,
        maxWidth: 1000,
        margin: '0 auto'
    }
}


/**
 * This item displays the page selected by the page property.
 * The possible pages are home, search results and item details.
 */
class Page extends React.Component {
    render() {
        return (
            <div style={styles.pageContainer}>
                    {this.props.page === PAGE.RESULTS &&
                        <DisplayResults request={this.props.request}
                            radius={this.props.radius}
                            results={this.props.results}
                            onResultClick={this.props.onResultClick} />}
                    {this.props.page === PAGE.DETAILS &&
                        <ItemDetails item={this.props.item}
                            backToResults={this.props.backToResults} />}
                    {this.props.page === PAGE.HOME &&
                        <HomePage />}
                </div>
        );
    }
}

export default Page;
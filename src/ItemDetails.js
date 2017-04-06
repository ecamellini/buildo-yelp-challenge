import React from 'react';
import images from './images.js'


/**
 * Component that displays a given item returned by the
 * Yelp search API 
 */
class ItemDetails extends React.Component {
    render() {
        return (
            <div>
                {this.props.item.image_url &&
                    (<img src={this.props.item.image_url}
                        alt={this.props.item.name + " image on Yelp"}
                        style={{ width: 200 }}/>)}<br />
                {this.props.item.name}<br />
                {this.props.item.display_phone}<br />
                {this.props.item.is_closed ? "Closed now" : "Open now"}<br />
                {this.props.item.price}<br />
                <img src={images.getStars(this.props.item.rating)}
                    alt={"Yelp" + this.props.item.rating + " stars"}
                    style={{ width: 200 }} />
                {"( Based on " +
                    this.props.item.review_count + " reviews)"}<br />
                <a href={this.props.item.url}>
                    <img src={images.yelpLogo.logoOutlined}
                        alt={"Yelp logo tm"}
                        style={{ width: 100 }} />
                </a>
            </div>
        );
    }
}

export default ItemDetails;
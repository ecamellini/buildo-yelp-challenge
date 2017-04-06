import React from 'react';


class ItemDetails extends React.Component {
    render() {
        return (
            <div>
                {this.props.item.image_url &&
                    (<img src={this.props.item.image_url}
                        alt={this.props.item.name + " image on Yelp"}
                        style={{ width: 200 }} />)}<br />
                {this.props.item.name}<br />
                {this.props.item.display_phone}<br />
                {this.props.item.is_closed ? "Closed now" : "Open now"}<br />
                {this.props.item.price}<br />
                {this.props.item.rating + " (" +
                    this.props.item.review_count + " reviews)"}<br />
                <a href={this.props.item.url}>View on YELP</a> 
            </div>
        );
    }
}

export default ItemDetails;
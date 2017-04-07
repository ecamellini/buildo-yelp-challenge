import React from 'react';
import images from './images.js'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RestaurantIcon from 'material-ui/svg-icons/maps/restaurant';

/**
 * Component that displays a given item returned by the
 * Yelp search API 
 */
class ItemDetails extends React.Component {
    render() {
        const subtitle = (this.props.item.location.address1 + ", " +
            this.props.item.location.city + ", " +
            this.props.item.location.country);
        return (
            <div style={{ padding: 10 }}>
                <Card>
                    <CardHeader
                        style={{ textAlign: 'left' }}
                        avatar={<Avatar icon={<RestaurantIcon />} />}
                    />
                    {this.props.item.image_url &&
                        (<CardMedia
                            overlay={<CardTitle title={this.props.item.name}
                                subtitle={subtitle} />}>
                            <img src={this.props.item.image_url}
                                alt={this.props.item.name + " image on Yelp"} />
                        </CardMedia>)}
                    {!this.props.item.image_url &&
                        <CardTitle title={this.props.item.name} subtitle={subtitle} />}
                    <CardText>
                        {this.props.item.price}
                        {this.props.item.display_phone}<br />
                        {this.props.item.is_closed ? "Closed now" : "Open now"}<br />
                        <img src={images.getStars(this.props.item.rating)}
                            alt={"Yelp" + this.props.item.rating + " stars"}
                            style={{ width: 200 }} /><br/>
                        {"( Based on " +
                            this.props.item.review_count + " reviews)"}<br />
                        <a href={this.props.item.url}>
                            <img src={images.yelpLogo.logoOutlined}
                                alt={"Yelp logo tm"}
                                style={{ width: 100 }} />
                        </a>
                    </CardText>
                </Card>
            </div>
        );
    }
}

export default ItemDetails;
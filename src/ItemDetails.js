import React from 'react';
import images from './images.js'
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RestaurantIcon from 'material-ui/svg-icons/maps/restaurant-menu';
import Colors from './colors.js'


const styles = {
    cardHeader: {
        textAlign: 'left'
    },
    cardText: {
        color: Colors.APP_GREY_TEXT
    },
    yelpStars: {
        maxWidth: 200
    },
    yelpLogo: {
        maxWidth: 100
    }
}

/**
 * Component that displays a given item returned by the
 * Yelp search API 
 */
class ItemDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
    }
    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    };

    handleToggle = (event, toggle) => {
        this.setState({ expanded: toggle });
    };

    handleExpand = () => {
        this.setState({ expanded: true });
    };

    handleReduce = () => {
        this.setState({ expanded: false });
    };
    render() {
        const address = (this.props.item.location.display_address[0] + ", " +
            this.props.item.location.display_address[1] + ", " +
            this.props.item.location.display_address[2]);
        const open_string = this.props.item.is_closed ? "Closed now" :
            "Open now";
        const headerSubtitle = this.props.item.price ?
            "Price range: " + this.props.item.price : "No price information";
        const subtitle = address + ". " + this.props.item.display_phone
        const reviewsString = (this.props.item.review_count > 0 ?
            "Based on " + this.props.item.review_count + " review" +
            (this.props.item.review_count > 1 ? "s" : "")
            : "")
        return (
            <Card
                expanded={this.state.expanded} onExpandChange={this.handleExpandChange}
            >
                <CardHeader
                    style={styles.cardHeader}
                    subtitle={<b>{headerSubtitle}</b>}
                    title={<b>{open_string}</b>}
                    avatar={<Avatar icon={<RestaurantIcon />} />}
                    actAsExpander={this.props.item.image_url.length > 0}
                    showExpandableButton={this.props.item.image_url.length > 0}
                />
                {/*If the restaurant has an image we render the CardMedia with,
                       * title and subtitle overlayed on the image, 
                       * otherwise we render just the title and subtitle.*/
                }
                <CardMedia expandable={true}
                    overlay={<CardTitle
                        title={this.props.item.name}
                        subtitle={subtitle} />}>
                    <img src={this.props.item.image_url}
                        alt={this.props.item.name + " image on Yelp"} />
                </CardMedia>
                {!this.state.expanded &&
                    <CardTitle title={this.props.item.name} subtitle={subtitle} />}
                <CardText style={styles.cardText}>
                    <img src={images.getStars(this.props.item.rating)}
                        alt={"Yelp " + this.props.item.rating + " stars"}
                        style={styles.yelpStars} /><br />
                    {reviewsString}<br />
                    <a href={this.props.item.url}>
                        <img src={images.yelpLogo.logoOutlined}
                            alt={"Yelp logo tm"}
                            style={styles.yelpLogo} />
                    </a>
                </CardText>
            </Card>
        );
    }
}

export default ItemDetails;
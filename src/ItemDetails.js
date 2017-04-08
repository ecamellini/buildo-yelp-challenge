import React from 'react';
import images from './images.js'
import { Card, CardHeader, CardMedia, CardTitle, CardText, CardActions } from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RestaurantIcon from 'material-ui/svg-icons/maps/restaurant-menu';
import Colors from './colors.js'
import IconButton from 'material-ui/IconButton';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { STRINGS } from './constants'


const styles = {
    cardHeader: {
        textAlign: 'left'
    },
    cardText: {
        color: Colors.APP_GREY_TEXT,
        margin: 0,
        padding: 0,
        paddingTop: 10,
    },
    yelpStars: {
        maxWidth: 200
    },
    yelpLogo: {
        maxWidth: 100
    },
    cardActions: {
        textAlign: 'left'
    }
}


/**
 * Component that displays a given item returned by the
 * Yelp search API.
 */
class ItemDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
        };
    }

    /**
     * ALL the following methods handle the item Card expand/reduce events
     */
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
                    /* We make the card expandable only if the item
                    has an associated image */
                    actAsExpander={this.props.item.image_url.length > 0}
                    showExpandableButton={this.props.item.image_url.length > 0}
                />
                <CardMedia
                    /* In case the item has no image the card is not expandable,
                    so this media will not be displayable. */
                    expandable={true}
                    overlay={<CardTitle
                        title={this.props.item.name}
                        subtitle={subtitle} />}>
                    <img src={this.props.item.image_url}
                        alt={this.props.item.name + " image on Yelp"} />
                </CardMedia>
                {/* The title is shown only when the card is not expanded, since
                    when it is expanded we show the same info in the CardMedia
                    ovewlay*/
                    !this.state.expanded &&
                    <CardTitle title={this.props.item.name} subtitle={subtitle} />}
                <CardText style={styles.cardText}>
                    <img src={images.getStars(this.props.item.rating)}
                        alt={"Yelp " + this.props.item.rating + " stars"}
                        style={styles.yelpStars} /><br />
                    {reviewsString}<br />
                    <a href={this.props.item.url}>
                        <img src={images.yelpLogo.logoOutlined}
                            alt={STRINGS.YELP_LOGO}
                            style={styles.yelpLogo} />
                    </a>
                </CardText>
                <CardActions style={styles.cardActions}>
                    <IconButton tooltip={STRINGS.BACK_TO_RESULTS}
                        onClick={this.props.backToResults}>
                        <ArrowBack />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

export default ItemDetails;
import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import images from './images.js';
import RestaurantIcon from 'material-ui/svg-icons/maps/restaurant-menu';
import { Card, CardText } from 'material-ui/Card';


const styles = {
    item: {
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
    },
    itemText: {
        marginLeft: 20, order: 0, whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    },
    itemRating: { 
        maxWidth: 100,
        marginLeft: 20,
        order: 1
    }
}
/**
 * Component that, given a search request, interacts with the Yelp API
 * and displays the results.
 */
class DisplayResults extends React.Component {
    render() {

        const results = this.props.results.map((item, idx) => {
            return <ListItem
                key={"result_" + idx}
                primaryText={
                    <div style={styles.item}>
                        <lable style={styles.itemText}>{item.name}</lable>
                        <img src={images.getStars(item.rating)}
                            alt={"Yelp" + item.rating + " stars"}
                            style={styles.itemRating} />
                    </div>}
                onClick={() => this.props.onResultClick(item)}
                leftAvatar={<Avatar
                    src={item.image_url}
                    icon={<RestaurantIcon />}
                />}
            />
        });

        return (
            <Card>
                <CardText>
                    <List>
                        {results}
                    </List>
                </CardText>
            </Card>
        );
    }
}

export default DisplayResults;
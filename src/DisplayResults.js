import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import images from './images.js';
import RestaurantIcon from 'material-ui/svg-icons/maps/restaurant-menu';
import { Card, CardText } from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import Colors from './colors.js'
import Back2Top from 'react-back2top';


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
    },
    list: {
        position: 'relative',
        zIndex: 0
    },
    upButton: {
        position: 'fixed',
        bottom: 10,
        right: 10,
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
                    <List style={styles.list}>
                        {results}
                    </List>
                    <Back2Top>
                        <FloatingActionButton style={styles.upButton}
                            zDepth={1}
                            backgroundColor={Colors.BUILDO_RED} >
                            <ArrowUp />
                        </FloatingActionButton>
                    </Back2Top>
                </CardText>
            </Card>
        );
    }
}

export default DisplayResults;
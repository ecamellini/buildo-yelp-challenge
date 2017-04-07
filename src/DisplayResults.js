import React from 'react';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import images from './images.js';
import RestaurantIcon from 'material-ui/svg-icons/maps/restaurant';


/**
 * Component that, given a search request, interacts with the Yelp API
 * and displays the results.
 */
class DisplayResults extends React.Component {
    render() {

        const results = this.props.results.map((item, idx) => {
            return <ListItem style={{
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'center',
            }}
                key={"result_" + idx}
                primaryText={
                    <div>
                        <img src={images.getStars(item.rating)}
                            alt={"Yelp" + item.rating + " stars"}
                            style={{ width: 100 }} />
                        <lable>{item.name}</lable>
                    </div>}
                onClick={() => this.props.onResultClick(item)}
            leftAvatar={<Avatar
                src={item.image_url}
                icon={<RestaurantIcon />}
            />}
            />
        });

        return (
            <div>
                <List>
                    {results}
                </List>
            </div>
        );
    }
}

export default DisplayResults;
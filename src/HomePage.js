import React from 'react'
import { Card, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';


class HomePage extends React.Component {
    render() {
        return (
            <Card>
                <CardTitle
                    title={"Welcome to " + document.title}
                    subtitle={"Enter a location in the search bar, select the radius and press enter. " +
                        "Displayed results are updated dynamically according to range variations."} />
            </Card>
        );
    }
}

export default HomePage;
import React from 'react'
import { Card, CardTitle } from 'material-ui/Card';


const styles = {
    homeCard: {
        maxWidth: 500,
        margin: '0 auto',
        marginTop: 50
    }
}

class HomePage extends React.Component {
    render() {
        return (
            <Card style={styles.homeCard}>
                <CardTitle
                    title={"Welcome to " + document.title}
                    subtitle={"Enter a location in the search bar, select the radius and press enter. " +
                        "Displayed results are updated dynamically according to range variations."} />
            </Card>
        );
    }
}

export default HomePage;
import React from 'react'
import { Card, CardTitle } from 'material-ui/Card';
import { STRINGS } from './constants'


const styles = {
    homeCard: {
        maxWidth: 500,
        margin: '0 auto',
        marginTop: 50
    }
}


/**
 * Homepage component: it displays a title and a message
 * defined in the constants file.
 */
class HomePage extends React.Component {
    render() {
        return (
            <Card style={styles.homeCard}>
                <CardTitle
                    title={STRINGS.HOME_TITLE}
                    subtitle={STRINGS.HOME_TEXT} />
            </Card>
        );
    }
}

export default HomePage;
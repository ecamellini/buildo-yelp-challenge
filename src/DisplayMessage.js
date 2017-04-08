import React from 'react'
import Snackbar from 'material-ui/Snackbar';


/**
 * Component that displays a message on screen, with a given duration.
 * The message is displayed only if the message property is not empty
 * and disappears after a time that can be set through the autoHideDuration
 * property [milliseconds].
 */
class DisplayMessage extends React.Component {
    render() {
        return (
            <Snackbar
                open={this.props.message.length > 0}
                message={this.props.message}
                autoHideDuration={this.props.autoHideDuration}
                onRequestClose={this.props.onMessageClose}
            />
        );
    }
}

export default DisplayMessage;
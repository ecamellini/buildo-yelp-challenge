import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Content from './Content';
import RestaurantIcon from 'material-ui/svg-icons/maps/restaurant';
import Colors from './colors.js'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { STRINGS } from './constants.js'


// Needed for onTouchTap (Material UI)
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const styles = {
  app: {
    textAlign: 'center'
  },
  appBar: {
    backgroundColor: Colors.BUILDO_RED,
    position: 'fixed',
    top: 0
  }
}


/**
 * App main component with app bar, left drawer and content 
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false  // Drawer state
    };
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.app}>
          <AppBar
            iconElementLeft={<IconButton><RestaurantIcon /></IconButton>}
            // Open the drawer when the button is touched
            onLeftIconButtonTouchTap={() => this.setState({ open: true })}
            style={styles.appBar}
          />
          <Content marginTop={60} />
          <Drawer
            open={this.state.open}
            // The following two properties are needed to make the drawer
            // close while tapping somewhere else or pressing ESC
            docked={false}
            onRequestChange={(open) => this.setState({ open: open })}
          >
            <MenuItem onTouchTap={() => {
              window.location = STRINGS.CREDITS_URL
            }}>{STRINGS.CREDITS}</MenuItem>
            <MenuItem onTouchTap={() => {
              window.location = STRINGS.SOURCE_URL
            }}>{STRINGS.SOURCE}</MenuItem>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

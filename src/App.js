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


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleToggle = () => this.setState({ open: !this.state.open });

  handleClose = () => this.setState({ open: false });

  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.app}>
          <AppBar
            iconElementLeft={<IconButton><RestaurantIcon /></IconButton>}
            onLeftIconButtonTouchTap={this.handleToggle}
            style={styles.appBar}
          />
          <Content marginTop={60} />
          <Drawer
            open={this.state.open}
            docked={false}
            onRequestChange={(open) => this.setState({ open })}
          >
            <MenuItem onTouchTap={() => {
              window.location = "https://ecamellini.github.io"
            }}>Credits</MenuItem>
            <MenuItem onTouchTap={() => {
              window.location = "https://github.com/ecamellini/buildo-yelp-challenge"
            }}>Source code</MenuItem>
          </Drawer>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

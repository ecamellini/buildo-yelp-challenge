import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Content from './Content';
import RestaurantIcon from 'material-ui/svg-icons/maps/restaurant';
import Colors from './colors.js'


// Needed for onTouchTap (Material UI)
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();


const styles = {
  app: {
    textAlign: 'center'
  },
  appBar: {
    backgroundColor: Colors.BUILDO_RED,
    position: 'fixed', /* Set the navbar to fixed position */
    top: 0
  }
}


class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div style={styles.app}>
          <AppBar
            iconElementLeft={<IconButton><RestaurantIcon /></IconButton>}
            style={styles.appBar}
          />
          <Content marginTop={60} />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

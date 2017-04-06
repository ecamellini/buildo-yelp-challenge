import React from 'react';
import './App.css';
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


class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            iconElementLeft={<IconButton><RestaurantIcon /></IconButton>}
            style={{ backgroundColor: Colors.BUILDO_RED }}
          />
          <Content />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

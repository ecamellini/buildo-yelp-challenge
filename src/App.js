import React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import injectTapEventPlugin from 'react-tap-event-plugin';


// Needed for onTouchTap (Material UI)
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const buildoRed = "#F47C67";


class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar
            iconElementLeft={<IconButton></IconButton>}
            style={{ backgroundColor: buildoRed }}
          />
          Content will be here
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

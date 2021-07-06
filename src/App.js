import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Note from './components/Note';
import Create from './components/Create';
import Layout from './components/Layout';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import ToDoList from './components/ToDo';

// Always create the main theme under App.js, the theme will be applied globally
// The objects in createMuiTheme represents the theme config we want to define
const AppTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#1cb88e"
    },
    secondary: {
      main: "#24c4d6"
    }
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 200,
    fontWeightRegular: 400,
    fontWeightMedium: 550,
    fontWeightBold: 800
  },

  transitions: {
    duration: {
      shortest: 200,
      shorter: 250,
      short: 350,
      standard: 500,
      complex: 600,
      enteringScreen: 250,
      leavingScreen: 200
    }
  }

})

function App() {
  return (
    <ThemeProvider theme={AppTheme}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/">
              <Note />
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/todo">
              <ToDoList />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

import './App.css';
import home from './pages/home'
import NavBar from './components/NavBar';
import AddStudent from './pages/AddStudent'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
})

function App() {
  return (
   <MuiThemeProvider theme={theme}>
      <main className="App">
      <Router>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={home}/>
          <Route exact path="/add-student" component={AddStudent} />
          <Route path="/api/edit-student/:student" component={home}/>
        </Switch>
      </Router>
    </main>
   </MuiThemeProvider>
  );
}

export default App;

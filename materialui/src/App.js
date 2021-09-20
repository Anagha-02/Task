import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import { Component } from 'react';

import './App.css';
import Login from './pages/login';
import Registration from './pages/registration';
import LoginHomePage from './pages/loginHome';
import RegistrationHomePage from './pages/registrationHome';

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/"> <Redirect to="/login" /> </Route>
          <Route path="/login"> <Login /> </Route>
          <Route path="/register"> <Registration /> </Route>
          <Route path="/logHome"> <LoginHomePage /> </Route>
          <Route path="/regHome"> <RegistrationHomePage /> </Route>

        </Switch>

      </BrowserRouter>
    );
  }
}

export default App;
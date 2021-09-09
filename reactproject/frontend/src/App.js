import { BrowserRouter, Route } from 'react-router-dom';

import { Component } from 'react';

import './App.css';
import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import UserPage from './pages/users';
import HomePage from './pages/home';

const Registration = () => (
  <RegistrationPage />
);

const Login = () => (
  <LoginPage />
);

const User = () => (
  <UserPage />
);

const Home = () => (
  <HomePage />
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/registration" component={Registration} />
          <Route path="/login" component={Login} />
          <Route path="/user" component={User} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

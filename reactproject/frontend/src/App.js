import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Component } from 'react';

import './App.css';
import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import UserPage from './pages/users';
import HomePage from './pages/home';
import NavigationBar from './components/NavigationBar';
import DeleteUserPage from './pages/deleteUser';
import ChangePasswordPage from './pages/changePassword';

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

const Navigation = () => (
  <NavigationBar />
);

const DeleteUser = () => (
  <DeleteUserPage />
);

const ChangePassword = () => (
  <ChangePasswordPage />
);

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <Navigation />

        <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/registration" component={Registration} />
            <Route path="/login" component={Login} />
            <Route path="/user" component={User} />
            <Route path="/delete" component={DeleteUser} />
            <Route path="/password" component={ChangePassword} />
          </Switch>
        </div>

      </BrowserRouter>
    );
  }
}

export default App;
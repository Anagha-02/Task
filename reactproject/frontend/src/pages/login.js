import React, { Component } from 'react';

import '../App.css';
import LoginForm from './loginForm';

class LoginPage extends Component {
  render() {
      return (
        <div className="LoginPage">
          <h2>Login Page</h2>
          
          <LoginForm />
        </div>
        )
    }
}

export default LoginPage;
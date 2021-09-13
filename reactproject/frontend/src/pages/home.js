import React, { Component } from 'react';

import '../App.css';

class HomePage extends Component {
  render() {
    return (
      <div className="App-header">
        <div className="App">
          <p>
            Welcome to my first react application
          </p>
        </div>
        <div className="listClass">
          This application contains the following features:
          <ul className="listClass">
            <li> Login a user </li>
            <li> Register a new user </li>
            <li> View all users </li>
          </ul>
        </div>
          
      </div>
    );
  }
}

export default HomePage;
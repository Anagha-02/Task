import React, { Component } from 'react';

import '../App.css';
import RegistrationForm from './registrationForm';

class RegistrationPage extends Component {
    render() {
        return (
          <div className="RegistrationPage">
            <h2>Registration Page</h2>
              <RegistrationForm />
          </div>
        );
      }
}

export default RegistrationPage;
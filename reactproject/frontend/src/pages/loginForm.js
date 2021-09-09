import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

import '../App.css';

class LoginForm extends Component {
    
  handleFormSubmit(e) {
    e.preventDefault();
  }
  render() {
      return (
        <Form className="auth-form" onSubmit={this.handleFormSubmit}>
            <FormGroup controlId="formEmail" className="text-field">
                <label htmlFor="email">Username: </label>
                <FormControl type="text" placeholder="Username" />
            </FormGroup>
            <FormGroup controlId="formPassword" className="text-field">
                <label htmlFor="password">Password: </label>
                <FormControl type="password" placeholder="Password" />
            </FormGroup>
            <FormGroup controlId="formSubmit">
                <Button className="submitButton" type="submit" onClick={this.handleFormSubmit}>
                    Login
                </Button>
            </FormGroup>
        </Form>
        )
    }
}

export default LoginForm;
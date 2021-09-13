import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, FormLabel } from 'react-bootstrap';

import '../App.css';
import RegistrationSucess from './registrationSucess';


function PageHeading() {
  return (
    <div className="loginPage">
      <h2>Registration Page</h2>
    </div>
  )
}

class RegistrationPage extends Component {

  constructor(props) {
    super(props);
    this.usernameFm = React.createRef();
    this.passwordFm = React.createRef();
    this.state = {
      status: null,
      username: null,
      message: null
    };
  }

  submitHandler = event => {
    event.preventDefault();

    const username = this.usernameFm.current.value;
    const password = this.passwordFm.current.value;

    if (username.trim().length === 0 || password.trim().length === 0) {
      return this.setState({
        status: "error",
        message: "Please enter username and password",
        username: username
      });
    }

    let requestBody = {
      username: `${username}`,
      password: `${password}`
    }

    fetch('http://localhost:9000/users/register', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(resData => {
        this.setState({
          status: resData.status,
          message: resData.error,
          username: username
        })
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <PageHeading />

        <RegistrationSucess
          username={this.state.username}
          message={this.state.message}
          status={this.state.status}
        />

        <Form className="auth-form" onSubmit={this.submitHandler}>
        <FormGroup controlId="formEmail" className="text-field" >
            <FormLabel>Email: </FormLabel>
            <FormControl type="text" placeholder="Email"/>
          </FormGroup>
          <FormGroup controlId="formUsername" className="text-field" >
            <FormLabel>Username: </FormLabel>
            <FormControl type="text" placeholder="Username" ref={this.usernameFm} />
          </FormGroup>
          <FormGroup controlId="formPassword" className="text-field">
            <FormLabel>Password: </FormLabel>
            <FormControl type="password" placeholder="Password" ref={this.passwordFm} />
          </FormGroup>
          <FormGroup controlId="formSubmit">
            <Button className="submitButton" type="submit">
              Submit
            </Button>
          </FormGroup>
        </Form>

      </div>
    )
  }
}

export default RegistrationPage;
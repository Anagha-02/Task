import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

import '../App.css';

function PageHeading() {
  return (
    <div className="loginPage">
      <h2>User Page</h2>
    </div>
  )
}

function AllUserfunc({ data }) {
  if (data.length > 0) {
    return (
      <table>
        <thead>
          <tr>
            <th>Sl No.</th>
            <th>UserId</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => {
            return (
              <tr key={index}>
                <td> {index + 1} </td>
                <td>{data._id}</td>
                <td>{data.username}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    );
  }
  else {
    return (
      <h2>  </h2>
    );
  }
}


function SingleUserfunc({ userId, message }) {
  if (userId === 0 && message !== null) {
    return (
      <div className="errorMessage">
        User does not exists
      </div>
    );
  }
  else if (userId === null || message === null) {
    return (
      <div className="errorMessage">
        {message}
      </div>
    );
  }
  else {
    return (
      <table>
        <thead>
          <tr>
            <th> Sl No. </th>
            <th> UserId </th>
            <th> UserName </th>
          </tr>
        </thead>
        <tbody>
          <tr >
            <td> 1 </td>
            <td>{userId}</td>
            <td>{message} </td>
          </tr>
        </tbody>
      </table>
    );
  }

}

class UserPage extends Component {

  constructor(props) {
    super(props);
    this.userId = React.createRef();

    this.state = {
      id: null,
      username: null,
      data1: null,
      data: []
    };
  }


  submitHandlerAll = event => {
    event.preventDefault();
    fetch('http://localhost:9000/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(
        resdata => this.setState(
          {
            data: resdata,
            id: 0,
            username: null
          })
      )
      .catch(err => {
        console.log(err);
      });

  };

  submitHandlerSingle = event => {
    event.preventDefault();

    const id = this.userId.current.value;

    if (id.trim().length === 0) {
      return this.setState({
        id: null,
        username: "Please enter userId",
        data: []
      })
    }

    fetch('http://localhost:9000/users/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then(res => {
        return res.json();
      })
      .then(
        resdata => {
          if (resdata.message) {
            this.setState({
              id: 0,
              username: resdata.message,
              data: []
            })
          }
          else {
            this.setState({
              id: id,
              username: resdata.username,
              data: []
            })
          }
        }
      )
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <PageHeading />
        <div className="userDiv">
          <Button className="submitButton" type="submit" onClick={this.submitHandlerAll}>
            Get all users
          </Button>
        </div>

        <Form className="auth-form" onSubmit={this.submitHandlerSingle}>
          <FormGroup controlId="formId" className="text-field" >
            <FormControl type="text" placeholder="UserId" ref={this.userId} />
          </FormGroup>
          <FormGroup controlId="formSubmit">
            <Button className="submitButton" type="submit">
              Get User with Id
            </Button>
          </FormGroup>
        </Form>

        <SingleUserfunc
          userId={this.state.id}
          message={this.state.username}
        />

        <AllUserfunc
          data={this.state.data}
        />

      </div>
    )
  }
}

export default UserPage;

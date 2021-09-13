import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button, FormLabel } from 'react-bootstrap';

import '../App.css';
import Auth from '../components/auth';

function PageHeading() {
    return (
        <div className="loginPage">
            <h2>Change Password Page</h2>
        </div>
    )
}

function ChangePasswordSucess({ userId, message, status }) {
    if (status === "error" || (message === 0 || message === null || message === '')) {
        return (
            <div className="errorMessage">
                {message}
            </div>
        );
    }
    else {
        return (
            <div className="sucessMessage">
                <p> {message}</p>
            </div>

        );
    }
}

class ChangePasswordPage extends Component {

    constructor(props) {
        super(props);
        this.confirmpasswordFm = React.createRef();
        this.passwordFm = React.createRef();
        this.state = {
            status: null,
            id: null,
            message: null
        };
    }

    static contextType = Auth;

    onClickHandler = event => {
        event.preventDefault();

        const token = this.context.token;
        const confirmPassword = this.confirmpasswordFm.current.value;
        const password = this.passwordFm.current.value;

        console.log("token in password file: " + token);

        if (confirmPassword.trim().length === 0 || password.trim().length === 0) {
            return this.setState({
                status: "error",
                message: "Please enter password",
                id: 0
            });
        }
        else if (password !== confirmPassword) {
            return this.setState({
                status: "error",
                message: "Passwords do not match",
                id: 0
            });
        }
        let requestBody = {
            newpassword: `${password}`,
            token: `${token}`
        }

        fetch('http://localhost:9000/users/change-password/', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Authorization': token
            }
        })
            .then(res => {
                return res.json();
            })
            .then(resData => {
                if (resData.status) {
                    this.setState({
                        status: resData.status,
                        message: resData.error,
                        id: 0
                    });
                }
                else {
                    this.setState({
                        status: "ok",
                        id: resData.id,
                        message: "Password changed sucessfully"
                    });
                }
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            <div>
                <div>
                    <PageHeading />
                </div>
                <div>
                    <ChangePasswordSucess
                        status={this.state.status}
                        userId={this.state.id}
                        message={this.state.message}
                    />
                </div>
                <Form className="auth-form" onSubmit={this.onClickHandler}>
                    <FormGroup controlId="formPassword" className="text-field" >
                        <FormLabel htmlFor="password">Password: </FormLabel>
                        <FormControl type="password" placeholder="Password" ref={this.passwordFm} />
                    </FormGroup>
                    <FormGroup controlId="formPassword1" className="text-field">
                        <FormLabel htmlFor="password">Confirm Password: </FormLabel>
                        <FormControl type="password" placeholder="Confirm Password" ref={this.confirmpasswordFm} />
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

export default ChangePasswordPage;
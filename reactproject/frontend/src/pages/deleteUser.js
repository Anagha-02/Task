import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Button } from 'react-bootstrap';

import '../App.css';

function PageHeading() {
    return (
        <div className="loginPage">
            <h2>Delete User Page</h2>
        </div>
    )
}

function DeleteSucess({ userId, message, status }) {
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
                <p> {message} with userId {userId} </p>
            </div>

        );
    }
}


class DeleteUserPage extends Component {

    constructor(props) {
        super(props);
        this.userId = React.createRef();

        this.state = {
            id: 0,
            message: null,
            status: null
        };
    }


    submitHandler = event => {
        event.preventDefault();

        const id = this.userId.current.value;

        if (id.trim().length === 0) {
            return this.setState({
                message: "Please enter userId",
                id: 0,
                status: "error"
            });
        }

        fetch('http://localhost:9000/users/' + id, {
            method: 'DELETE',
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
                    this.setState({
                        id: id,
                        message: resdata.message,
                        status: resdata.status
                    })
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
                <DeleteSucess
                    status={this.state.status}
                    userId={this.state.id}
                    message={this.state.message}
                />
                <Form className="auth-form" onSubmit={this.submitHandler}>
                    <FormGroup controlId="formId" className="text-field" >
                        <FormControl type="text" placeholder="UserId" ref={this.userId} />
                    </FormGroup>
                    <FormGroup controlId="formSubmit">
                        <Button className="submitButton" type="submit">
                            Delete User with Id
                        </Button>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default DeleteUserPage;

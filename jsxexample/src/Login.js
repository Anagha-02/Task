import React, { Component } from 'react';

class LoginPage extends Component {
 message = null;

    onClickHandler = event => {
        event.preventDefault();
        <div>
            Login Sucessful!
        </div>
    }
    render() {
        return (
            <div>
                <label>Username: </label>
                <input type="text" placeholder="Username" />
                <label>Password: </label>
                <input type="password" placeholder="Password" />
                <button className="submitButton" type="submit" onClick={this.onClickHandler}>
                    Login
                </button>
            </div>
        )
    }
}

export default LoginPage;
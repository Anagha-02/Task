import React, { Component } from 'react';
import { Nav, NavLink } from 'react-bootstrap';

import '../App.css';

class NavigationBar extends Component {
    render() {
        return (
            <div className="nav-header">
                <Nav className="main-navigation__items">
                    <NavLink href="/" className="App-link"> Home </NavLink>
                    <NavLink href="/login" className="App-link"> Login </NavLink>
                    <NavLink href="/registration" className="App-link"> Register </NavLink>
                    <NavLink href="/user" className="App-link"> User </NavLink>
                </Nav>
            </div>
        )
    }
}

export default NavigationBar;



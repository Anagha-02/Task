import React, { Component } from 'react';
import { Nav, NavLink } from 'react-bootstrap';

import '../App.css';

class NavigationBar extends Component {
    render() {
        return (
            <div className="nav-header">
                <Nav className="main-navigation__items">
                    <NavLink href="/StateTutorial" className="App-link"> StateTutorial </NavLink>
                    <NavLink href="/ReducerTutorial" className="App-link"> ReducerTutorial </NavLink>
                    <NavLink href="/ContextTutorial" className="App-link"> ContextTutorial </NavLink>
                    <NavLink href="/CallBackTutorial" className="App-link"> CallBackTutorial </NavLink>
                    <NavLink href="/RefTutorial" className="App-link"> RefTutorial </NavLink>
                    <NavLink href="/EffectTutorial" className="App-link"> EffectTutorial </NavLink>
                    <NavLink href="/MemoTutorial" className="App-link"> MemoTutorial </NavLink>
                </Nav>
            </div>
        )
    }
}

export default NavigationBar;

// <NavLink href="/ImperativeHandle" className="App-link"> ImperativeHandle </NavLink>

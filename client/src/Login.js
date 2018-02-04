import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { login } from './store/thunks';

export default withRouter(connect()(class Login extends Component {

    login = e => {
        e.preventDefault();
        this.props.dispatch(login(this.username.value, this.password.value, this.props.history));
    };

    render() {
        return (
            <form onSubmit={this.login}>
                <label htmlFor="username">Username</label><input name="username" id="username" ref={el => this.username = el} />
                <label htmlFor="password">Password</label><input name="password" type="password" id="password"  ref={el => this.password = el} />
                <button>Log in</button>
            </form>
        );
    }
}));
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Provider, connect } from 'react-redux';
import logo from './logo.svg';
import './Home.css';

import MyAccount from './components/MyAccount';
import SymbolSearch from './components/SymbolSearch';

export default withRouter(connect(({ user }) => ({ user }))(class Home extends Component {
  componentWillMount() {
    if (!this.props.user) {
      this.props.history.push('/login');
    }
  }
  render() {
    if (!this.props.user) {
      return <span>Please log in</span>;
    }
    const { cash, stocks } = this.props.user;
    return (
      <div className="App">
        <MyAccount user={this.props.user} />
        <div>
          <h2>Search stocks</h2>
          <SymbolSearch />
        </div>
      </div>
    );
  }
}));

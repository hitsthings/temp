import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import './App.css';

import Home from './Home';
import Login from './Login';

export default connect(({ user }) => ({ user }))(class App extends Component {
  render() {
    
    return (
      <Provider store={this.props.store}>
        <Router>
          <div>
            {this.props.user && <ul>
              <li><Link to="/">Home</Link></li>
              {this.props.user ?
                <li><Link to="/logout">Logout {this.props.user.name} (not implemented)</Link></li> :
                <li><Link to="/login">Login</Link></li>
              }
            </ul>}
      
            {this.props.user && <hr/>}
      
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
          </div>
        </Router>
      </Provider>
    );
  }
});

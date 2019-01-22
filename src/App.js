import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Login from './components/Login.js';
import Timetable from './components/Timetable.js';
import Registration from './components/Registration.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Login</Link></li>
            <li><Link to="/registration">Registration</Link></li>
          </ul>
          <Route path="/" exact component={Login} />
          <Route path="/registration" component={Registration} />
          <Route path="/timetable" component={Timetable} />
        </div>
      </Router> 
    )
  }
}

export default App;

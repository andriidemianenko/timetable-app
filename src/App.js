import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import Login from './components/Login.js';
import Timetable from './components/Timetable.js';
import Registration from './components/Registration.js';
import Editor from './components/Editor.js'

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
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/registration" component={Registration} />
            <Route path="/timetable/user/:userId" component={Timetable} />
            <Route path="/editor/user/:userId" component={Editor} />
          </Switch>
        </div>
      </Router> 
    )
  }
}

export default App;

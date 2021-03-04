import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from '../Home/Home';
import User from '../Users/User';
import Users from '../Users/Users';

function MainComponent() {
  return (
    <div>
      <Router>
        <div>

          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/users" component={Users} />
            <Route path="/user/:id" component={User} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default MainComponent;


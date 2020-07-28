import React, { Component } from 'react';
import './App.css';
import Home from './Components/Home';
import Result from './Components/Result';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router basename="/geektrust/">
          <div>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/result" exact component={Result}/>
            </Switch>
          </div>
      </Router>
    );
  }
}

export default App;

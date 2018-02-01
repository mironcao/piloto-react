import React, { Component } from 'react';
import './App.css';
import Banco from './containers/Banco/Banco';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
            <Route path="/" component={Banco} />
          </Switch>
      </div>
    );
  }
}

export default App;

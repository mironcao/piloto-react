import React, { Component } from 'react';
import './App.css';
import Banco from './containers/Banco/Banco';
import MisCuentas from './containers/Banco/MisCuentas';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
            <Route path="/" component={MisCuentas} />
          </Switch>
      </div>
    );
  }
}

export default App;

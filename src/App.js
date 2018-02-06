import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import MisMovimientos from './containers/movimientos/MisMovimientos';
import CreateMovimiento from './containers/movimientos/CreateMovimiento';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
            <Route path="/misMovimientos" component={MisMovimientos} />
            <Route path="/CrearMovimiento" component={CreateMovimiento} />
          </Switch>
      </div>
    );
  }
}

export default App;

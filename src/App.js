import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import MisMovimientos from './containers/movimientos/MisMovimientos';
import CreateMovimiento from './containers/movimientos/CreateMovimiento';
import MisCuentas from './containers/Cuenta/MisCuentas';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
            <Route path="/miscuentas" component={MisCuentas} />
            <Route path="/misMovimientos" component={MisMovimientos} />
            <Route path="/CrearMovimiento" component={CreateMovimiento} />
          </Switch>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import MisMovimientos from './containers/movimientos/MisMovimientos';
import CreateMovimiento from './containers/movimientos/CreateMovimiento';
import MisCuentas from './containers/Cuenta/MisCuentas';
import Transferencias from './containers/Banco/Transferencias';
import ListarTransferencias from './containers/Banco/ListarTransferencias';
import GenerarTransferencia from './containers/Banco/GenerarTransferencia';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>

            <Route path="/misCuentas" component={MisCuentas} />
            <Route path="/misMovimientos" component={MisMovimientos} />
            <Route path="/CrearMovimiento" component={CreateMovimiento} />
            <Route path="/Transferencias" component={Transferencias}/>
            <Route path="/GenerarTransferencia" component={GenerarTransferencia}/>
            <Route path="/ListarTransferencias" component={ListarTransferencias}/>
          </Switch>
      </div>
    );
  }
}

export default App;

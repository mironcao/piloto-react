import React, { Component } from 'react';
import './App.css';
import ListarCliente from './containers/Cliente/ListarCliente';
import AñadirCliente from './containers/Cliente/AñadirCliente';
import { Route, Switch } from 'react-router-dom';
import EditarCliente from './containers/Cliente/EditarCliente';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
            <Route path="/ListarClientes" component={ListarCliente} />
            <Route path="/AñadirClientes" component={AñadirCliente} />
            <Route path="/EditarCliente" component={EditarCliente} />
          </Switch>
      </div>
    );
  }
}

export default App;

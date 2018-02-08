import React, { Component } from 'react';
import './App.css';
import Banco from './containers/Banco/Banco';
import { Route, Switch } from 'react-router-dom';

import Sucursales from './containers/Sucursales/Sucursales';
import MisMovimientos from './containers/movimientos/MisMovimientos';
import CreateMovimiento from './containers/movimientos/CreateMovimiento';
import MisCuentas from './containers/Cuenta/MisCuentas';
import Transferencias from './containers/Banco/Transferencias';
import ListarTransferencias from './containers/Banco/ListarTransferencias';
import GenerarTransferencia from './containers/Banco/GenerarTransferencia';
import ListarCliente from './containers/Cliente/ListarCliente';
import AñadirCliente from './containers/Cliente/AñadirCliente';
import EditarCliente from './containers/Cliente/EditarCliente';
import Empleado from './containers/Empleado/Empleado';
import NuevoEmpleado from './containers/Empleado/NuevoEmpleado';
import ModificarEmpleado from './containers/Empleado/ModificarEmpleado';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
            <Route path="/sucursales" exact component={Sucursales}/>
            <Route path="/misCuentas" component={MisCuentas} />
            <Route path="/misMovimientos" component={MisMovimientos} />
            <Route path="/CrearMovimiento" component={CreateMovimiento} />
            <Route path="/Transferencias" component={Transferencias}/>
            <Route path="/GenerarTransferencia" component={GenerarTransferencia}/>
            <Route path="/ListarTransferencias" component={ListarTransferencias}/>
            <Route path="/ListarClientes" component={ListarCliente} />
            <Route path="/AñadirClientes" component={AñadirCliente} />
            <Route path="/EditarCliente" component={EditarCliente} />
            <Route path="/banco" component={Banco} />
            <Route path="/empleado" component={Empleado} />
            <Route path="/nuevoEmpleado" component={NuevoEmpleado} />
            <Route path="/modificarEmpleado" component={ModificarEmpleado} />
          </Switch>
      </div>
    );
  }
}

export default App;

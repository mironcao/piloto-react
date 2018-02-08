import React, { Component } from 'react';
import './App.css';
import Banco from './containers/Banco/Banco';
import { Route, Switch } from 'react-router-dom';
import Empleado from './containers/Empleado/Empleado';
import NuevoEmpleado from './containers/Empleado/NuevoEmpleado';
import ModificarEmpleado from './containers/Empleado/ModificarEmpleado';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
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

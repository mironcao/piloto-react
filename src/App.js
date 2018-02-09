import React, { Component } from 'react';
import './App.css';
import Banco from './containers/Banco/Banco';
import { Route, Switch, Link } from 'react-router-dom';
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
import GestionTitulares from './containers/titulares/GestionTitulares';

import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react'


class App extends Component {
  render() {
    return (
      <div>
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} width='thin' visible icon='labeled' vertical inverted>
            <Link to="/miscuentas">
            <Menu.Item>
              <Icon name='money' />
              Mis cuentas
            </Menu.Item>
            </Link>
            <Link to="/sucursales">
            <Menu.Item>
              <Icon name='exchange' />
              Sucursales
            </Menu.Item>
            </Link>
            <Link to="/empleado">
            <Menu.Item>
              <div>
              <Icon.Group size='big'>
                <Icon name='exchange' />
                <Icon corner name='add' color='green' />
              </Icon.Group>
              </div>
              Gestionar empleados
            </Menu.Item>
            </Link>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic className="grande" >
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
                  <Route path="/titulares" component={GestionTitulares} />
                </Switch>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default App;

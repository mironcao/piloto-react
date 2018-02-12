import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';
import * as actions from "../../store/actions";
import { Button } from 'semantic-ui-react';
import Sucursales from '../Sucursales/Sucursales';
import MisMovimientos from '../movimientos/MisMovimientos';
import CreateMovimiento from '../movimientos/CreateMovimiento';
import MisCuentas from '../Cuenta/MisCuentas';
import Transferencias from '../Banco/Transferencias';
import ListarTransferencias from '../Banco/ListarTransferencias';
import GenerarTransferencia from '../Banco/GenerarTransferencia';
import ListarCliente from '../Cliente/ListarCliente';
import AñadirCliente from '../Cliente/AñadirCliente';
import EditarCliente from '../Cliente/EditarCliente';
import GestionTitulares from '../titulares/GestionTitulares';
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';


class Banco extends Component {

  generateContent() {
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
            <Segment basic className='grande'>
            <Route path="/sucursales" exact component={Sucursales} />
            <Route exact path="/misCuentas" component={MisCuentas} />
            <Route path="/misMovimientos/CrearMovimiento" component={CreateMovimiento} />
            <Route path="/misMovimientos" component={MisMovimientos} />
            <Route path="/CrearMovimiento" component={CreateMovimiento} />
            <Route exact strict path="/Transferencias/GenerarTransferencia" component={GenerarTransferencia} />
            <Route exact strict path="/Transferencias/ListarTransferencias" component={ListarTransferencias} />
            <Route path="/Transferencias" component={Transferencias} />
            <Route path="/ListarClientes" component={ListarCliente} />
            <Route path="/AñadirClientes" component={AñadirCliente} />
            <Route path="/EditarCliente" component={EditarCliente} />
            <Route path="/titulares" component={GestionTitulares} />
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>)
  }

  render() {
    return (
      this.generateContent()
    );
  }
}

const mapStateToProps = state => {
  return {
    test: state.test,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    ejemplo: data => {
      dispatch(actions.ejemploAction)
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Banco));
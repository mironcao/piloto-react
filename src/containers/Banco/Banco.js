import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment, Menu, Icon, Container } from 'semantic-ui-react';
import * as actions from "../../store/actions";
import { Button } from 'semantic-ui-react';
import Sucursales from '../Sucursales/Sucursales';
import MisMovimientos from '../movimientos/MisMovimientos';
import CreateMovimiento from '../movimientos/CreateMovimiento';
import MisCuentas from '../Cuenta/MisCuentas';
import ListarTransferencias from '../Banco/ListarTransferencias';
import GenerarTransferencia from '../Banco/GenerarTransferencia';
import ListarCliente from '../Cliente/ListarCliente';
import AñadirCliente from '../Cliente/AñadirCliente';
import EditarCliente from '../Cliente/EditarCliente';
import Empleado from '../Empleado/Empleado';
import NuevoEmpleado from '../Empleado/NuevoEmpleado';
import ModificarEmpleado from '../Empleado/ModificarEmpleado';
import GestionTitulares from '../titulares/GestionTitulares';
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';


class Banco extends Component {

  state = { activeItem: '/misCuentas' }

  logout = () => {
    this.props.pasarUser(null);
  }

  handleItemClick = (path) => {
    this.setState({ activeItem: path });
    this.props.history.push(path)
  }

  generateContent() {
    return (
      <div>
        <nav>
          <Menu pointing size="huge" icon='labeled'>
            <Menu.Item name='Mis Cuentas' active={this.activeItem === '/misCuentas'} onClick={() => this.handleItemClick('/misCuentas')} >
              <Icon name='suitcase' />
              MisCuentas
            </Menu.Item>
            <Menu.Item name='Sucursales' active={this.activeItem === '/sucursales'} onClick={() => this.handleItemClick('/sucursales')} >
              <Icon name='building' />
              Sucursales
            </Menu.Item>
            <Menu.Item name='Empleados' active={this.activeItem === '/empleado'} onClick={() => this.handleItemClick('/empleado')} >
              <Icon name='users' />
              Empleados
            </Menu.Item>
            <Menu.Item name='Clientes' active={this.activeItem === '/ListarClientes'} onClick={() => this.handleItemClick('/ListarClientes')} >
              <Icon name='users' />
              Clientes
             </Menu.Item>
             <Menu.Item name='Logout' active={this.activeItem === '/misCuentas'} onClick={this.logout} >
              <Icon name='log out' />
              Logout
             </Menu.Item>

          </Menu>
        </nav>
        <section>
          <Container>
            <Route path="/sucursales" exact component={Sucursales} />
            <Route exact path="/misCuentas" component={MisCuentas} />
            <Route path="/misMovimientos/CrearMovimiento" component={CreateMovimiento} />
            <Route exact path="/misMovimientos" component={MisMovimientos} />
            <Route path="/CrearMovimiento" component={CreateMovimiento} />
            <Route exact strict path="/Transferencias/GenerarTransferencia" component={GenerarTransferencia} />
            <Route exact strict path="/Transferencias/ListarTransferencias" component={ListarTransferencias} />
            <Route path="/ListarClientes" component={ListarCliente} />
            <Route path="/Clientes/AñadirClientes" component={AñadirCliente} />
            <Route path="/Clientes/EditarCliente" component={EditarCliente} />
            <Route path="/titulares" component={GestionTitulares} />
            <Route path="/empleado" component={Empleado} />
            <Route path="/nuevoEmpleado" component={NuevoEmpleado} />
            <Route path="/modificarEmpleado" component={ModificarEmpleado} />
          </Container>
        </section>
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
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    pasarUser: user => {
      dispatch(actions.pasarUser(user))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Banco));
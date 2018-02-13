import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';
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

  logout=()=> {
    this.props.pasarUser(null);  
  }

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
                  <Icon name='users' />
                Gestionar empleados
              </Menu.Item>
            </Link>
            <Menu.Item onClick={this.logout}>
                  <Icon.Group size='big'>
                    <Icon name='sign out' />
                    <Icon corner name='add' color='green' />
                  </Icon.Group>
                Log out
            </Menu.Item>
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
            <Route path="/ListarClientes" component={ListarCliente} />
            <Route path="/AñadirClientes" component={AñadirCliente} />
            <Route path="/EditarCliente" component={EditarCliente} />
            <Route path="/titulares" component={GestionTitulares} />
            <Route path="/empleado" component={Empleado} />
            <Route path="/nuevoEmpleado" component={NuevoEmpleado} />
            <Route path="/modificarEmpleado" component={ModificarEmpleado} />
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
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
	return {
		pasarUser: user => {
			dispatch(actions.pasarUser(user))}
	}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps) (Banco));
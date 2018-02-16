import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Icon, Container } from 'semantic-ui-react';
import * as actions from "../../store/actions";
import Sucursales from '../Sucursales/Sucursales';
import MisMovimientos from '../movimientos/MisMovimientos';
import CreateMovimiento from '../movimientos/CreateMovimiento';
import MisCuentas from '../Cuenta/MisCuentas';
import MisCuentasAdmin from '../Cuenta/MisCuentasAdmin';
import ListarTransferencias from '../Banco/ListarTransferencias';
import GenerarTransferencia from '../Banco/GenerarTransferencia';
import ListarCliente from '../Cliente/ListarCliente';
import AñadirCliente from '../Cliente/ClienteContenedorAñadir';
import EditarCliente from '../Cliente/ClienteContenedorEditar';
import Empleado from '../Empleado/Empleado';
import NuevoEmpleado from '../Empleado/NuevoEmpleado';
import ModificarEmpleado from '../Empleado/ModificarEmpleado';
import GestionTitulares from '../titulares/GestionTitulares';
import MisTarjetas from '../tarjetas/pages/MisTarjetas';
import TarjetasListAdminPage from "../tarjetas/pages/tarjetas-list-admin-page";
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';


class Banco extends Component {

  state = { activeItem: '/misCuentas' }

  logout = () => {
    axios.post('http://localhost:8080/login/out')
    .then(response => {
      
    }).catch(function (error){
      
    })
    this.props.logout();
  }

  handleItemClick = (path) => {
    this.setState({ activeItem: path });
    this.props.history.push(path)
  }

  mostrarLinks = () => {
    

    if (this.props.user.role === "USER") {
      return (
        <React.Fragment>
          <Menu.Item name='Mis Cuentas' active={this.activeItem === '/misCuentas'} onClick={() => this.handleItemClick('/misCuentas')} >
            <Icon name='suitcase' />
            Mis cuentas
        </Menu.Item>
        <Menu.Item name='Mis tarjetas' active={this.activeItem === '/misTarjetas'} onClick={() => this.handleItemClick('/misTarjetas')} >
            <Icon name='credit card alternative' />
            Mis tarjetas
          </Menu.Item>
          <Menu.Item name='Logout' active={this.activeItem === '/misCuentas'} onClick={this.logout} >
            <Icon name='log out' />
            Logout
         </Menu.Item>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Menu.Item name='Cuentas' active={this.activeItem === '/misCuentas'} onClick={() => this.handleItemClick('/misCuentas')} >
            <Icon name='suitcase' />
            Cuentas
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
          <Menu.Item name='Tarjetas' active={this.activeItem === '/tarjetas'} onClick={() => this.handleItemClick('/tarjetas')} >
            <Icon name='credit card alternative' />
            Tarjetas
          </Menu.Item>
          <Menu.Item name='Logout' active={this.activeItem === '/misCuentas'} onClick={this.logout} >
            <Icon name='log out' />
            Logout
             </Menu.Item>
        </React.Fragment>
      );
    }
  }

  generarRoutes = () => {
    if (this.props.user.role === "USER") {
      return (
        <React.Fragment>
          <Route exact path="/misCuentas" component={MisCuentas} />
          <Route path="/misMovimientos/CrearMovimiento" component={CreateMovimiento} />
          <Route exact path="/misMovimientos" component={MisMovimientos} />
          <Route path="/CrearMovimiento" component={CreateMovimiento} />
          <Route exact strict path="/Transferencias/GenerarTransferencia" component={GenerarTransferencia} />
          <Route exact strict path="/Transferencias/ListarTransferencias" component={ListarTransferencias} />
          <Route path="/misTarjetas" component={MisTarjetas} />
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Route path="/sucursales" exact component={Sucursales} />
          <Route exact path="/misCuentas" component={MisCuentasAdmin} />
          <Route path="/misMovimientos/CrearMovimiento" component={CreateMovimiento} />
          <Route exact path="/misMovimientos" component={MisMovimientos} />
          <Route path="/CrearMovimiento" component={CreateMovimiento} />
          <Route exact strict path="/Transferencias/GenerarTransferencia" component={GenerarTransferencia} />
          <Route exact strict path="/Transferencias/ListarTransferencias" component={ListarTransferencias} />
          <Route path="/ListarClientes" component={ListarCliente} />
          <Route path="/Clientes/AñadirCliente" component={AñadirCliente} />
          <Route path="/Clientes/EditarCliente" component={EditarCliente} />
          <Route path="/titulares" component={GestionTitulares} />
          <Route path="/empleado" component={Empleado} />
          <Route path="/nuevoEmpleado" component={NuevoEmpleado} />
          <Route path="/modificarEmpleado" component={ModificarEmpleado} />
          <Route path="/titulares" component={GestionTitulares} />
          <Route path="/tarjetas" component={TarjetasListAdminPage} />
        </React.Fragment>
      );
    }
  }

  generateContent() {
    return (
      <div>
        <nav>
          <Menu pointing size="huge" icon='labeled'>
            {this.mostrarLinks()}
          </Menu>
        </nav>
        <section>
          <Container>
            {this.generarRoutes()}
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
    user: state.bancoStore.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(actions.logout())
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Banco));
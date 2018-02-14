import React, { Component } from 'react';
import './App.css';
import Banco from './containers/Banco/Banco';
import { Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
import Sucursales from './containers/Sucursales/Sucursales';
import MisMovimientos from './containers/movimientos/MisMovimientos';
import CreateMovimiento from './containers/movimientos/CreateMovimiento';
import MisCuentas from './containers/Cuenta/MisCuentas';
import ListarTransferencias from './containers/Banco/ListarTransferencias';
import GenerarTransferencia from './containers/Banco/GenerarTransferencia';
import ListarCliente from './containers/Cliente/ListarCliente';
import AñadirCliente from './containers/Cliente/ClienteContenedorAñadir';
import EditarCliente from './containers/Cliente/ClienteContenedorEditar';
import Empleado from './containers/Empleado/Empleado';
import NuevoEmpleado from './containers/Empleado/NuevoEmpleado';
import ModificarEmpleado from './containers/Empleado/ModificarEmpleado';
import GestionTitulares from './containers/titulares/GestionTitulares';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';
import LoginPage from './components/Login';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return this.props.user !== null ? <Route path='/' component={Banco} /> : 
    <div><Route path='/login' component={LoginPage} /><Redirect to='/login' /></div>
  }
}

const mapStateToProps = state => {
  return {
    user: state.bancoStore.user
  }
}

export default withRouter(connect(mapStateToProps)(App));
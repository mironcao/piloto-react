import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import TarjetasListPage from './pages/tarjetas-list-page';
import TarjetaFormPage from './pages/tarjeta-form-page';

export default class GestionTarjetas extends Component {
  render() {
    return (
      <Container>
        <div className="ui two item menu">
          <NavLink className="item" activeClassName="active" exact to="/misTarjetas">
            Listado de tarjetas
            </NavLink>
          <NavLink className="item" activeClassName="active" exact to="/misTarjetas/new">
            Añadir tarjeta
            </NavLink>
        </div>
        <Route exact path="/misTarjetas" component={TarjetasListPage} />
        <Route path="/misTarjetas/new" component={TarjetaFormPage} />
      </Container>
    );
  }
}
import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import TarjetasListPage from './tarjetas-list-page';
import TarjetaFormPage from './tarjeta-form-page';

export default class MisTarjetas extends Component {
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
        <Route exact path="/misTarjetas/new" component={TarjetaFormPage} />
        <Route exact path="/misTarjetas" component={TarjetasListPage} />
      </Container>
    );
  }
}
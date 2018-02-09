import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import TitularesListPage from './pages/titulares-list-page';
import TitularFormPage from './pages/titular-form-page';

class GestionTitulares extends Component {
  render() {
    return (
      <Container>
        <div className="ui two item menu">
          <NavLink className="item" activeClassName="active" exact to="/titulares/list">
            Listado de titulares
          </NavLink>
          <NavLink className="item" activeClassName="active" exact to="/titulares/new">
            Añadir titular
          </NavLink>
        </div>
        <Route exact path="/titulares/list" component={TitularesListPage}/>
        <Route path="/titulares/new" component={TitularFormPage}/>
      </Container>
    );
  }
}

export default GestionTitulares;
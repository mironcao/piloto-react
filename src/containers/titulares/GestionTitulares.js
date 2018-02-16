import React, { Component } from 'react';
import { connect } from "react-redux";
import { NavLink, Route } from 'react-router-dom';
import { Container, Message } from 'semantic-ui-react';
import TitularesListPage from './pages/titulares-list-page';
import TitularFormPage from './pages/titular-form-page';

class GestionTitulares extends Component {
  render() {
    
    
    if (!(this.props.numeroCuenta ==='' || this.props.numeroCuenta ==null)) {
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
    else {
      return (
        <Message negative
          icon='bomb'
          header='Acceso denegado'
          content='No ha entrado a través de su cuenta'
        />
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    numeroCuenta: state.bancoStore.numeroCuenta
  }
}


export default connect(mapStateToProps)(GestionTitulares);
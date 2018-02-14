// src/pages/titular-list-page.js

import React, { Component } from 'react';
import { connect } from "react-redux";
import TitularesList from '../components/titulares-list';
import { fetchTitulares as fetchTitularesAction, deleteTitular as deleteTitularAction } from "../actions/titulares-actions";
import { Message } from 'semantic-ui-react';
import axios from "axios";


const URL = 'http://localhost:8080/cliente_cuenta';
const DATA_STATE = {
  LOADDING: 'LOADING',
  OK: 'OK',
  ERROR: 'ERROR'
};

class TitularesListPage extends Component {

  state = {
    dataState: DATA_STATE.LOADDING,
  };

  componentDidMount() {
    console.log(this.props.numeroCuenta)
    axios.get(`${URL}/titulares/${this.props.numeroCuenta}`)
      .then(response => {
        this.props.fetchTitulares(response.data);
        this.setState({
          dataState: DATA_STATE.OK
        });
      })
      .catch(error => {
        this.setState({
          dataState: DATA_STATE.ERROR
        });
      })
  }

  eliminarTitular = (titular) => {
    console.log(this.props.numeroCuenta)
    axios.put(`${URL}/delete/${this.props.numeroCuenta}`, titular)
      .then(response => {
        this.props.deleteTitular(this.props.titulares.filter(item => item.dniTitular !== titular.dniTitular));
      })
      .catch(error => {
        console.log(error);
      })
  }

  


  render() {
    return (
      <div>
        <h1>Listado de Titulares</h1>
        <TitularesList titulares={this.props.titulares}
          deleteTitular={this.eliminarTitular} />
        {this.printError()}
      </div>
    )
  }

  printError() {
    if (this.props.errors === '418') {
      return (
        <Message negative>
          <Message.Header>No se ha eliminado el titular</Message.Header>
          <p>
            El titular que ha intentado elimnar es el unico titular de la cuenta.
            La cuenta debe tenrr siempre un titular como mínimo
          </p>
        </Message>
      );
    }
  }
}


// Make titulares  array available in  props
function mapStateToProps(state) {
  return {
    titulares: state.bancoStore.titulares,
    errors: state.bancoStore.errors,
    numeroCuenta: state.bancoStore.numeroCuenta
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchTitulares: (titulares) => {
      dispatch(fetchTitularesAction(titulares))
    },
    deleteTitular: titular => {
      dispatch(deleteTitularAction(titular))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TitularesListPage);

// src/pages/titular-list-page.js

import React, { Component } from 'react';
import { connect } from "react-redux";
import TarjetasList from '../components/tarjetas-list';
import { fetchTarjetas as fetchTarjetasAction, deleteTarjeta as deleteTarjetaAction } from "../actions/tarjetas-actions";
import { Message } from 'semantic-ui-react';
import axios from "axios";


const URL = 'http://localhost:8080/tarjetas';
const DATA_STATE = {
  LOADDING: 'LOADING',
  OK: 'OK',
  ERROR: 'ERROR'
};

class TarjetasListPage extends Component {

  state = {
    dataState: DATA_STATE.LOADDING,
  };

  componentDidMount() {
    console.log("---------------------------------");
    console.log(`Listado tarjetas ---> DNI:${this.props.dni}`);
    console.log("---------------------------------");
    
    axios.get(`${URL}/${this.props.dni}`)
      .then(response => {
        this.props.fetchTarjetas(response.data);
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

  eliminarTarjeta = (tarjeta) => {
    axios.delete(`${URL}/${tarjeta.numeroTarjeta}`)
      .then(response => {
        this.props.deleteTarjeta(this.props.tarjetas.filter(item => item.numeroTarjeta !== tarjeta.numeroTarjeta));
      })
      .catch(error => {
        console.log(error);
      })
  }

  


  render() {
    return (
      <div>
        <h1>Listado de tarjetas</h1>
        <TarjetasList tarjetas={this.props.tarjetas}
          deleteTarjeta={this.eliminarTarjeta} />
        {this.printError()}
      </div>
    )
  }

  printError() {
    if (this.props.errors === '418') {
      return (
        <Message negative>
          <Message.Header>No se ha eliminado la tarjeta</Message.Header>
        </Message>
      );
    }
  }
}


// Make tarjetas  array available in  props
function mapStateToProps(state) {
  return {
    tarjetas: state.bancoStore.tarjetas,
    errors: state.bancoStore.errors,
    dni: state.bancoStore.user.dni
  }
}


const mapDispatchToProps = dispatch => {
  return {
    fetchTarjetas: (tarjetas) => {
      dispatch(fetchTarjetasAction(tarjetas))
    },
    deleteTarjeta: tarjeta => {
      dispatch(deleteTarjetaAction(tarjeta))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TarjetasListPage);

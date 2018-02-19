
import React, { Component } from 'react';
import { connect } from "react-redux";
import TarjetasListAdmin from '../components/tarjetas-list-admin';
import { fetchTarjetas as fetchTarjetasAction } from "../actions/tarjetas-actions";
import { Message, Header, Container } from 'semantic-ui-react';
import axios from "axios";


const URL = 'http://localhost:8080/tarjetas';
const DATA_STATE = {
  LOADDING: 'LOADING',
  OK: 'OK',
  ERROR: 'ERROR'
};

class TarjetasListAdminPage extends Component {

  state = {
    dataState: DATA_STATE.LOADDING,
  };

  componentDidMount() {
    axios.get(`${URL}`)
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

  render() {
    return (
      <Container style={{marginTop: '3em'}}>
        <Header as='h2' color='teal' textAlign='center'>Listado de tarjetas</Header>
        {this.state.dataState === DATA_STATE.OK && 
          <TarjetasListAdmin tarjetas={this.props.tarjetas}
            createTarjeta={this.crearTarjeta} />
        }
        {this.printError()}
      </Container>
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
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TarjetasListAdminPage);

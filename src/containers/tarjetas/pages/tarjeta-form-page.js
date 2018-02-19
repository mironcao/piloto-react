// src/pages/titular-form-page.js

import React, { Component} from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { addTarjeta as addTarjetaAction } from '../actions/tarjetas-actions';
import TarjetaForm from '../components/tarjeta-form';
import axios from "axios";


const URL = 'http://localhost:8080/tarjetas';

class TitularFormPage extends Component {
  state = {
    redirect: false
  }

  submit = (tarjeta) => {
    const dto = {
      dni: this.props.dni,
      numeroCuenta: tarjeta.numeroCuenta
    };
    axios.post(URL, dto)
      .then(response => {         
        this.setState({ redirect:true });
        this.props.addTarjeta(response.data)
      })
  }

  render() {
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/misTarjetas" /> :
          <TarjetaForm tarjeta={this.props.tarjeta} loading={this.props.loading} onSubmit={this.submit} />
        }
      </div>
    )
  }
}

const mapStateToProps= state => {
  return {
    tarjeta: state.bancoStore.tarjeta,
    errors: state.bancoStore.errors,
    dni: state.bancoStore.user.dni
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTarjeta: (tarjeta) => {
      dispatch(addTarjetaAction(tarjeta))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TitularFormPage);
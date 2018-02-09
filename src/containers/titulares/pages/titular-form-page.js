// src/pages/titular-form-page.js

import React, { Component} from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { addTitular as addTitularAction } from '../actions/titulares-actions';
import TitularForm from '../components/titular-form';
import axios from "axios";


const URL = 'http://localhost:8080/cliente_cuenta';

class TitularFormPage extends Component {
  state = {
    redirect: false
  }

  submit = (titular) => {
    axios.post(`${URL}/new/${this.props.ncuenta}`, titular)
      .then(response => {         
        this.setState({ redirect:true });
        this.addTitular(response.data)
      })
  }

  render() {
    return (
      <div>
        {
          this.state.redirect ?
          <Redirect to="/titulares/list" /> :
          <TitularForm contact={this.props.titular} loading={this.props.loading} onSubmit={this.submit} />
        }
      </div>
    )
  }
}

const mapStateToProps= state => {
  return {
    titular: state.titular,
    errors: state.errors,
    ncuenta: state.numeroCuenta
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addTitular: (titular) => {
      dispatch(addTitularAction(titular))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TitularFormPage);
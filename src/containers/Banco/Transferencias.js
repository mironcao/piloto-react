import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import { Link } from 'react-router-dom'

class Transferencias extends Component {
    generar= ()=>{
        
    }
    render() {
        return (
            <div>
                <h1>Transferencias</h1>
                <p><Link to="/Transferencias/GenerarTransferencia">Generar Transferencias</Link></p>
                <p><Link to="/Transferencias/ListarTransferencias">Listar Transferencia</Link></p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      test: state.bancoStore.test,
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      ejemplo: data => {
        dispatch(actions.ejemploAction)
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Transferencias);
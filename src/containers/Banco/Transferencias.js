import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import {Button} from 'semantic-ui-react';
import Route from 'react-router-dom/Route';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom'

class Transferencias extends Component {
    generar= ()=>{
        
    }
    render() {
        return (
            <div>
                <h1>Transferencias</h1>
                <p><Link to="/GenerarTransferencia">Generar Transferencias</Link></p>
                <p><Link to="/ListarTransferencias">Listar Transferencia</Link></p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      test: state.test,
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
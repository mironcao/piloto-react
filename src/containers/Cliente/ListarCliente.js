import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from 'axios';
import Tabla from "../../components/TablaCliente"

class ListarCliente extends Component {

    componentDidMount() {
        axios.get("http://localhost:8080/clientes/listarClientes")
            .then(response => {
               this.props.listarClientes(response.data);
            }
        )
    }

    render() {
        return (
            <Tabla clientes={this.props.clientes} />
        )


    }
}
const mapStateToProps = state => {
    return {
        clientes: state.clientes
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
        listarClientes: clientes => {
          dispatch(actions.listarClientes(clientes))
        }
      }
    }
  
export default connect(mapStateToProps, mapDispatchToProps) (ListarCliente);
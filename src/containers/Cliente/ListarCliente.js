import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import axios from 'axios';
import Tabla from "../../components/TablaCliente"
import { Header, Container } from 'semantic-ui-react';

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
            <Container  style={{ marginTop: '3em' }}>
                <Header textAlign=" center" as='h1' color='teal'>Clientes</Header>
                <Tabla   clientes={this.props.clientes}/>
            </Container>

        )


    }
}
const mapStateToProps = state => {
    return {
        clientes: state.bancoStore.clientes
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
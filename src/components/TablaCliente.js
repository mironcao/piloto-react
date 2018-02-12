import React, { Component } from 'react';
import { Button, Table, Icon } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import { withRouter } from 'react-router-dom';


class TablaCliente extends Component {

    borrarCliente(dni) {
        axios.delete("http://localhost:8080/clientes/cliente/" + dni);
        this.props.deleteCliente(dni);
    }
    editarCliente(dni) {
        this.props.editarCliente(dni);
        this.props.history.push("/Clientes/EditarCliente");
    }

    render() {
        return (
            <div >
              <center> <Table collapsing align="center">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell> DNI </Table.HeaderCell>
                            <Table.HeaderCell> Nombre </Table.HeaderCell>
                            <Table.HeaderCell> Apellidos </Table.HeaderCell>
                            <Table.HeaderCell> Opciones</Table.HeaderCell>
                            <Table.HeaderCell>  </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        this.props.clientes.map((cliente) =>
                            <Table.Row key ={cliente.dni}>
                                <Table.Cell collapsing>{cliente.dni}</Table.Cell>
                                <Table.Cell collapsing>{cliente.nombre}</Table.Cell>
                                <Table.Cell collapsing>{cliente.apellidos}</Table.Cell>
                                <Table.Cell collapsing>
                                    <Button color="blue" icon='edit' onClick={() => this.editarCliente(cliente.dni)}></Button>
                                    <Button color="red" icon='delete' onClick={() => this.borrarCliente(cliente.dni)}></Button>
                                </Table.Cell>
                            </Table.Row>
                                )
                    }
                    </Table.Body>
                    <Table.Footer fullWidth>
                                    <Table.Row>
                                        <Table.HeaderCell />
                                        <Table.HeaderCell colSpan='4'>
                                            <Button color="teal" onClick={() => this.props.history.push('/Clientes/AñadirClientes')} floated='right' icon labelPosition='left' size='small'>
                                                <Icon name='user' /> Añadir Empleado
                                </Button>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>
                </Table>
                </center>
            </div>
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
                        deleteCliente: dni => {
                        dispatch(actions.deleteCliente(dni))
                    },
                    editarCliente: dni => {
                        dispatch(actions.editarCliente(dni))
                    }
                    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TablaCliente));
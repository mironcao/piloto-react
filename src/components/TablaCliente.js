import React, { Component } from 'react';
import { Button, Table, Icon, Message } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import { withRouter } from 'react-router-dom';


class TablaCliente extends Component {
    state = {
        exported: true
    }

    borrarCliente(dni) {
        axios.delete("http://localhost:8080/clientes/cliente/" + dni);
        this.props.deleteCliente(dni);
    }
    editarCliente(dni) {
        this.props.editarCliente(dni);
        this.props.history.push("/Clientes/EditarCliente");
    }
    exportarClientes = () => {
        this.setState({ exported: false });
        axios.get("http://localhost:8080/clientes/export").then(response => {
            if (response.status === 200)
                this.setState({
                    exported: true
                });
        });
    }

    render() {
        let mensajeExportar = !this.state.exported ? (<Message icon>
            <Icon name='circle notched' loading />
            <Message.Content>
                <Message.Header>Exportando clientes</Message.Header>
            </Message.Content>
        </Message>) : null;
        return (
            <Table celled color='teal' key={'blue'}>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell> DNI </Table.HeaderCell>
                            <Table.HeaderCell> Nombre </Table.HeaderCell>
                            <Table.HeaderCell> Apellidos </Table.HeaderCell>
                            <Table.HeaderCell> Opciones</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {
                        this.props.clientes.map((cliente) =>
                            <Table.Row key ={cliente.dni}>
                                <Table.Cell >{cliente.dni}</Table.Cell>
                                <Table.Cell >{cliente.nombre}</Table.Cell>
                                <Table.Cell >{cliente.apellidos}</Table.Cell>
                                <Table.Cell className="options">
                                    <Button className="option-buttons" color="blue" icon='edit' onClick={() => this.editarCliente(cliente.dni)}></Button>
                                    <Button className="option-buttons" color="red" icon='delete' onClick={() => this.borrarCliente(cliente.dni)}></Button>
                                </Table.Cell>
                            </Table.Row>
                                )
                    }
                    </Table.Body>
                    <Table.Footer fullWidth>
                                    <Table.Row>
                                        <Table.HeaderCell />
                                        <Table.HeaderCell colSpan='4'>
                                            <Button color="teal" onClick={() => this.props.history.push('/Clientes/AñadirCliente')} floated='right' icon labelPosition='left' size='small'>
                                                <Icon name='user' /> Añadir Cliente
                                            </Button>
                                            <Button color="green" onClick={() => this.exportarClientes()} floated='right' icon labelPosition='left' size='small'>
                                            <Icon name='external' /> Exportar clientes
                                            </Button>
                                            {mensajeExportar}
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>
                    </Table>
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
                        deleteCliente: dni => {
                        dispatch(actions.deleteCliente(dni))
                    },
                    editarCliente: dni => {
                        dispatch(actions.editarCliente(dni))
                    }
                    }
  }
  
  export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TablaCliente));
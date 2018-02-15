import React, { Component } from 'react';
import { Button, Table, Icon, Pagination } from 'semantic-ui-react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as actions from '../store/actions';
import { withRouter } from 'react-router-dom';


class TablaCliente extends Component {

    constructor() {
        super();
        this.state = { itemsPerPage: 5, activePage: 1 }
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    calcularPaginas = () => {
        console.log("length", this.props.clientes.length)
        let pages = this.props.clientes.length / this.state.itemsPerPage;
        if (this.props.clientes.length % this.state.itemsPerPage === 0)
            return pages;
        return pages + 1;
    }

    mostrarClientes = () => {
        let rows = [];
        let split = [[]];
        for (let i = 0; i <= this.props.clientes.length; i += this.state.itemsPerPage) {
            if (i + this.state.itemsPerPage <= this.props.clientes.length)
                split.push(this.props.clientes.slice(i, i + this.state.itemsPerPage))
            else
                split.push(this.props.clientes.slice(i, this.props.clientes.length))
        }

        for (let cliente of split[this.state.activePage]) {
            rows.push(<Table.Row key={cliente.dni}>
                <Table.Cell >{cliente.dni}</Table.Cell>
                <Table.Cell >{cliente.nombre}</Table.Cell>
                <Table.Cell >{cliente.apellidos}</Table.Cell>
                <Table.Cell className="options">
                    <Button className="option-buttons" color="blue" icon='edit' onClick={() => this.editarCliente(cliente.dni)}></Button>
                    <Button className="option-buttons" color="red" icon='delete' onClick={() => this.borrarCliente(cliente.dni)}></Button>
                </Table.Cell>
            </Table.Row>)
        }

        return rows;

    }

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
                        this.mostrarClientes()
                    }
                </Table.Body>
                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell />
                        <Table.HeaderCell colSpan='4'>
                            <Button color="teal" onClick={() => this.props.history.push('/Clientes/AñadirCliente')} floated='right' icon labelPosition='left' size='small'>
                                <Icon name='user' /> Añadir Cliente
                                </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                    <Table.Row>
                        <Table.HeaderCell>
                            <Pagination defaultActivePage={1} onPageChange={this.handlePaginationChange} totalPages={parseInt(this.calcularPaginas(), 10)} />
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
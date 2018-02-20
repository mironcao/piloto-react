import React, { Component } from 'react';
import ListItemSucursal from './ListItemSucursal/ListItemSucursal';
import EditItemSucursal from './EdittemSucursal/EdittemSucursal';
import { Table, Pagination, Message, Icon, Button } from 'semantic-ui-react';
import axios from 'axios';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';

class ListSucursales extends Component {

    state = {
        numberOfPages: 0,
        pageSize: 5,
        activePage: 1,
        sucursalesPaginadas: [],
        showEdit: false,
        exported: true
    }

    paginate = (pageNumber) => {
        let numberOfPages = Math.floor(this.props.sucursales.length / this.state.pageSize);
        const initIndex = (pageNumber - 1) * this.state.pageSize;
        if (this.props.sucursales.length % this.state.pageSize !== 0)
            numberOfPages += 1;
        const endIndex = initIndex + this.state.pageSize;
        const sucursalesPaginadas = this.props.sucursales.filter((sucursal, index) => index >= initIndex && index < endIndex);
        this.setState({
            sucursalesPaginadas: sucursalesPaginadas,
            numberOfPages: numberOfPages,
            activePage: pageNumber
        });
    }

    componentDidMount() {
        this.paginate(this.state.activePage);
    }

    borrarSucursalHandler = (id) => {
        axios.delete("http://localhost:8080/sucursal/" + id)
            .then(() => {
                this.props.borrarSucursal(id);
                this.paginate(this.state.activePage);
            })
    }

    exportarSucursales = () => {
        this.setState({ exported: false });
        axios.get("http://localhost:8080/sucursal/export").then(response => {
            if (response.status === 200)
                this.setState({
                    exported: true
                });
        });
    }

    changeShowEditHandler = (open) => {
        this.setState({
            showEdit: open
        });
        this.props.editSucursal({ nombre: '', direccion: '' }, false);
    }

    render() {

        let mensajeExportar = !this.state.exported ? (<Message icon>
            <Icon name='circle notched' loading />
            <Message.Content>
                <Message.Header>Exportando sucursales</Message.Header>
            </Message.Content>
        </Message>) : null;

        return (
            <Table celled color='teal'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>Dirección</Table.HeaderCell>
                        <Table.HeaderCell>Opciones</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.state.sucursalesPaginadas.map(sucursal => (
                        <ListItemSucursal
                            key={sucursal.id}
                            nombre={sucursal.nombre}
                            direccion={sucursal.direccion}
                            clickBorrar={() => this.borrarSucursalHandler(sucursal.id)}
                            clickEdit={() => {
                                this.changeShowEditHandler(true);
                                this.props.clickEdit(sucursal, true);
                            }}
                        />
                    ))}
                    {this.state.showEdit ? <EditItemSucursal 
                        paginate={() => this.paginate(this.state.activePage)} 
                        showEditHandler={this.changeShowEditHandler} /> : null}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <Pagination
                                activePage={this.state.activePage}
                                totalPages={this.state.numberOfPages}
                                onPageChange={(event, data) => this.paginate(data.activePage)} />
                            <Button  onClick={() => this.exportarSucursales()}
                                color='teal' floated='right' icon labelPosition='left' size='small'>
                                <Icon name='external' />Exportar sucursales
                            </Button>
                            <Button onClick={() => this.changeShowEditHandler(true)} 
                                color='teal' floated='right' icon labelPosition='left' size='small'>
                                <Icon name='building' />Añadir sucursal
                            </Button>                            
                            {mensajeExportar}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {
        borrarSucursal: id => dispatch(actions.borrarSucursal(id)),
        editSucursal: (sucursal, edit) => dispatch(actions.editSucursal(sucursal, edit))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSucursales);
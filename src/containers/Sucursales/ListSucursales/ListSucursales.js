import React, { Component } from 'react';
import ListItemSucursal from './ListItemSucursal/ListItemSucursal';
import EditItemSucursal from './EdittemSucursal/EdittemSucursal';
import { Table, Pagination } from 'semantic-ui-react';
import axios from 'axios';
import * as actions from '../../../store/actions';
import { connect } from 'react-redux';

class ListSucursales extends Component {

    state = {
        numberOfPages: 0,
        pageSize: 10,
        activePage: 1,
        sucursalesPaginadas: []
    }

    paginate = (pageNumber) => {
        let numberOfPages = Math.floor(this.props.sucursales.length / 10);
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

    render() {
        return (

            <Table selectable celled color='teal'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>Dirección</Table.HeaderCell>
                        <Table.HeaderCell />
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {this.props.showEdit ? <EditItemSucursal paginate={() => this.paginate(this.state.activePage)} showEditHandler={this.props.showEditHandler} /> : null}
                    {this.state.sucursalesPaginadas.map(sucursal => (
                        <ListItemSucursal
                            key={sucursal.id}
                            nombre={sucursal.nombre}
                            direccion={sucursal.direccion}
                            clickBorrar={() => this.borrarSucursalHandler(sucursal.id)}
                            clickEdit={() => {
                                this.props.showEditHandler(true);
                                this.props.clickEdit(sucursal, true);
                            }}
                        />
                    ))}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan='3'>
                            <Pagination
                                activePage={this.state.activePage}
                                totalPages={this.state.numberOfPages}
                                onPageChange={(event, data) => this.paginate(data.activePage)} />
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
        borrarSucursal: id => dispatch(actions.borrarSucursal(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSucursales);
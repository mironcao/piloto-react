import React, { Component } from 'react';
import ListItemSucursal from './ListItemSucursal/ListItemSucursal';
import EditItemSucursal from './EdittemSucursal/EdittemSucursal';
import { Table, Pagination } from 'semantic-ui-react';

class ListSucursales extends Component {

    state = {
        numberOfPages: 0,
        pageSize: 10,
        activePage: 1,
        sucursalesPaginadas: []
    }

    paginate = (pageNumber) => {
        const numberOfPages = Math.floor(this.props.sucursales.length / 10);
        const initIndex = (pageNumber - 1) * this.state.pageSize;
        const endIndex = initIndex + this.state.pageSize;
        const sucursalesPaginadas = this.props.sucursales.filter((sucursal, index) => index >= initIndex && index < endIndex);
        this.setState({
            sucursalesPaginadas: sucursalesPaginadas,
            numberOfPages: numberOfPages + 1,
            activePage: pageNumber
        });
    }

    componentDidMount() {
        this.paginate(1);
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
                    {this.props.showEdit ? <EditItemSucursal showEditHandler={this.props.showEditHandler} /> : null}
                    {this.state.sucursalesPaginadas.map(sucursal => (
                        <ListItemSucursal
                            key={sucursal.id}
                            nombre={sucursal.nombre}
                            direccion={sucursal.direccion}
                            clickBorrar={() => this.props.clickBorrar(sucursal.id)}
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

export default ListSucursales;
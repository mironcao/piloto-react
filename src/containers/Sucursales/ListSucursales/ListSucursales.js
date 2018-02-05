import React from 'react';
import ListItemSucursal from './ListItemSucursal/ListItemSucursal';
import EditItemSucursal from './EdittemSucursal/EdittemSucursal';
import { Table } from 'semantic-ui-react';

const listSucursales = (props) => {

    return (

        <Table selectable>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Nombre</Table.HeaderCell>
                    <Table.HeaderCell>Dirección</Table.HeaderCell>
                    <Table.HeaderCell />
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {props.edit ? (<EditItemSucursal />) : null}
                {props.sucursales.map(sucursal => (
                    <ListItemSucursal
                        key={sucursal.id}
                        nombre={sucursal.nombre}
                        direccion={sucursal.direccion}
                        clickBorrar={() => props.clickBorrar(sucursal.id)} />
                ))}
            </Table.Body>
        </Table>
    );
};

export default listSucursales;
import React from 'react';
import ListItemSucursal from './ListItemSucursal/ListItemSucursal';
import EditItemSucursal from './EdittemSucursal/EdittemSucursal';
import { Table } from 'semantic-ui-react';

const listSucursales = (props) => {

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
                {props.showEdit ? <EditItemSucursal showEditHandler={props.showEditHandler} /> : null}
                {props.sucursales.map(sucursal => (
                    <ListItemSucursal
                        key={sucursal.id}
                        nombre={sucursal.nombre}
                        direccion={sucursal.direccion}
                        clickBorrar={()=>props.clickBorrar(sucursal.id)}
                        clickEdit={()=>{
                            props.showEditHandler(true);
                            props.clickEdit(sucursal, true);
                        }}
                        />
                ))}
            </Table.Body>
        </Table>
    );
};

export default listSucursales;
import React from 'react';
import { Table } from 'semantic-ui-react';

const listItemSucursal = (props) => {
    return (
        <Table.Row>
            <Table.Cell>{props.nombre}</Table.Cell>
            <Table.Cell>{props.direccion}</Table.Cell>
        </Table.Row>
    );
};

export default listItemSucursal;
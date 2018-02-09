import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';

const listItemSucursal = (props) => {
    return (
        <Table.Row>
            <Table.Cell>{props.nombre}</Table.Cell>
            <Table.Cell>{props.direccion}</Table.Cell>
            <Table.Cell textAlign='right'>
                <Button icon color='blue' onClick={props.clickEdit}>
                    <Icon name='edit' />
                </Button>
                <Button icon color='red' onClick={props.clickBorrar}>
                    <Icon name='remove' />
                </Button>
            </Table.Cell>
        </Table.Row>
    );
};

export default listItemSucursal;
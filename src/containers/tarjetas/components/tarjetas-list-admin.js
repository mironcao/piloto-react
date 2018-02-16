import React from 'react'
import { Button, Checkbox, Icon, Table } from 'semantic-ui-react'

export default function TarjetasListAdmin(props) {
  const tarjetasRows = () => {
    return props.tarjetas.map(tarjeta => {
      return (
        <Table.Row key={tarjeta.numeroTarjeta}>
          <Table.Cell collapsing>
            <Checkbox slider />
          </Table.Cell>
          <Table.Cell>{tarjeta.numeroTarjeta}</Table.Cell>
          <Table.Cell>{tarjeta.numeroCuenta}</Table.Cell>
          <Table.Cell>{tarjeta.dniTitular}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <Table>
      <Table.Header fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell>Nº de tarjeta</Table.HeaderCell>
          <Table.HeaderCell>Nº de cuenta</Table.HeaderCell>
          <Table.HeaderCell>DNI de propietario</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tarjetasRows()}
      </Table.Body>
      <Table.Footer fullWidth>
        <Table.Row>
          <Table.HeaderCell />
          <Table.HeaderCell colSpan='3'>
            <Button floated='right' icon labelPosition='left' primary size='small'>
              <Icon name='credit card' /> Crear tarjeta
            </Button>
            <Button negative size='small'>Eliminar tarjeta(s)</Button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Footer>
    </Table>
  )
}

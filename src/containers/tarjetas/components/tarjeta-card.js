// src/components/titular-card.js

import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';

export default function TarjetaCard({tarjeta, deleteTarjeta}) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name='credit card'/> {tarjeta.numeroTarjeta}
        </Card.Header>
        <Card.Description>
          <p><Icon name='suitcase'/> {tarjeta.numeroCuenta}</p>
          <p><Icon name='money'/> {tarjeta.importe} €</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button negative 
            onClick={() => {
              deleteTarjetaHandle(tarjeta,deleteTarjeta);
              
            }
            }>Eliminar</Button>
        </div>
      </Card.Content>
    </Card>
  )
}

const deleteTarjetaHandle = (tarjeta,deleteTarjeta) => {
  return deleteTarjeta(tarjeta);
}
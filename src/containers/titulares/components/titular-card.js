// src/components/titular-card.js

import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Icon } from 'semantic-ui-react';

export default function TitularCard({titular, deleteTitular}) {
  return (
    <Card>
      <Card.Content>
        <Card.Header>
          <Icon name='user outline'/> {titular.nombre}  {titular.apellidos}
        </Card.Header>
        <Card.Description>
          <p><Icon name='id card outline'/> {titular.dniTitular}</p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="red" 
            onClick={() => {
              deleteTitularHandle(titular,deleteTitular);
              console.log(titular);
            }
            }>Eliminar</Button>
        </div>
      </Card.Content>
    </Card>
  )
}

const deleteTitularHandle = (titular,deleteTitular) => {
  return deleteTitular(titular);
}


TitularCard.propTypes = {
  titular: PropTypes.object.isRequired
}

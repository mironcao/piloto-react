// src/components/titular-list.js

import React from 'react';
import { Card } from "semantic-ui-react";
import TarjetaCard from "./tarjeta-card";

export default function TarjetasList(props){  
  const cards = () => {
    return props.tarjetas.map(tarjeta => {
      return (
        <TarjetaCard 
          key={tarjeta.numeroTarjeta} 
          tarjeta={tarjeta} 
          deleteTarjeta={props.deleteTarjeta}/>
      )
    })
  }

  return (
    <Card.Group>
      { cards() }
    </Card.Group>
  )
}

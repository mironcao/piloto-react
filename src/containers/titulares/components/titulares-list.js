// src/components/titular-list.js

import React from 'react';
import { Card } from "semantic-ui-react";
import TitularCard from "./titular-card";

export default function TitularesList(props){  
  const cards = () => {
    return props.titulares.map(titular => {
      return (
        <TitularCard 
          key={titular.dniTitular} 
          titular={titular} 
          deleteTitular={props.deleteTitular}/>
      )
    })
  }

  return (
    <Card.Group>
      { cards() }
    </Card.Group>
  )
}

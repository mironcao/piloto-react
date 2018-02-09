// src/actions/titulares-actions.js

export const fetchTitulares = (titulares) => {
  return {
    type: 'FETCH_TITULARES',
    payload: titulares
  }
}

export const addTitular = (titular) => {
  return {
    type: 'ADD_TITULAR',
    payload: titular
  }
}


export function deleteTitular(titulares) {
  return {
    type: 'DELETE_TITULAR',
    payload: titulares
  }
}

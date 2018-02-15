export const fetchTarjetas = (tarjetas) => {
  return {
    type: 'FETCH_TARJETAS',
    payload: tarjetas
  }
}

export const addTarjeta = (tarjeta) => {
  return {
    type: 'ADD_TARJETA',
    payload: tarjeta
  }
}


export function deleteTarjeta(tarjetas) {
  return {
    type: 'DELETE_TARJETA',
    payload: tarjetas
  }
}

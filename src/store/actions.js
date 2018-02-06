export const EJEMPLO_ACTION = "EJEMPLO_ACTION";
export const DELETE_CLIENTE = "DELETE_CLIENTE";
export const LISTAR_CLIENTE = "LISTAR_CLIENTE";
export const EDITAR_CLIENTE = "EDITAR_CLIENTE";

export const ejemploAction = (data) => {
    return {
        type: EJEMPLO_ACTION,
        payload: data
    }
}
export const deleteCliente = (dni) => {
    return {
        type: DELETE_CLIENTE,
        dni: dni
    }
}
export const listarClientes = (clientes) => {
    return {
        type: LISTAR_CLIENTE,
        clientes: clientes
    }
}
export const editarCliente = (dni) => {
    return {
        type: EDITAR_CLIENTE,
        dni: dni
    }
}
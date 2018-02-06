export const EJEMPLO_ACTION = "EJEMPLO_ACTION";
export const LISTAR_TRANSFER = "LISTAR_TRANSFER";
export const GENERAR_TRANSFER = "GENERAR_TRANSFER";

export const ejemploAction = (data) => {
    return {
        type: EJEMPLO_ACTION,
        payload: data
    }
}

export const listarTransfersAction = (transferencias) => {
    return {
        type: LISTAR_TRANSFER,
        payload: transferencias
    }
}

export const generarTransfersAction = (transferencias) => {
    return {
        type: GENERAR_TRANSFER,
        payload: transferencias
    }
}
export const EJEMPLO_ACTION = "EJEMPLO_ACTION";
export const MOVIMIENTOS = "MOVIMIENTOS";

export const ejemploAction = (data) => {
    return {
        type: EJEMPLO_ACTION,
        payload: data
    }
}

export const listarMovimientos = (numeroCuenta) => {
    return {
        type: MOVIMIENTOS,
        numeroCuenta: numeroCuenta
    }
}
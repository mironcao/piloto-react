export const EJEMPLO_ACTION = "EJEMPLO_ACTION";
export const MOVIMIENTOS = "MOVIMIENTOS";	
export const CARGAR_MOVIMIENTOS = "CARGAR_MOVIMIENTOS";
export const BORRAR_MOVIMIENTO = "BORRAR_MOVIMIENTO";

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

export const cargarMovimientosAction = (movimientos) => {
    return {
        type: CARGAR_MOVIMIENTOS,
        payload: movimientos
    }
}

export const borrarMovimientosAction = (movimientos) => {
    return {
        type: BORRAR_MOVIMIENTO,
        payload: movimientos
    }
}
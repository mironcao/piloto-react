export const EJEMPLO_ACTION = "EJEMPLO_ACTION";
export const PASAR_CUENTA = "PASAR_CUENTA";
export const CARGAR_MOVIMIENTOS = "CARGAR_MOVIMIENTOS";
export const BORRAR_MOVIMIENTO = "BORRAR_MOVIMIENTO";
export const LISTAR_TRANSFER = "LISTAR_TRANSFER";
export const GENERAR_TRANSFER = "GENERAR_TRANSFER";

export const ejemploAction = (data) => {
    return {
        type: EJEMPLO_ACTION,
        payload: data
    }
}

export const listarMovimientos = (numeroCuenta) => {
    return {
        type: PASAR_CUENTA,
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
        payload: movimientos}
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
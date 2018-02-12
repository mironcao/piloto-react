
export const EJEMPLO_ACTION = "EJEMPLO_ACTION";
export const CARGAR_SUCURSALES = "CARGAR_SUCURSALES";
export const BORRAR_SUCURSAL= "BORRAR_SUCURSAL";
export const ADD_SUCURSAL= "ADD_SUCURSAL";
export const EDIT_SUCURSAL= "EDIT_SUCURSAL";
export const UPDATE_SUCURSAL= "UPDATE_SUCURSAL";
export const PASAR_CUENTA = "PASAR_CUENTA";
export const CARGAR_MOVIMIENTOS = "CARGAR_MOVIMIENTOS";
export const BORRAR_MOVIMIENTO = "BORRAR_MOVIMIENTO";
export const LISTAR_TRANSFER = "LISTAR_TRANSFER";
export const GENERAR_TRANSFER = "GENERAR_TRANSFER";
export const DELETE_CLIENTE = "DELETE_CLIENTE";
export const LISTAR_CLIENTE = "LISTAR_CLIENTE";
export const EDITAR_CLIENTE = "EDITAR_CLIENTE";
export const PASAR_USER = "PASAR_USER";

export const ejemploAction = (data) => {
    return {
        type: EJEMPLO_ACTION,
        payload: data
    }
}
export const cargarSucursales = (sucursalesData) => {
    return {
        type: CARGAR_SUCURSALES,
        payload: sucursalesData
    }
}

export const borrarSucursal = (id) => {
    return {
        type: BORRAR_SUCURSAL,
        payload: id
    }
}

export const addSucursal = (sucursal) => {
    return {
        type: ADD_SUCURSAL,
        payload: sucursal
    }
}

export const editSucursal = (sucursal, edit) => {
    return {
        type: EDIT_SUCURSAL,
        sucursal: sucursal,
        edit: edit
    }
}

export const updateSucursal = (nombre, direccion) => {
    return {
        type: UPDATE_SUCURSAL,
        nombre: nombre,
        direccion: direccion
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
export const deleteCliente = (dni) => {
    return {
        type: DELETE_CLIENTE,
        dni: dni
    }
}
export const pasarUser = (user ) => {
    return {
        type: PASAR_USER,
        user:user
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


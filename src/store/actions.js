
export const EJEMPLO_ACTION = "EJEMPLO_ACTION";
export const CARGAR_SUCURSALES = "CARGAR_SUCURSALES";
export const BORRAR_SUCURSAL= "BORRAR_SUCURSAL";
export const SHOW_ADD_SUCURSAL= "SHOW_ADD_SUCURSAL";
export const ADD_SUCURSAL= "ADD_SUCURSAL";

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

export const toggleAddSucursalHandler = () => {
    return {
        type: SHOW_ADD_SUCURSAL
    }
}

export const addSucursal = (sucursal) => {
    return {
        type: ADD_SUCURSAL,
        payload: sucursal
    }
}
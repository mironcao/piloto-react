
export const EJEMPLO_ACTION = "EJEMPLO_ACTION";
export const CARGAR_SUCURSALES = "CARGAR_SUCURSALES";

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
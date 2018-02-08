export const EJEMPLO_ACTION = "EJEMPLO_ACTION";
export const CARGAR_EMPLEADOS = "CARGAR_EMPLEADOS";
export const DELETE_EMPLEADO = "DELETE_EMPLEADO";
export const CREAR_EMPLEADO = "CREAR_EMPLEADO";
export const MODIFICAR_EMPLEADO = "MODIFICAR_EMPLEADO";
export const ACTUALIZAR_EMPLEADO = "ACTUALIZAR_EMPLEADO";

export const ejemploAction = (data) => {
    return {
        type: EJEMPLO_ACTION,
        payload: data
    }
}

export const cargarEmpleados = (empleadosData) => {
    return {
        type: CARGAR_EMPLEADOS,
        payload: empleadosData
    }
}

export const deleteEmpleado = (dni) => {
    return {
        type: DELETE_EMPLEADO,
        dni: dni
    }
}

export const crearEmpleado = (empleado) => {
    return {
        type: CREAR_EMPLEADO,
        empleado: empleado
    }
}

export const modificarEmpleado = (dni) => {
    return {
        type: MODIFICAR_EMPLEADO,
        dni: dni
    }
}

export const actualizarEmpleado = (empleado) => {
    return {
        type: ACTUALIZAR_EMPLEADO,
        empleado: empleado
    }
}
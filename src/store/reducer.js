import * as actions from './actions'

const initialState = {
    test: true,
    empleados: [],
    dni: ""
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actions.CARGAR_EMPLEADOS: 
            return {
                ...state,
                empleados: action.payload
        }
        case actions.DELETE_EMPLEADO: 
        const nuevosEmpleados = state.empleados.filter((empleado) => empleado.dni !== action.dni);
            return {
                ...state,
                empleados: nuevosEmpleados
        }
        case actions.CREAR_EMPLEADO:
            return {
                ...state,
                empleados: state.empleados
        }
        case actions.MODIFICAR_EMPLEADO:
            return {
                ...state,
                dni: action.dni
        }
        case actions.ACTUALIZAR_EMPLEADO:
        const empleadosActu = state.empleados.map((empleado) => {
            if (empleado.dni === action.empleado.dni) return { ...empleado, ...action.empleado};
            return empleado;
        });
            return {
                ...state,
                empleados: empleadosActu
        }
        default:
            return state;
    }

}

export default reducer;
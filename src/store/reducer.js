import * as actions from './actions';

const initialState = {
    test: true,
    sucursal: {
        sucursales: [],
        editSucursal: false,
        toBeEditted: {
            nombre: '',
            direccion: ''
        }
    },
    transferencias: [],
    movimientos:[] ,
    clientes: [],
    empleados: [],
    dni:""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CARGAR_SUCURSALES:
            return {
                ...state,
                sucursal: {
                    ...state.sucursal,
                    sucursales: action.payload
                }
            }
        case actions.BORRAR_SUCURSAL:
            const sucursalesActu = state.sucursal.sucursales.filter(sucursal => sucursal.id !== action.payload);
            return {
                ...state,
                sucursal: {
                    ...state.sucursal,
                    sucursales: sucursalesActu
                }
            }
        case actions.ADD_SUCURSAL:
            return {
                ...state,
                sucursal: {
                    ...state.sucursal,
                    sucursales: [...state.sucursal.sucursales, action.payload]
                }
            }
        case actions.EDIT_SUCURSAL:
            return {
                ...state,
                sucursal: {
                    ...state.sucursal,
                    editSucursal: action.edit,
                    toBeEditted: action.sucursal
                }
            }
        case actions.UPDATE_SUCURSAL:
            const sucursalesActualizadas = state.sucursal.sucursales.map((sucursal) => {
                if (sucursal.id === state.sucursal.toBeEditted.id) {
                    return {
                        ...sucursal,
                        nombre: action.nombre,
                        direccion: action.direccion
                    }
                }
                else return sucursal;
            });
            return {
                ...state,
                sucursal: {
                    ...state.sucursal,
                    sucursales: sucursalesActualizadas
                }
            }
            case actions.PASAR_CUENTA:
			return {
				...state,
				numeroCuenta:action.numeroCuenta
			}
        case actions.CARGAR_MOVIMIENTOS:
			return {
				...state,
				movimientos: action.payload
			}	
        case actions.BORRAR_MOVIMIENTO:
			return{
				...state,
				movimientos: action.payload
			}
        case actions.DELETE_CLIENTE:
            const nuevosClientes = state.clientes.filter((cliente) => cliente.dni !== action.dni);
            return {
                ...state,
                clientes: nuevosClientes

            }
        case actions.LISTAR_CLIENTE:
            return {
                ...state,
                clientes: action.clientes
            }
        case actions.EDITAR_CLIENTE:
            return{
                ...state,
                dni: action.dni
            }
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
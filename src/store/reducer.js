
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
    dni:"",
    numeroCuenta:""
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
        case actions.GENERAR_TRANSFER:
			return {
				...state,
				transferencias: action.payload
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
        default:
            return state;
    }
}

export default reducer;
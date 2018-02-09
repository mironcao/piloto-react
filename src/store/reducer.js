import * as actions from './actions';

const initialState = {
	test: true,
	numeroCuenta: "",
	movimientos: [],
	titulares: [],
	titular: {},
	loading: false,
	errors: {}
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case action.MOVIMIENTOS:
			return {
				...state,
				numeroCuenta: action.numeroCuenta
			}
		case actions.CARGAR_MOVIMIENTOS:
			return {
				...state,
				movimientos: action.payload
			}
		case actions.BORRAR_MOVIMIENTO:
			return {
				...state,
				movimientos: action.payload
			}

		case 'FETCH_TITULARES': {
			return {
				...state,
				titulares: action.payload,
				errors: {}
			};
		}
		case 'ADD_TITULAR': {
			return {
				...state,
				titulares: [...state.titulares, action.payload.data],
				errors: {},
				loading: false
			};
		}

		case 'DELETE_TITULAR': {
			return {
				...state,
				errors: {},
				titulares: action.payload
			};
		}

		case 'DELETE_TITULAR_REJECTED': {
			return {
				...state,
				errors: action.payload.response.status,
				loading: false
			};
		}
		default:
			return state;
	}
}

export default reducer;
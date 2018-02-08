import* as actions from './actions';

const initialState = {
    test: true,
	numeroCuenta:"",
    movimientos:[]
};

const reducer = (state = initialState, action) => {
    switch(action.type){
		case action.MOVIMIENTOS:
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
        default:
			return state;
    }
}

export default reducer;
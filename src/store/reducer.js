const initialState = {
    test: true,
	numeroCuenta:""
};

const reducer = (state = initialState, action) => {
    switch(action.type){
		case action.MOVIMIENTOS:
			return {
				...state,
				numeroCuenta:action.numeroCuenta
			}
        default:
        return state;
    }

}

export default reducer;
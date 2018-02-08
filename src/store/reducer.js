import * as actions from './actions';

const initialState = {
    test: true,
    transferencias: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.LISTAR_TRANSFER:
            return {
                ...state,
                transferencias: action.payload
            }
        case actions.GENERAR_TRANSFER:
            return {
                ...state,
                transferencias: action.payload
            }
        default:
            return state;
    }
}

export default reducer;
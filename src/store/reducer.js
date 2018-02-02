import * as actions from './actions';

const initialState = {
    test: true,
    sucursales: []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.CARGAR_SUCURSALES:
            return {
                ...state,
                sucursales: action.payload
            }
        default:
            return state;
    }

}

export default reducer;
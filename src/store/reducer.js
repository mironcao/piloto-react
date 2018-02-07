import * as actions from './actions';

const initialState = {
    test: true,
    sucursal: {
        sucursales: [],
        editSucursal: false,
        toBeEditted: null
    }
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
        default:
            return state;
    }

}

export default reducer;
import * as actions from './actions';

const initialState = {
    test: true,
    sucursal: {
        sucursales: [],
        editSucursal: false
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
        case actions.SHOW_ADD_SUCURSAL:
            const editSucursal = state.sucursal.editSucursal;
            return {
                ...state,
                sucursal: {
                    ...state.sucursal,
                    editSucursal: !editSucursal
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
        default:
            return state;
    }

}

export default reducer;
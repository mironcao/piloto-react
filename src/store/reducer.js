import * as actions from "./actions"

const initialState = {
    test: true,
    clientes: [],
    dni:""
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
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
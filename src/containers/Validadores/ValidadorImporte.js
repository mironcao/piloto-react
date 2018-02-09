export const validarImporte = (importe) => {
    var exprImp = /^([0-9]{1,15})(\.[0-9]{1,2})?$/;
    if(importe==null || !exprImp.test(importe)){
        return false;
    }
    return true;
}
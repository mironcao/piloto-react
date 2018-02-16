export const validarDNI = (dni) =>{
    var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
    var str = dni.toString().toUpperCase();

    if (!nifRexp.test(str) && !nieRexp.test(str)) {
        return false;
    }
    var nie = str
        .replace(/^[X]/, '0')
        .replace(/^[Y]/, '1')
        .replace(/^[Z]/, '2');

    var letter = str.substr(-1);
    var charIndex = parseInt(nie.substr(0, 8)) % 23;
    if (validChars.charAt(charIndex) === letter) 
        return true;
    return false;
}

export const validarEmail=(email) => {
    var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!expr.test(email) && email.length!==0) {
        return false;
    }
    return true;
}
export const validateTelefonoMovil=(movil)=> {
    var expr = /^(\\+34|0034|34)?[6|7][0-9]{8}$/;
    if (!expr.test(movil) && movil.length !== 0) {
        return false;
    }
    return true;
}
export const validateTelefonoFijo=(fijo) =>{
    var expr = /^(\\+34|0034|34)?[8|9][0-9]{8}$/;
    if (!expr.test(fijo) && fijo.length !== 0) {
        return false;
    }
    return true;
}

export const validarNombre=(nombre)=>{
    var valido = true;
    if(!validateTextoLongitud(nombre, 15 )) {
        valido= false;
    }
    if(!validateTextoNumero(nombre)) {
        valido= false;
    }
    if(nombre.length===0){
        valido= false;
    }
    return valido;      
}
export const validarApellidos=(apellidos)=>{
    var valido= true;
    if(!validateTextoLongitud(apellidos, 30 )) {
        valido= false;
    }
    if(!validateTextoNumero(apellidos)) {
        valido= false;
    }
    if(apellidos.length===0){
        valido= false;
    }
    return valido;   
}
export const validarDireccion=(direccion)=>{
    var valido = true;
    if(!validateTextoLongitud(direccion, 50 )) {
        valido= false;
    }
    if(direccion.length===0){
        valido= false;
    }
    return valido;   
}

export const validateTextoNumero=(texto) =>{
    var expr = /^[a-zñÑA-Z ]*$/;
    if (!expr.test(texto)) {
        return false;
    }
    return true;
}

export const validateTextoLongitud=(texto, longitud)=> {
    if (texto.length > longitud) {
        return false;
    }
    return true;
}
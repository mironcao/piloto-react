import React, { Component } from 'react';
import axios from 'axios';
import { Button, Input, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import * as validadores from '../Validadores/ValidadorPersona'

class Cliente extends Component {
    constructor() {
        super();
        this.state = {
            clientes: [], sucursalId: "", DNI: { value: "", valid: true }, nombre: { value: "", valid: true },
            apellidos: { value: "", valid: true }, direccion: { value: "", valid: true }, email: { value: "", valid: true },
            fijo: { value: "", valid: true }, movil: { value: "", valid: true }, mensajeError: ""
        }
    }

    crearCliente() {
        if (this.validarCliente()) {
            axios.post("http://localhost:8080/clientes/clientes?sucursalId=" + this.state.sucursalId, {
                dni: this.state.DNI.value,
                nombre: this.state.nombre.value, apellidos: this.state.apellidos.value, direccion: this.state.direccion.value,
                email: this.state.email.value, fijo: this.state.fijo.value, movil: this.state.movil.value
            }).then((response) => this.props.history.push("/ListarClientes"))
        }

    }
    validarCliente() {
        var valido = true;
        if (!this.validarDNI(this.state.DNI.value))
            valido = false;
        if (!this.validarEmail(this.state.email.value))
            valido= false;
        if (this.state.fijo.value.length!==0 && !this.validarFijo(this.state.fijo.value))
            valido= false;
        if (this.state.movil.value.length!==0 && !this.validarMovil(this.state.movil.value))
            valido= false;
        if (!this.validarDireccion(this.state.direccion.value)) 
            valido= false;
        if (!this.validarNombre(this.state.nombre.value))
            valido= false;
        if (!this.validarApellidos(this.state.apellidos.value))
            valido= false;       
        return valido;
    }

   
    validarDNI(dni){
        console.log(dni)
        console.log(validadores.validarDNI(dni))
        if(!validadores.validarDNI(dni)){

            this.setState({DNI:{value: dni, valid:false}})
            return false;
        }return true;
    }

    validarEmail(email){
        if(!validadores.validarEmail(email)){
            this.setState({email:{value: email, valid:false}})
            return false;
        }return true;
    }
    validarFijo(fijo){
        if(!validadores.validateTelefonoFijo(fijo)){
            this.setState({fijo:{value: fijo, valid:false}})
            return false;
        }return true;
    }

    validarMovil(movil){
        if(!validadores.validateTelefonoMovil(movil)){
            this.setState({movil:{value: movil, valid:false}})
            return false;
        }return true;
    }

 
    validarNombre(nombre){
        var valido = true;
        if(!this.validateTextoLongitud(nombre, 15 )) {
            this.setState({nombre:{value:nombre,valid:false}})
            valido= false;
        }
        if(!this.validateTextoNumero(nombre)) {
            this.setState({nombre:{value: nombre,valid:false}})
            valido= false;
        }
        if(nombre.length===0){
            this.setState({nombre:{value: nombre,valid:false}})
            valido= false;
        }
        return valido;      
}
    validarApellidos(apellidos){
        var valido= true;
        if(!this.validateTextoLongitud(apellidos, 30 )) {
            this.setState({apellidos:{value: apellidos,valid:false}})
            valido= false;
        }
        if(!this.validateTextoNumero(apellidos)) {
            this.setState({apellidos:{value: apellidos,valid:false}})
            valido= false;
        }
        if(apellidos.length===0){
            this.setState({apellidos:{value: apellidos,valid:false}})
            valido= false;
        }
        return valido;   
    }
    validarDireccion(direccion){
        var valido = true;
        if(!this.validateTextoLongitud(direccion, 50 )) {
            this.setState({direccion:{value: direccion,valid:false}})
            valido= false;
        }
        if(direccion.length===0){
            this.setState({direccion:{value: direccion,valid:false}})
            valido= false;
        }
        return valido;   
    }

    validateTextoNumero(texto) {
        var expr = /^[a-zA-Z ]*$/;
        if (!expr.test(texto)) {
            return false;
        }
        return true;
}

    validateTextoLongitud(texto, longitud) {
        if (texto.length > longitud) {
            return false;
        }
        return true;
    }
    cambiarSucursal = (event) => {
        this.setState({ sucursalId: event.target.value });
    }

    cambiarDNI = (event) => {
            this.setState({
                DNI:
                    {
                        value: event.target.value,
                        valid: true
                    }
            })
    }

    cambiarNombre = (event) => {
            this.setState({
                nombre:
                    {
                        value: event.target.value,
                        valid: true
                    }
            })
    }

    cambiarApellidos = (event) => {
            this.setState({
                apellidos:
                    {
                        value: event.target.value,
                        valid: true
                    }
            })
    }

    cambiarDireccion = (event) => {
            this.setState({
                direccion:
                    {
                        value: event.target.value,
                        valid: true
                    }
            })
    }
    cambiarEmail = (event) => {
            this.setState({
                email:
                    {
                        value: event.target.value,
                        valid: true
                    }
            })
    }
    cambiarFijo = (event) => {
            this.setState({
                fijo:
                    {
                        value: event.target.value,
                        valid: true
                    }
            })
    }

    cambiarMovil = (event) => {
            this.setState({
                movil:
                    {
                        value: event.target.value,
                        valid: true
                    }
            })
    }
    mostrarError(tipo) {
        return (
            <Message negative>
                <p>El {tipo} es incorrecto</p>
            </Message>
        )
    }

    render() {
        return (
            <div>
                <Input focus placeholder='Sucursal...' onChange={this.cambiarSucursal} />
                <br />
                <Input focus placeholder='DNI...' onChange={this.cambiarDNI} maxLength="9"  />
                {this.state.DNI.valid ? null : this.mostrarError("DNI")}
                <br />
                <Input focus placeholder='Nombre...' onChange={this.cambiarNombre} maxLength="15"/>
                {this.state.nombre.valid ? null : this.mostrarError("nombre")}
                <br />
                <Input focus placeholder='Apellidos...' onChange={this.cambiarApellidos} maxLength="30" />
                {this.state.apellidos.valid ? null : this.mostrarError("apellidos")}
                <br />
                <Input focus placeholder='Direccion...' onChange={this.cambiarDireccion} maxLength="50"/>
                {this.state.direccion.valid ? null : this.mostrarError("direccion")}
                <br />
                <Input focus placeholder='Email...' onChange={this.cambiarEmail} />
                {this.state.email.valid ? null : this.mostrarError("email")}
                <br />
                <Input focus placeholder='Fijo...' onChange={this.cambiarFijo} />
                {this.state.fijo.valid ? null : this.mostrarError("fijo")}
                <br />
                <Input focus placeholder='Movil...' onChange={this.cambiarMovil} />
                {this.state.movil.valid ? null : this.mostrarError("movil")}
                <br />
                <Button.Group>
                    <Button onClick={() => this.props.history.push('/ListarClientes')} >Cancelar</Button>
                    <Button.Or />
                    <Button positive onClick={() => this.crearCliente()}>  Guardar</Button>
                </Button.Group>
            </div>
        )
    }
}

export default withRouter(Cliente);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../store/actions';
import {  Button, Input, Message } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import * as validadores from '../Validadores/ValidadorPersona'

class EditarCliente extends Component {
    constructor() {
        super();
        this.state = {DNI: { value: "", valid: true }, nombre: { value: "", valid: true },
        apellidos: { value: "", valid: true }, direccion: { value: "", valid: true }, email: { value: "", valid: true },
        fijo: { value: "", valid: true }, movil: { value: "", valid: true }}
    }

    componentDidMount() {
        axios.get("http://localhost:8080/clientes/buscarCliente/" + this.props.dni).then(response => {
            this.setState(
                { 
                    DNI: {value: response.data.dni,valid:true},
                    nombre: {value: response.data.nombre,valid:true},
                    apellidos: {value: response.data.apellidos,valid:true},
                    direccion: {value: response.data.direccion,valid:true},
                    email:{value: response.data.email,valid:true},
                    fijo:{value: response.data.fijo,valid:true},
                    movil:{value: response.data.movil,valid:true}
                }
            )
        }
        )

    }

    actualizarCliente() {
        if (this.validarCliente()) {
        axios.put("http://localhost:8080/clientes/cliente/" + this.props.dni, {
            dni: this.state.DNI,
            nombre: this.state.nombre, apellidos: this.state.apellidos, direccion: this.state.direccion, email: this.state.email,
            fijo: this.state.fijo, movil: this.state.movil
        }).then((response)=>this.props.history.push("/ListarClientes"))
    }


    }

    validarCliente() {
        var valido = true;
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
        if(!validadores.validarNombre(nombre)){
            this.setState({nombre:{value: nombre, valid:false}})
            return false;
        }return true;
    }
    validarApellidos(apellidos){
        if(!validadores.validarApellidos(apellidos)){
            this.setState({apellidos:{value: apellidos, valid:false}})
            return false;
        }return true;
    }
    validarDireccion(direccion){
        if(!validadores.validarDireccion(direccion)){
            this.setState({direccion:{value: direccion, valid:false}})
            return false;
        }return true;
    }
    cambiarNombre = (event) => {
        this.setState({nombre:{value: event.target.value,valid: true}})
    }

    cambiarApellidos = (event) => {
            this.setState({apellidos:{value: event.target.value,valid: true}})
    }

    cambiarDireccion = (event) => {
            this.setState({direccion:{value: event.target.value,valid: true}})
    }
    cambiarEmail = (event) => {
            this.setState({email:{value: event.target.value,valid: true}})
    }
    cambiarFijo = (event) => {
            this.setState({fijo:{value: event.target.value,valid: true}})
    }

    cambiarMovil = (event) => {
            this.setState({movil:{value: event.target.value,valid: true}})
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
                <Input focus value={this.state.nombre.value} placeholder='Nombre...' onChange={this.cambiarNombre} ></Input>
                {this.state.nombre.valid ? null : this.mostrarError("nombre")}
                <br />
                <Input focus value ={this.state.apellidos.value} placeholder='Apellidos...' onChange={this.cambiarApellidos} ></Input>
                {this.state.apellidos.valid ? null : this.mostrarError("apellidos")}
                <br />
                <Input focus value = {this.state.direccion.value} placeholder='Direccion...' onChange={this.cambiarDireccion} ></Input>
                {this.state.direccion.valid ? null : this.mostrarError("direccion")}
                <br />
                <Input focus value = {this.state.email.value} placeholder='Email...' onChange={this.cambiarEmail} ></Input>
                {this.state.email.valid ? null : this.mostrarError("email")}
                <br />
                <Input focus value = {this.state.fijo.value} placeholder='Fijo...' onChange={this.cambiarFijo} ></Input>
                {this.state.fijo.valid ? null : this.mostrarError("fijo")}
                <br />
                <Input focus value = {this.state.movil.value} placeholder='Movil...' onChange={this.cambiarMovil} ></Input>
                {this.state.movil.valid ? null : this.mostrarError("movil")}
                <br />
                <Button.Group>
                    <Button onClick={() => this.props.history.push('/ListarClientes')}>Cancelar</Button>
                    <Button.Or />
                    <Button positive onClick={() => this.actualizarCliente()}>  Guardar</Button>
                </Button.Group>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        dni: state.dni
    }
}

const mapDispatchToProps = dispatch => {
    return {
        listarClientes: clientes => {
          dispatch(actions.listarClientes(clientes))
        }
      }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditarCliente));
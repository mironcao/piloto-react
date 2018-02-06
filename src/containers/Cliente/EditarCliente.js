import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../store/actions';
import {  Button, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class EditarCliente extends Component {
    constructor() {
        super();
        this.state = {DNI: "", nombre: "", apellidos: "", direccion: "", email: "", fijo: "", movil: "" }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/clientes/buscarCliente/" + this.props.dni).then(response => {
            this.setState(
                { 
                    DNI: response.data.dni,
                    nombre: response.data.nombre,
                    apellidos: response.data.apellidos,
                    direccion: response.data.direccion,
                    email:response.data.email,
                    fijo:response.data.fijo,
                    movil:response.data.movil,
                }
            )
        }
        )

    }

    actualizarCliente() {
        axios.put("http://localhost:8080/clientes/cliente/" + this.props.dni, {
            dni: this.state.DNI,
            nombre: this.state.nombre, apellidos: this.state.apellidos, direccion: this.state.direccion, email: this.state.email,
            fijo: this.state.fijo, movil: this.state.movil
        }).then((response)=>this.props.history.push("/ListarClientes"))


    }
    cambiarNombre = (event) => {
        this.setState({ nombre: event.target.value });
    }
    cambiarApellidos = (event) => {
        this.setState({ apellidos: event.target.value });
    }
    cambiarDireccion = (event) => {
        this.setState({ direccion: event.target.value });
    }
    cambiarEmail = (event) => {
        this.setState({ email: event.target.value });
    }
    cambiarFijo = (event) => {
        this.setState({ fijo: event.target.value });
    }
    cambiarMovil = (event) => {
        this.setState({ movil: event.target.value });
    }
    render() {
        return (
            <div>
                <Input focus value={this.state.nombre} placeholder='Nombre...' onChange={this.cambiarNombre} ></Input>
                <br />
                <Input focus value ={this.state.apellidos} placeholder='Apellidos...' onChange={this.cambiarApellidos} ></Input>
                <br />
                <Input focus value = {this.state.direccion} placeholder='Direccion...' onChange={this.cambiarDireccion} ></Input>
                <br />
                <Input focus value = {this.state.email} placeholder='Email...' onChange={this.cambiarEmail} ></Input>
                <br />
                <Input focus value = {this.state.fijo} placeholder='Fijo...' onChange={this.cambiarFijo} ></Input>
                <br />
                <Input focus value = {this.state.movil} placeholder='Movil...' onChange={this.cambiarMovil} ></Input>
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
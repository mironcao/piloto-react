import React, { Component } from 'react';
import axios from 'axios';
import { Button, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Cliente extends Component {
    constructor() {
        super();
        this.state = { clientes: [], sucursalId: "", DNI: "", nombre: "", apellidos: "", direccion: "", email: "", fijo: "", movil: "" }
    }

    crearCliente() {
        axios.post("http://localhost:8080/clientes/clientes?sucursalId=" + this.state.sucursalId, {
            dni: this.state.DNI,
            nombre: this.state.nombre, apellidos: this.state.apellidos, direccion: this.state.direccion, email: this.state.email,
            fijo: this.state.fijo, movil: this.state.movil
        }).then((response)=>this.props.history.push("/ListarClientes"))
        
    }

    cambiarSucursal = (event) => {
        this.setState({ sucursalId: event.target.value });
    }

    cambiarDNI = (event) => {
        this.setState({ DNI: event.target.value });
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
                <Input focus placeholder='Sucursal...' onChange={this.cambiarSucursal} />
                <br />
                <Input focus placeholder='DNI...' onChange={this.cambiarDNI} />
                <br />
                <Input focus placeholder='Nombre...' onChange={this.cambiarNombre} />
                <br />
                <Input focus placeholder='Apellidos...' onChange={this.cambiarApellidos} />
                <br />
                <Input focus placeholder='Direccion...' onChange={this.cambiarDireccion} />
                <br />
                <Input focus placeholder='Email...' onChange={this.cambiarEmail} />
                <br />
                <Input focus placeholder='Fijo...' onChange={this.cambiarFijo} />
                <br />
                <Input focus placeholder='Movil...' onChange={this.cambiarMovil} />
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
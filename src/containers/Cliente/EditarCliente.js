import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../store/actions';
import { Button, Input, Message, Grid, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import * as validadores from '../Validadores/ValidadorPersona';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import FormField from 'semantic-ui-react/dist/commonjs/collections/Form/FormField';
import FormDropdown from 'semantic-ui-react/dist/commonjs/collections/Form/FormDropdown';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';


class EditarCliente extends Component {
    constructor() {
        super();
        this.state = {
            nombre: { value: "", valid: true }, apellidos: { value: "", valid: true },
            direccion: { value: "", valid: true }, email: { value: "", valid: true },
            fijo: { value: "", valid: true }, movil: { value: "", valid: true }, cliente: null, password: { value: "", valid: true }, visible: false,
            actualizado: false
        }
    }

    componentDidMount() {
        axios.get("http://localhost:8080/clientes/buscarCliente/" + this.props.dni).then(response => {
            this.setState(
                {

                    cliente: response.data,
                    DNI: { value: response.data.dni, valid: true },
                    nombre: { value: response.data.nombre, valid: true },
                    apellidos: { value: response.data.apellidos, valid: true },
                    direccion: { value: response.data.direccion, valid: true },
                    email: { value: response.data.email, valid: true },
                    fijo: { value: response.data.fijo, valid: true },
                    movil: { value: response.data.movil, valid: true },
                    password: { value: response.data.password, valid: true }
                }

            )
        }
        )

    }

    actualizarCliente() {
        if (this.validarCliente()) {
            axios.put("http://localhost:8080/clientes/cliente/" + this.props.dni, {
                dni: this.state.DNI.value,
                nombre: this.state.nombre.value, apellidos: this.state.apellidos.value, direccion: this.state.direccion.value, email: this.state.email.value,
                fijo: this.state.fijo.value, movil: this.state.movil.value, password: this.state.password.value
            })
        }
        this.setState({ visible: true, actualizado: true },()=>{this.reiniciarFormulario})
        
    }

       
        


    reiniciarFormulario() {
        console.log(this.state.actualizado)
        if (!this.state.actualizado) {
            this.setState(
                {
                    nombre: { value: this.state.cliente.nombre, valid: true },
                    apellidos: { value: this.state.cliente.apellidos, valid: true },
                    direccion: { value: this.state.cliente.direccion, valid: true },
                    email: { value: this.state.cliente.email, valid: true },
                    fijo: { value: this.state.cliente.fijo, valid: true },
                    movil: { value: this.state.cliente.movil, valid: true }
                }
            )
        }else
        
        this.setState(
            {
                nombre: { value: this.state.nombre.value, valid: true },
                apellidos: { value: this.state.apellidos.value, valid: true },
                direccion: { value: this.state.direccion.value, valid: true },
                email: { value: this.state.email.value, valid: true },
                fijo: { value: this.state.fijo.value, valid: true },
                movil: { value: this.state.movil.value, valid: true }
            }
        )
    }

    validarCliente() {
        var valido = true;
        if (!this.validarEmail(this.state.email.value))
            valido = false;
        if (this.state.fijo.value.length !== 0 && !this.validarFijo(this.state.fijo.value))
            valido = false;
        if (this.state.movil.value.length !== 0 && !this.validarMovil(this.state.movil.value))
            valido = false;
        if (!this.validarDireccion(this.state.direccion.value))
            valido = false;
        if (!this.validarNombre(this.state.nombre.value))
            valido = false;
        if (!this.validarApellidos(this.state.apellidos.value))
            valido = false;
        return valido;
    }

    validarEmail(email) {
        if (!validadores.validarEmail(email)) {
            this.setState({ email: { value: email, valid: false } })
            return false;
        } return true;
    }
    validarFijo(fijo) {
        if (!validadores.validateTelefonoFijo(fijo)) {
            this.setState({ fijo: { value: fijo, valid: false } })
            return false;
        } return true;
    }

    validarMovil(movil) {
        if (!validadores.validateTelefonoMovil(movil)) {
            this.setState({ movil: { value: movil, valid: false } })
            return false;
        } return true;
    }
    validarNombre(nombre) {
        if (!validadores.validarNombre(nombre)) {
            this.setState({ nombre: { value: nombre, valid: false } })
            return false;
        } return true;
    }
    validarApellidos(apellidos) {
        if (!validadores.validarApellidos(apellidos)) {
            this.setState({ apellidos: { value: apellidos, valid: false } })
            return false;
        } return true;
    }
    validarDireccion(direccion) {
        if (!validadores.validarDireccion(direccion)) {
            this.setState({ direccion: { value: direccion, valid: false } })
            return false;
        } return true;
    }

    cambiarEstado = (event, { name, value }) => {
        this.setState({ [name]: { value: value, valid: true } , visible:false})
    }

    mostrarError(tipo) {
        return (
            <div>
                <Message negative >
                    <p>El {tipo} es incorrecto</p>
                </Message>
            </div>

        )
    }

    render() {
        return (
            <Grid textAlign="center" style={{ width: "50%", display: "inline-block", height: "100%" }} >
                <Grid.Column textAlign="left">
                    <Form size="large">
                        <Segment stacked>
                            <Form.Field required>
                                <label >Nombre:</label>
                                <Input focus placeholder='Nombre...'
                                    name="nombre" value={this.state.nombre.value} onChange={this.cambiarEstado} maxLength="15" />
                                {this.state.nombre.valid ? null : this.mostrarError("nombre")}
                            </Form.Field>
                            <Form.Field required>
                                <label >Apellidos:</label>
                                <Input focus placeholder='Apellidos...'
                                    name="apellidos" value={this.state.apellidos.value} onChange={this.cambiarEstado} maxLength="30" />
                                {this.state.apellidos.valid ? null : this.mostrarError("apellidos")}
                            </Form.Field>
                            <Form.Field required>
                                <label >Direccion:</label>
                                <Input focus placeholder='Direccion...'
                                    name="direccion" value={this.state.direccion.value} onChange={this.cambiarEstado} maxLength="50" />
                                {this.state.direccion.valid ? null : this.mostrarError("direccion")}
                            </Form.Field>
                            <Form.Field>
                                <label >Email:</label>
                                <Input focus placeholder='Email...'
                                    name="email" value={this.state.email.value} onChange={this.cambiarEstado} />
                                {this.state.email.valid ? null : this.mostrarError("email")}
                            </Form.Field>
                            <Form.Field>
                                <label >Telefono fijo:</label>
                                <Input focus placeholder='Fijo...'
                                    name="fijo" value={this.state.fijo.value} onChange={this.cambiarEstado} />
                                {this.state.fijo.valid ? null : this.mostrarError("fijo")}
                            </Form.Field>
                            <Form.Field>
                                <label >Telefono movil:</label>
                                <Input focus placeholder='Movil...'
                                    name="movil" value={this.state.movil.value} onChange={this.cambiarEstado} />
                                {this.state.movil.valid ? null : this.mostrarError("movil")}
                            </Form.Field>
                            <Form.Field>
                                <Button fluid color="teal" onClick={() => this.actualizarCliente()} >Editar informacion</Button>
                            </Form.Field>
                            <Form.Field>
                                <Button fluid color="teal" onClick={() => this.reiniciarFormulario()}>Reiniciar</Button>
                            </Form.Field>
                            <Message >
                                {this.state.visible ? <p>La informacion se ha actualizado correctamente</p> : null}
                            </Message>
                        </Segment>
                    </Form>
                </Grid.Column>

            </Grid>
        )
    }
}

const mapStateToProps = state => {
    return {
        dni: state.bancoStore.dni
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
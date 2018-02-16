import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../../store/actions';
import { Button, Input, Message, Grid, Form } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';


class ModificarContraseña extends Component {
    constructor() {
        super();
        this.state = {
            nombre: { value: "", valid: true }, apellidos: { value: "", valid: true },
            direccion: { value: "", valid: true }, email: { value: "", valid: true },
            fijo: { value: "", valid: true }, movil: { value: "", valid: true }, cliente: null, passwordAntigua: { value: "", valid: true }
            , password: { value: "", valid: true }, repitPassword: { value: "", valid: true }, message: "", visible:false
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
                }

            )
            console.log(response.data.password)
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
            this.reiniciarFormulario();
            this.mostrarMesajeActualizacion();
        }
    }
    mostrarMesajeActualizacion=()=>{
        this.setState({visible:true})
      
    }
    
    reiniciarFormulario() {
        this.setState(
            {
                passwordAntigua: { value: "", valid: true },
                password: { value: "", valid: true },
                repitPassword: { value: "", valid: true }

            }
        )
    }

    validarCliente() {
        if (!this.validarContraseña(this.state.password.value, this.state.repitPassword.value, this.state.passwordAntigua.value))
            return false;
        return true;
    }

    validarContraseña(contraseña, repetirContraseña, contraseñaAntigua) {
        if (contraseña.length < 8 || contraseñaAntigua.length < 8 || repetirContraseña.length < 8) {
            this.setState({
                password: { value: contraseña, valid: false },
                repitPassword: { value: repetirContraseña, valid: false },
                passwordAntigua:{value: contraseñaAntigua, valid: false},
                message: "No puede haber ningun campo vacio o la contraseña tiene que tener un minimo de 8 caracteres"
            })
            return false;
        }
        else if (contraseñaAntigua !== this.state.passwordAntigua.value) {
            this.setState({
                passwordAntigua:{value: contraseñaAntigua, valid: false},
                message: "La contraseña actual es incorrecta"
            })
            return false;
        }
        else if (contraseña !== repetirContraseña) {
                this.setState({
                    password: { value: contraseña, valid: false },
                    repitPassword: { value: repetirContraseña, valid: false },
                    message: "Las contraseñas no son iguales"
                })
                return false;
            }
        return true;
    }

    cambiarEstado = (event, { name, value }) => {
        this.setState({ [name]: { value: value, valid: true } , visible:false})
    }

    mostrarErrorContraseña() {
        return (
            <Message negative>
                <p>{this.state.message}</p>
            </Message>
        )
    }

    render() {
        return (
            <Grid  textAlign="center" style={{ width: "50%", display:"inline-block",height: "100%" }} >
                <Grid.Column textAlign="left" >
                    <Form size="large">
                        <Segment stacked>
                            <Form.Field required>
                                <label >Contraseña antigua:</label>
                                <Input focus placeholder='Contraseña antigua...'
                                    name="passwordAntigua" value={this.state.passwordAntigua.value} onChange={this.cambiarEstado} maxLength="32" />
                                {this.state.passwordAntigua.valid ? null : this.mostrarErrorContraseña()}
                            </Form.Field>
                            <Form.Field required>
                                <label >Nueva contraseña:</label>
                                <Input focus placeholder='Nueva contraseña...'
                                    name="password" value={this.state.password.value} onChange={this.cambiarEstado} maxLength="32" />
                                {this.state.password.valid ? null : this.mostrarErrorContraseña()}
                            </Form.Field>
                            <Form.Field required>
                                <label >Repetir nueva contraseña:</label>
                                <Input focus placeholder='Repetir nueva contraseña...'
                                    name="repitPassword" value={this.state.repitPassword.value} onChange={this.cambiarEstado} maxLength="32" />
                                {this.state.repitPassword.valid ? null : this.mostrarErrorContraseña()}
                            </Form.Field>
                            <Form.Field>
                                <Button fluid color="teal" onClick={() => this.actualizarCliente()} >Cambiar contraseña</Button>
                            </Form.Field>
                            <Form.Field>
                                <Button fluid color="teal" onClick={() => this.reiniciarFormulario()}>Reiniciar</Button>
                            </Form.Field>
                            <Message >
                                {this.state.visible ? <p>La contraseña se ha actualizado correctamente</p> : null}
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModificarContraseña));
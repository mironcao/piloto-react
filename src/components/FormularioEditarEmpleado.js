import React, { Component } from 'react';
import { Button, Form, Segment, Grid, Message, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import * as actions from "../store/actions";
import { connect } from 'react-redux';
import * as validadores from '../containers/Validadores/ValidadorPersona';

class FormularioEditarEmpleado extends Component {
    state = {empleadoInicial: null, empleado: null, selectedOption: ''}

    componentWillMount () {
        let empleadoSinValidaciones = this.props.empleados.filter((empleado) => empleado.dni === this.props.dni)[0]
        if (empleadoSinValidaciones.fijo === null) empleadoSinValidaciones.fijo = '';
        if (empleadoSinValidaciones.movil === null) empleadoSinValidaciones.movil = '';
        if (empleadoSinValidaciones.email === null) empleadoSinValidaciones.email = '';
        let empleado = {
            dni: empleadoSinValidaciones.dni, 
            nombre: { value: empleadoSinValidaciones.nombre, valid: true }, 
            apellidos: { value: empleadoSinValidaciones.apellidos, valid: true },
            direccion: { value: empleadoSinValidaciones.direccion, valid: true }, 
            fijo: { value: empleadoSinValidaciones.fijo, valid: true }, 
            movil: { value: empleadoSinValidaciones.movil, valid: true },
            email: { value: empleadoSinValidaciones.email, valid: true }, 
            sucursal: empleadoSinValidaciones.sucursal, usuario: empleadoSinValidaciones.usuario
        }
        this.setState({empleadoInicial: {...empleado},
            empleado: empleado, selectedOption: empleado.sucursal.id})
    }

    reiniciarCampos = () => {
        let empleado = this.state.empleadoInicial;
        this.setState({empleado: {...empleado}, selectedOption: empleado.sucursal.id})
    }

    actualizarEmpleado = () => {
        if (this.validarEmpleado()) {
            let empleadoActualizado = {
                dni: this.state.empleado.dni,
                nombre: this.state.empleado.nombre.value,
                apellidos: this.state.empleado.apellidos.value,
                direccion: this.state.empleado.direccion.value,
                fijo: this.state.empleado.fijo.value,
                movil: this.state.empleado.movil.value,
                email: this.state.empleado.email.value,
                sucursal: this.state.empleado.sucursal,
                usuario: this.state.empleado.usuario
            };
            axios.put('http://localhost:8080/empleado/' + empleadoActualizado.dni, empleadoActualizado).then(() => {
                this.props.actualizarEmpleado(empleadoActualizado);
                this.props.history.push("/empleado")
            }); 
        }
    }

    mostrarError(tipo) {
        return (
            <Message negative>
                <p>El {tipo} es incorrecto</p>
            </Message>
        )
    }

    handleChange = (e, { name, value }) => {
        let empleado = this.state.empleado;
        if (name === 'sucursal')
            empleado[name] = value;
        else
            empleado[name].value = value;
        this.setState({ 
           empleado: empleado
        });
    }

    validarEmpleado() {
        const validos = [true, true, true, true, true, true];
        var valido = true;
        if (!validadores.validateTelefonoFijo(this.state.empleado.fijo.value)) {
            validos[3] = false;
            valido = false;
        }
        if (!validadores.validateTelefonoMovil(this.state.empleado.movil.value)) {
            validos[4] = false;
            valido = false;
        }
        if (!validadores.validarEmail(this.state.empleado.email.value)) {
            validos[5] = false;
            valido = false;
        }
        /* if (!this.validarDireccion(this.state.empleado.direccion.value)) 
            valido = false;
        if (!this.validarNombre(this.state.empleado.nombre.value))
            valido = false;
        if (!this.validarApellidos(this.state.empleado.apellidos.value))
            valido = false;        */
            const empleado = {
                dni: this.state.empleado.dni, 
                nombre: { value: this.state.empleado.nombre.value, valid: validos[0] }, 
                apellidos: { value: this.state.empleado.apellidos.value, valid: validos[1] },
                direccion: { value: this.state.empleado.direccion.value, valid: validos[2] }, 
                fijo: { value: this.state.empleado.fijo.value, valid: validos[3] }, 
                movil: { value: this.state.empleado.movil.value, valid: validos[4] },
                email: { value: this.state.empleado.email.value, valid: validos[5] }, 
                sucursal: this.state.empleado.sucursal, usuario: this.state.empleado.usuario
            }
        this.setState( {
            empleado: empleado
        })
        return valido;
    }

    render() {
        return (
            <Grid
                textAlign='center'
                style={{ height: '100%' }}
                verticalAlign='middle'
            >
                <Grid.Column style={{ maxWidth: 500 }}>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Field>
                                <Input
                                    placeholder='Nombre'
                                    label={{ icon: 'asterisk' }}
                                    labelPosition='right corner'
                                    name='nombre'
                                    value={this.state.empleado.nombre.value}
                                    onChange={this.handleChange}
                                />
                                {this.state.empleado.nombre.valid ? null : this.mostrarError('nombre')}
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder='Apellidos'
                                    label={{ icon: 'asterisk' }}
                                    labelPosition='right corner'
                                    name='apellidos'
                                    value={this.state.empleado.apellidos.value}
                                    onChange={this.handleChange}
                                />
                                {this.state.empleado.apellidos.valid ? null : this.mostrarError('apellidos')}
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder='Dirección'
                                    label={{ icon: 'asterisk' }}
                                    labelPosition='right corner'
                                    name='direccion'
                                    value={this.state.empleado.direccion.value}
                                    onChange={this.handleChange}
                                />
                                {this.state.empleado.direccion.valid ? null : this.mostrarError('dirección')}
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder='Teléfono fijo'
                                    name='fijo'
                                    value={this.state.empleado.fijo.value}
                                    onChange={this.handleChange}
                                />
                                {this.state.empleado.fijo.valid ? null : this.mostrarError('fijo')}
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder='Teléfono móvil'
                                    name='movil'
                                    value={this.state.empleado.movil.value}
                                    onChange={this.handleChange}
                                />
                                {this.state.empleado.movil.valid ? null : this.mostrarError('móvil')}
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder='Correo electrónico'
                                    name='email'
                                    value={this.state.empleado.email.value}
                                    onChange={this.handleChange}
                                />
                                {this.state.empleado.email.valid ? null : this.mostrarError('email')}
                            </Form.Field>
                            <Form.Dropdown onChange={(event, data) => {this.setState({selectedOption: data.value})
                                this.handleChange(event, data)}}
                                placeholder='Sucursal' fluid selection options={sucursalOptions} 
                                name='sucursal' value={this.state.selectedOption} />

                            <Button onClick={this.actualizarEmpleado}
                                style={{ marginBottom: '1em' }} color='teal' fluid size='large'>Guardar</Button>
                            <Button onClick={() => this.reiniciarCampos()} 
                                style={{ marginBottom: '1em' }} color='teal' fluid size='large'>Reiniciar</Button>
                            <Button onClick={() => this.props.history.push("/empleado")} 
                                color='teal' fluid size='large'>Cancelar</Button>
                        </Segment>
                    </Form>
                    <Message>
                        (*) Campos obligatorios
                </Message>
                </Grid.Column>
            </Grid>
        );
    }
};

const sucursalOptions = [
    {
        text: 'Sucursal1',
        value: 1
    },
    {
        text: 'Sucursal2',
        value: 2
    },
    {
        text: 'Sucursal3',
        value: 3
    }
]

const mapStateToProps = state => {
    return {
        empleados: state.empleados,
        dni: state.dni
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actualizarEmpleado: empleado => dispatch(actions.actualizarEmpleado(empleado))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormularioEditarEmpleado));
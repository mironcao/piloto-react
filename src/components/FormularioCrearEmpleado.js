import React, { Component } from 'react';
import { Button, Form, Segment, Grid, Message, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import * as actions from "../store/actions";
import { connect } from 'react-redux';
import * as validadores from '../containers/Validadores/ValidadorPersona';

class FormularioCrearEmpleado extends Component {
    constructor () {
        super();
        this.state = {selectedOption: '', empleado: {
        dni: { value: '', valid: true }, nombre: { value: '', valid: true }, apellidos: { value: '', valid: true },
        direccion: { value: '', valid: true }, fijo: { value: '', valid: true }, movil: { value: '', valid: true },
        email: { value: '', valid: true }, sucursal: '', usuario: 'user'
    }}}

    createEmpleado = (empleado) => {
        if (this.validarEmpleado()) {
            axios.post('http://localhost:8080/empleado/', {
                dni: empleado.dni.value,
                nombre: empleado.nombre.value,
                apellidos: empleado.apellidos.value,
                direccion: empleado.direccion.value,
                fijo: empleado.fijo.value,
                movil: empleado.movil.value,
                email: empleado.email.value,
                sucursal: empleado.sucursal,
                usuario: empleado.usuario
            }).then(() => {
                this.props.crearEmpleado(empleado);
                this.props.history.push("/empleado")});
            };
        }
    

    validarEmpleado() {
        const validos = [true, true, true, true, true, true, true];
        var valido = true;
        if (!validadores.validarDNI(this.state.empleado.dni.value)) {
            validos[0] = false;
            valido = false;
        }
        if (!validadores.validateTelefonoFijo(this.state.empleado.fijo.value)) {
            validos[4] = false;
            valido = false;
        }
        if (!validadores.validateTelefonoMovil(this.state.empleado.movil.value)) {
            validos[5] = false;
            valido = false;
        }
        if (!validadores.validarEmail(this.state.empleado.email.value)) {
            validos[6] = false;
            valido = false;
        }
        /* if (!this.validarDireccion(this.state.empleado.direccion.value)) 
            valido = false;
        if (!this.validarNombre(this.state.empleado.nombre.value))
            valido = false;
        if (!this.validarApellidos(this.state.empleado.apellidos.value))
            valido = false;        */
            const empleado = {
                dni: { value: this.state.empleado.dni.value, valid: validos[0] }, 
                nombre: { value: this.state.empleado.nombre.value, valid: validos[1] }, 
                apellidos: { value: this.state.empleado.apellidos.value, valid: validos[2] },
                direccion: { value: this.state.empleado.direccion.value, valid: validos[3] }, 
                fijo: { value: this.state.empleado.fijo.value, valid: validos[4] }, 
                movil: { value: this.state.empleado.movil.value, valid: validos[5] },
                email: { value: this.state.empleado.email.value, valid: validos[6] }, 
                sucursal: this.state.empleado.sucursal, usuario: this.state.empleado.usuario
            }
        this.setState( {
            empleado: empleado
        })
        return valido;
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

    reiniciarCampos = () => {
        this.setState({selectedOption: '', empleado: {
            dni: { value: '', valid: true }, nombre: { value: '', valid: true }, apellidos: { value: '', valid: true },
            direccion: { value: '', valid: true }, fijo: { value: '', valid: true }, movil: { value: '', valid: true },
            email: { value: '', valid: true }, sucursal: '', usuario: 'user'
        }})
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
                                    placeholder='NIF/NIE'
                                    maxLength='9'
                                    label={{ icon: 'asterisk' }}
                                    labelPosition='right corner'
                                    name='dni'
                                    value={this.state.empleado.dni.value}
                                    onChange={this.handleChange}
                                />
                                {this.state.empleado.dni.valid ? null : this.mostrarError('NIF/NIE')}
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder='Nombre'
                                    maxLength='15'
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
                                    maxLength='30'
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
                                    maxLength='50'
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
                                    maxLength='15'
                                    name='fijo'
                                    value={this.state.empleado.fijo.value}
                                    onChange={this.handleChange}
                                />
                                {this.state.empleado.fijo.valid ? null : this.mostrarError('fijo')}
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder='Teléfono móvil'
                                    maxLength='15'
                                    name='movil'
                                    value={this.state.empleado.movil.value}
                                    onChange={this.handleChange}
                                />
                                {this.state.empleado.movil.valid ? null : this.mostrarError('móvil')}
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder='Correo electrónico'
                                    maxLength='30'
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

                            <Button onClick={() => this.createEmpleado(this.state.empleado)}
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        crearEmpleado: empleado => dispatch(actions.crearEmpleado(empleado))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormularioCrearEmpleado));
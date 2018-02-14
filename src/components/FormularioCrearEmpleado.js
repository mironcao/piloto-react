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
        email: { value: '', valid: true }, sucursal: '', usuario: 'user', sucursales: []
    }}}

    componentDidMount() {
        if (this.props.sucursales.length === 0) {
            axios.get("http://localhost:8080/sucursal/")
                .then(response => {
                    let listaSucursales = []
                    response.data.map((sucursal) => {
                        listaSucursales.push({ text: sucursal.nombre, value: sucursal.id })
                    })
                    this.setState({ sucursales: listaSucursales });
                    this.props.cargarSucursales(response.data);
                })
        } else {
            let listaSucursales = []
            this.props.sucursales.map((sucursal) => {
                listaSucursales.push({ text: sucursal.nombre, value: sucursal.id })
            })
            this.setState({ sucursales: listaSucursales })
        }
    }

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
                this.props.history.push("/empleado")}
            );
        };
    }
    

    validarEmpleado() {
        const validos = [true, true, true, true, true, true, true];
        var valido = true;
        if (!validadores.validarDNI(this.state.empleado.dni.value)) {
            validos[0] = false;
            valido = false;
        }
        if (!validadores.validarNombre(this.state.empleado.nombre.value)) {
            validos[1] = false;
            valido = false;
        }
        if (!validadores.validarApellidos(this.state.empleado.apellidos.value)) {
            validos[2] = false;
            valido = false;
        }
        if (!validadores.validarDireccion(this.state.empleado.direccion.value)) {
            validos[3] = false;
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

    mostrarError(mensaje) {
        return (
            <Message negative>
                <p>{mensaje}</p>
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
                <Grid.Column textAlign='left' style={{ maxWidth: 500 }}>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Field required>
                                <label>NIF/NIE:</label>
                                <Input
                                    placeholder='NIF/NIE'
                                    maxLength='9'
                                    name='dni'
                                    value={this.state.empleado.dni.value}
                                    onChange={this.handleChange}
                                />
                                {this.state.empleado.dni.valid ? null : this.mostrarError('El NIF/NIE es incorrecto')}
                            </Form.Field>
                            <Form.Field required>
                                <label>Nombre:</label>
                                <Input
                                    placeholder='Nombre'
                                    maxLength='15'
                                    name='nombre'
                                    value={this.state.empleado.nombre.value}
                                    onChange={this.handleChange}
                                />
                                {this.state.empleado.nombre.valid ? null : this.mostrarError('El nombre es incorrecto')}
                            </Form.Field>
                            <Form.Field required>
                                <label>Apellidos:</label>
                                <Input
                                    placeholder='Apellidos'
                                    maxLength='30'
                                    name='apellidos'
                                    value={this.state.empleado.apellidos.value}
                                    onChange={this.handleChange}
                                />
                                {this.state.empleado.apellidos.valid ? null : this.mostrarError('Los apellidos son incorrectos')}
                            </Form.Field>
                            <Form.Field required>
                            <label>Dirección:</label>
                                <Input
                                    placeholder='Dirección'
                                    maxLength='50'
                                    name='direccion'
                                    value={this.state.empleado.direccion.value}
                                    onChange={this.handleChange}
                                />
                                {this.state.empleado.direccion.valid ? null : this.mostrarError('La dirección es incorrecta')}
                            </Form.Field>
                            <Form.Field>
                                <label>Teléfono fijo:</label>
                                <Input
                                    placeholder='Teléfono fijo'
                                    maxLength='15'
                                    name='fijo'
                                    value={this.state.empleado.fijo.value}
                                    onChange={this.handleChange}
                                />
                                {this.state.empleado.fijo.valid ? null : this.mostrarError('El teléfono fijo es incorrecto')}
                            </Form.Field>
                            <Form.Field>
                                <label>Teléfono móvil:</label>
                                <Input
                                    placeholder='Teléfono móvil'
                                    maxLength='15'
                                    name='movil'
                                    value={this.state.empleado.movil.value}
                                    onChange={this.handleChange}
                                />
                                {this.state.empleado.movil.valid ? null : this.mostrarError('El teléfono móvil es incorrecto')}
                            </Form.Field>
                            <Form.Field>
                                <label>Correo electrónico:</label>
                                <Input
                                    placeholder='Correo electrónico'
                                    maxLength='30'
                                    name='email'
                                    value={this.state.empleado.email.value}
                                    onChange={this.handleChange}
                                />
                                {this.state.empleado.email.valid ? null : this.mostrarError('El correo electrónico es incorrecto')}
                            </Form.Field>
                            <Form.Field>
                                <label>Sucursal:</label>
                                <Form.Dropdown onChange={(event, data) => {this.setState({selectedOption: data.value})
                                    this.handleChange(event, data)}}
                                    placeholder='Sucursal' fluid selection options={this.state.sucursales} 
                                    name='sucursal' value={this.state.selectedOption} />
                            </Form.Field>

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

const mapStateToProps = state => {
    return {
        empleados: state.bancoStore.empleados,
        sucursales: state.bancoStore.sucursal.sucursales
    }
}

const mapDispatchToProps = dispatch => {
    return {
        crearEmpleado: empleado => dispatch(actions.crearEmpleado(empleado)),
        cargarSucursales: sucursales => dispatch(actions.cargarSucursales(sucursales))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormularioCrearEmpleado));
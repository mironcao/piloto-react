import React, { Component } from 'react';
import { Button, Form, Segment, Grid, Message, Input, Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import * as actions from "../../store/actions";
import { connect } from 'react-redux';
import * as validadores from '../Validadores/ValidadorPersona';

class FormularioEditarEmpleado extends Component {
    state = { empleadoInicial: null, empleado: null, selectedOption: '', sucursales: [], 
        oldPassword: { value: '', valid: true }, newPassword: { value: '', valid: true }, 
        repeatPassword: { value: '', valid: true }, ogPassword: '', verContraseñaAntigua: 'password',
        verContraseñaNueva: 'password', verContraseñaRepetida: 'password'
    }

    componentWillMount() {
        let empleadoSinValidaciones = this.props.empleados.filter((empleado) => empleado.dni === this.props.dni)[0]
        if (empleadoSinValidaciones.fijo === null) empleadoSinValidaciones.fijo = '';
        if (empleadoSinValidaciones.movil === null) empleadoSinValidaciones.movil = '';
        if (empleadoSinValidaciones.email === null) empleadoSinValidaciones.email = '';
        let empleado = {
            dni: empleadoSinValidaciones.dni,
            nombre: { value: empleadoSinValidaciones.nombre, valid: true },
            apellidos: { value: empleadoSinValidaciones.apellidos, valid: true },
            direccion: { value: empleadoSinValidaciones.direccion, valid: true },
            password: { value: empleadoSinValidaciones.password, valid: true },
            fijo: { value: empleadoSinValidaciones.fijo, valid: true },
            movil: { value: empleadoSinValidaciones.movil, valid: true },
            email: { value: empleadoSinValidaciones.email, valid: true },
            sucursal: empleadoSinValidaciones.sucursal, usuario: empleadoSinValidaciones.usuario
        }
        this.setState({
            empleadoInicial: { ...empleado },
            empleado: empleado, selectedOption: empleado.sucursal.id, ogPassword: empleado.password.value
        })
    }

    componentDidMount() {
        if (this.props.sucursales.length === 0) {
            axios.get("http://localhost:8080/sucursal/")
                .then(response => {
                    let listaSucursales = []
                    response.data.map((sucursal) => {
                        return listaSucursales.push({ text: sucursal.nombre, value: sucursal.id })
                    })
                    this.setState({ sucursales: listaSucursales });
                    this.props.cargarSucursales(response.data);
                })
        } else {
            let listaSucursales = []
            this.props.sucursales.map((sucursal) => {
                return listaSucursales.push({ text: sucursal.nombre, value: sucursal.id })
            })
            this.setState({ sucursales: listaSucursales })
        }
    }

    reiniciarCampos = () => {
        let empleado = this.state.empleadoInicial;
        this.setState({ empleado: { ...empleado }, selectedOption: empleado.sucursal.id, 
            oldPassword: { value: '', valid: true }, newPassword: { value: '', valid: true }, 
            repeatPassword: { value: '', valid: true }
        })
    }

    actualizarEmpleado = () => {
        if (this.validarEmpleado()) {
            let password = this.state.newPassword.value;
            if (this.state.oldPassword.value === '' &&
                this.state.newPassword.value === '' &&
                this.state.repeatPassword.value === '')
                password = this.state.ogPassword;
            let empleadoActualizado = {
                dni: this.state.empleado.dni,
                nombre: this.state.empleado.nombre.value,
                apellidos: this.state.empleado.apellidos.value,
                direccion: this.state.empleado.direccion.value,
                password: password,
                fijo: this.state.empleado.fijo.value,
                movil: this.state.empleado.movil.value,
                email: this.state.empleado.email.value,
                sucursal: this.state.empleado.sucursal.id,
                usuario: this.state.empleado.usuario
            };
            axios.put('http://localhost:8080/empleado/', empleadoActualizado).then(() => {
                this.props.actualizarEmpleado(empleadoActualizado);
                this.props.history.push("/empleado")
            });
        }
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

    handleChangeContraseña = (e, { name, value }) => {
        let contraseña = this.state[name];
        contraseña.value = value;
        this.setState({
            [name]: contraseña
        });
    }

    validarEmpleado() {
        const validos = [true, true, true, true, true, true, true, true, true];
        var valido = true;
        if (!validadores.validarNombre(this.state.empleado.nombre.value)) {
            validos[0] = false;
            valido = false;
        }
        if (!validadores.validarApellidos(this.state.empleado.apellidos.value)) {
            validos[1] = false;
            valido = false;
        }
        if (!validadores.validarDireccion(this.state.empleado.direccion.value)) {
            validos[2] = false;
            valido = false;
        }
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
        if (!(this.state.oldPassword.value === '' &&
            this.state.newPassword.value === '' &&
            this.state.repeatPassword.value === '')) {
            
            if (this.state.ogPassword !== this.state.oldPassword.value) {            
                validos[6] = false;
                valido = false;
            }
            if (this.state.newPassword.value.length < 8) {
                validos[7] = false;
                valido = false;
            }
            if (this.state.newPassword.value !== this.state.repeatPassword.value) {
                validos[8] = false;
                valido = false;
            }
        }
        const empleado = {
            dni: this.state.empleado.dni,
            nombre: { value: this.state.empleado.nombre.value, valid: validos[0] },
            apellidos: { value: this.state.empleado.apellidos.value, valid: validos[1] },
            direccion: { value: this.state.empleado.direccion.value, valid: validos[2] },
            password: { value: this.state.newPassword, valid: validos[6] && validos[7] && validos[8]},
            fijo: { value: this.state.empleado.fijo.value, valid: validos[3] },
            movil: { value: this.state.empleado.movil.value, valid: validos[4] },
            email: { value: this.state.empleado.email.value, valid: validos[5] },
            sucursal: this.state.empleado.sucursal, usuario: this.state.empleado.usuario
        }
        this.setState({
            empleado: empleado,
            oldPassword: { value: this.state.oldPassword.value, valid: validos[6] },
            newPassword: { value: this.state.newPassword.value, valid: validos[7] },
            repeatPassword: { value: this.state.repeatPassword.value, valid: validos[8] }
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

    mostrarContraseña = (name) => {
        if (this.state[name] === 'text')
            this.setState({
                [name]: 'password'
            })
        else
            this.setState({
                [name]: 'text'
            })
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
                                <label>Nombre:</label>
                                <Input
                                    placeholder='Nombre'
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
                                    name='direccion'
                                    value={this.state.empleado.direccion.value}
                                    onChange={this.handleChange}
                                />
                                {this.state.empleado.direccion.valid ? null : this.mostrarError('La dirección es incorrecta')}
                            </Form.Field>
                            <Form.Field required>
                                <label>Antigua contraseña:</label>
                                <Input
                                    placeholder='Antigua contraseña'
                                    maxLength='32'
                                    type={this.state.verContraseñaAntigua}
                                    name='oldPassword'
                                    value={this.state.oldPassword.value}
                                    onChange={this.handleChangeContraseña}
                                    icon={
                                        <Icon name='eye' size='large'  
                                        onMouseDown={() => {this.mostrarContraseña('verContraseñaAntigua')}}
                                        onMouseUp={() => {this.mostrarContraseña('verContraseñaAntigua')}} link/>}
                                />
                                {this.state.oldPassword.valid ? null : this.mostrarError('La contraseña no es correcta')}
                            </Form.Field>
                            <Form.Field required>
                                <label>Nueva contraseña:</label>
                                <Input
                                    placeholder='Nueva contraseña'
                                    maxLength='32'
                                    type={this.state.verContraseñaNueva} 
                                    name='newPassword'
                                    value={this.state.newPassword.value}
                                    onChange={this.handleChangeContraseña}
                                    icon={
                                        <Icon name='eye' size='large'  
                                        onMouseDown={() => {this.mostrarContraseña('verContraseñaNueva')}}
                                        onMouseUp={() => {this.mostrarContraseña('verContraseñaNueva')}} link/>}
                                />
                                {this.state.newPassword.valid ? null : this.mostrarError('La contraseña debe tener un mínimo de 8 caracteres')}
                            </Form.Field>
                            <Form.Field required>
                                <label>Repetir contraseña:</label>
                                <Input
                                    placeholder='Repetir contraseña'
                                    maxLength='32'
                                    type={this.state.verContraseñaRepetida} 
                                    name='repeatPassword'
                                    value={this.state.repeatPassword.value}
                                    onChange={this.handleChangeContraseña}
                                    icon={
                                        <Icon name='eye' size='large'  
                                        onMouseDown={() => {this.mostrarContraseña('verContraseñaRepetida')}}
                                        onMouseUp={() => {this.mostrarContraseña('verContraseñaRepetida')}} link/>}
                                />
                                {this.state.repeatPassword.valid ? null : this.mostrarError('Las contraseñas no son iguales')}
                            </Form.Field>
                            <Form.Field>
                                <label>Teléfono fijo:</label>
                                <Input
                                    placeholder='Teléfono fijo'
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
                                    name='email'
                                    value={this.state.empleado.email.value}
                                    onChange={this.handleChange}
                                />
                                {this.state.empleado.email.valid ? null : this.mostrarError('El correo electrónico es incorrecto')}
                            </Form.Field>
                            <Form.Field>
                                <label>Sucursal:</label>
                                <Form.Dropdown onChange={(event, data) => {
                                    this.setState({ selectedOption: data.value })
                                    this.handleChange(event, data)
                                }}
                                    placeholder='Sucursal' fluid selection options={this.state.sucursales}
                                    name='sucursal' value={this.state.selectedOption} />
                            </Form.Field>

                            <Button onClick={this.actualizarEmpleado}
                                style={{ marginBottom: '1em' }} color='teal' fluid size='large'>Guardar</Button>
                            <Button onClick={() => this.reiniciarCampos()}
                                style={{ marginBottom: '1em' }} color='teal' fluid size='large'>Reiniciar</Button>
                            <Button onClick={() => this.props.history.push("/empleado")}
                                color='teal' fluid size='large'>Cancelar</Button>
                        </Segment>
                    </Form>
                    <Message className='mensajeObligatorio'>
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
        dni: state.bancoStore.dni,
        sucursales: state.bancoStore.sucursal.sucursales
    }
}

const mapDispatchToProps = dispatch => {
    return {
        actualizarEmpleado: empleado => dispatch(actions.actualizarEmpleado(empleado)),
        cargarSucursales: sucursales => dispatch(actions.cargarSucursales(sucursales))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FormularioEditarEmpleado));
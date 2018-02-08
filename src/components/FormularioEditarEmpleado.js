import React, { Component } from 'react';
import { Button, Form, Segment, Grid, Message, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import * as actions from "../store/actions";
import { connect } from 'react-redux';

class FormularioEditarEmpleado extends Component {
    state = {empleadoInicial: null, empleado: null, selectedOption: ''}

    componentWillMount () {
        let empleado = this.props.empleados.filter((empleado) => empleado.dni === this.props.dni)[0]
        if (empleado.fijo === null) empleado.fijo = '';
        if (empleado.movil === null) empleado.movil = '';
        if (empleado.email === null) empleado.email = '';
        this.setState({empleadoInicial: {...empleado},
            empleado: empleado, selectedOption: empleado.sucursal.id})
    }

    reiniciarCampos = () => {
        let empleado = this.state.empleadoInicial;
        this.setState({empleado: {...empleado}, selectedOption: empleado.sucursal.id})
    }

    actualizarEmpleado = (empleado) => {
        console.log(empleado)
        axios.put('http://localhost:8080/empleado/' + empleado.dni, {
            dni: empleado.dni,
            nombre: empleado.nombre,
            apellidos: empleado.apellidos,
            direccion: empleado.direccion,
            fijo: empleado.fijo,
            movil: empleado.movil,
            email: empleado.email,
            sucursal: empleado.sucursal.id,
            usuario: empleado.usuario
        }).then(() => {
            this.props.actualizarEmpleado(empleado);
            this.props.history.push("/empleado")
        });
    }

    handleChange = (e, { name, value }) => {
        let empleado = this.state.empleado;
        empleado[name] = value;
        this.setState({ 
           empleado: empleado
        });
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
                                    value={this.state.empleado.nombre}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder='Apellidos'
                                    label={{ icon: 'asterisk' }}
                                    labelPosition='right corner'
                                    name='apellidos'
                                    value={this.state.empleado.apellidos}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder='Dirección'
                                    label={{ icon: 'asterisk' }}
                                    labelPosition='right corner'
                                    name='direccion'
                                    value={this.state.empleado.direccion}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder='Teléfono fijo'
                                    name='fijo'
                                    value={this.state.empleado.fijo}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder='Teléfono móvil'
                                    name='movil'
                                    value={this.state.empleado.movil}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder='Correo electrónico'
                                    name='email'
                                    value={this.state.empleado.email}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Dropdown onChange={(event, data) => {this.setState({selectedOption: data.value})
                                this.handleChange(event, data)}}
                                placeholder='Sucursal' fluid selection options={sucursalOptions} 
                                name='sucursal' value={this.state.selectedOption} />

                            <Button onClick={() => this.actualizarEmpleado(this.state.empleado)}
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
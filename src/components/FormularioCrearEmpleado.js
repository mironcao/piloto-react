import React, { Component } from 'react';
import { Button, Form, Segment, Grid, Message, Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import * as actions from "../store/actions";
import { connect } from 'react-redux';

class FormularioCrearEmpleado extends Component {
    constructor () {
        super();
        this.state = {selectedOption: '', empleado: {
        dni: '', nombre: '', apellidos: '',
        direccion: '', fijo: '', movil: '',
        email: '', sucursal: '', usuario: 'user'
    }}}

    createEmpleado = (empleado) => {
        axios.post('http://localhost:8080/empleado/', {
            dni: empleado.dni,
            nombre: empleado.nombre,
            apellidos: empleado.apellidos,
            direccion: empleado.direccion,
            fijo: empleado.fijo,
            movil: empleado.movil,
            email: empleado.email,
            sucursal: empleado.sucursal,
            usuario: empleado.usuario
        }).then(this.props.crearEmpleado(empleado), this.props.history.push("/empleado"));
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
                                    placeholder='NIF/NIE'
                                    label={{ icon: 'asterisk' }}
                                    labelPosition='right corner'
                                    name='dni'
                                    value={this.state.empleado.dni}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
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

                            <Button onClick={() => this.createEmpleado(this.state.empleado)}
                                style={{ marginBottom: '1em' }} color='teal' fluid size='large'>Guardar</Button>
                            <Button onClick={() => this.setState({selectedOption: ''})} 
                                style={{ marginBottom: '1em' }} type='reset' color='teal' fluid size='large'>Reiniciar</Button>
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
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
        dni: { value: '', valid: true }, nombre: { value: '', valid: true }, apellidos: { value: '', valid: true },
        direccion: { value: '', valid: true }, fijo: { value: '', valid: true }, movil: { value: '', valid: true },
        email: { value: '', valid: true }, sucursal: '', usuario: 'user'
    }}}

    createEmpleado = (empleado) => {
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
        }).then(this.props.crearEmpleado(empleado), this.props.history.push("/empleado"));
    }

    validarDni = (dni) => {
        var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
        var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
        var nieRexp = /^[XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
        var str = dni.toString().toUpperCase();

        if (!nifRexp.test(str) && !nieRexp.test(str)) return false;

        var nie = str
            .replace(/^[X]/, '0')
            .replace(/^[Y]/, '1')
            .replace(/^[Z]/, '2');

        var letter = str.substr(-1);
        var charIndex = parseInt(nie.substr(0, 8)) % 23;

        if (validChars.charAt(charIndex) === letter) return true;

        return false;
    }

    handleChange = (e, { name, value }) => {
        let empleado = this.state.empleado;
        empleado[name].value = value;
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
                                    value={this.state.empleado.dni.value}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder='Nombre'
                                    label={{ icon: 'asterisk' }}
                                    labelPosition='right corner'
                                    name='nombre'
                                    value={this.state.empleado.nombre.value}
                                    onChange={this.handleChange}
                                />
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
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder='Teléfono fijo'
                                    name='fijo'
                                    value={this.state.empleado.fijo.value}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder='Teléfono móvil'
                                    name='movil'
                                    value={this.state.empleado.movil.value}
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    placeholder='Correo electrónico'
                                    name='email'
                                    value={this.state.empleado.email.value}
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
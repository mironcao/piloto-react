import React, { Component } from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import axios from 'axios';
import * as actions from "../store/actions";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TablaEmpleado extends Component {
    deleteEmpleado = (dni) => {
        axios.delete('http://localhost:8080/empleado/' + dni);
        this.props.deleteEmpleado(dni);
    }

    modificarEmpleado = (dni) => {
        this.props.modificarEmpleado(dni);
        this.props.history.push('/modificarEmpleado');
    }

    render() {
        return (
            <Table celled color='teal' key={'blue'}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Dni</Table.HeaderCell>
                        <Table.HeaderCell>Nombre</Table.HeaderCell>
                        <Table.HeaderCell>Apellidos</Table.HeaderCell>
                        <Table.HeaderCell>Opciones</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.props.empleados.map((empleado) =>
                        <Table.Row key={empleado.dni}>
                            <Table.Cell>{empleado.dni}</Table.Cell>
                            <Table.Cell>{empleado.nombre}</Table.Cell>
                            <Table.Cell>{empleado.apellidos}</Table.Cell>
                            <Table.Cell className="options">
                                <Button className="option-buttons" icon='edit' color='blue'
                                    onClick={() => this.modificarEmpleado(empleado.dni)} />
                                <Button className="option-buttons" icon='delete' color='red' 
                                    onClick={() => this.deleteEmpleado(empleado.dni)} />
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>

                <Table.Footer fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan='4'>
                            <Button onClick={() => this.props.history.push("/nuevoEmpleado")}
                                color='teal' floated='right'  icon labelPosition='left' size='small'>
                                <Icon name='user' />Añadir empleado
                            </Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}

const mapStateToProps = state => {
    return {
        empleados: state.empleados
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteEmpleado: dni => dispatch(actions.deleteEmpleado(dni)),
        modificarEmpleado: dni => dispatch(actions.modificarEmpleado(dni))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TablaEmpleado))
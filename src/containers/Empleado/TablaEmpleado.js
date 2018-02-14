import React, { Component } from 'react';
import { Table, Button, Icon, Message } from 'semantic-ui-react';
import axios from 'axios';
import * as actions from "../../store/actions";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class TablaEmpleado extends Component {
    state = {
        exported: true
    }
    deleteEmpleado = (dni) => {
        axios.delete('http://localhost:8080/empleado/' + dni);
        this.props.deleteEmpleado(dni);
    }

    modificarEmpleado = (dni) => {
        this.props.modificarEmpleado(dni);
        this.props.history.push('/modificarEmpleado');
    }

    exportarEmpleados = () => {
        this.setState({ exported: false });
        axios.get("http://localhost:8080/sucursal/export").then(response => {
            if (response.status === 200)
                this.setState({
                    exported: true
                });
        });
    }

    render() {
        let mensajeExportar = !this.state.exported ? (<Message icon>
            <Icon name='circle notched' loading />
            <Message.Content>
                <Message.Header>Exportando empleados</Message.Header>
            </Message.Content>
        </Message>) : null;

        return (
            <Table celled color='teal' key={'blue'}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>NIF/NIE</Table.HeaderCell>
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
                                color='teal' floated='right' icon labelPosition='left' size='small'>
                                <Icon name='user' />Añadir empleado
                            </Button>
                            <Button onClick={() => this.exportarEmpleados()}
                                color='teal' floated='right' icon labelPosition='left' size='small'>
                                <Icon name='external' />Exportar empleados
                            </Button>
                            {mensajeExportar}
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        )
    }
}

const mapStateToProps = state => {
    return {
        empleados: state.bancoStore.empleados
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteEmpleado: dni => dispatch(actions.deleteEmpleado(dni)),
        modificarEmpleado: dni => dispatch(actions.modificarEmpleado(dni))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TablaEmpleado))
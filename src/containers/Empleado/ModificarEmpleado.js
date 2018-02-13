import React, { Component } from 'react';
import Form from '../../components/FormularioEditarEmpleado';
import { Header, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';

class ModificarEmpleado extends Component {
    render() {
        return (
            <Container style={{ marginTop: '3em' }}>
                <Header as='h1' textAlign='center' color='teal' >Modificar empleado {this.props.dni}</Header>
                <Form dni={this.props.dni}/>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        empleados: state.empleados,
        dni: state.dni
    }
}

export default connect(mapStateToProps)(ModificarEmpleado);
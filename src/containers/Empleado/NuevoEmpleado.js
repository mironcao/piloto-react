import React, { Component } from 'react';
import Form from './FormularioCrearEmpleado';
import { Header, Container } from 'semantic-ui-react';

class NuevoEmpleado extends Component {
    render() {
        return (
            <Container style={{ marginTop: '3em', marginBottom: '3em'  }}>
                <Header as='h1' textAlign='center' color='teal' >Añadir empleado</Header>
                <Form/>
            </Container>
        );
    }
}

export default NuevoEmpleado;
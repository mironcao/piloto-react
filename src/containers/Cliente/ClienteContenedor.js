import React, { Component } from 'react';
import Form from '../../components/FormularioCrearEmpleado';
import { Header, Container } from 'semantic-ui-react';

class ClienteContenedor extends Component {
    render() {
        return (
            <Container style={{ marginTop: '3em' }}>
                <Header as='h1' color='teal' >Añadir cliente</Header>
                <Form/>
            </Container>
        );
    }
}

export default ClienteContenedor;
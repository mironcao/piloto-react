import React, { Component } from 'react';
import Form from './AñadirCliente';
import { Header, Container } from 'semantic-ui-react';

class ClienteContenedorAñadir extends Component {
    render() {
        return (
            <Container style={{ marginTop: '3em' }}>
                <Header textAlign="center" as='h1' color='teal' >Añadir cliente</Header>
                <Form/>
            </Container>
        );
    }
}

export default ClienteContenedorAñadir;
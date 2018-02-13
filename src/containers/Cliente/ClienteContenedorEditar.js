import React, { Component } from 'react';
import Form from './EditarCliente';
import { Header, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';

class ClienteContenedorEditar extends Component {
    render() {
        return (
            <Container style={{ marginTop: '3em' }}>
                <Header  textAlign= "center" as='h1' color='teal' >Modificar cliente</Header>
                <Form dni={this.props.dni}/>
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        dni: state.dni
    }
}

export default connect(mapStateToProps)(ClienteContenedorEditar);
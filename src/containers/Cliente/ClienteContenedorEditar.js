import React, { Component } from 'react';
import Informacion from './EditarCliente';
import Contrasena from './ModificarContraseña';
import { Header, Container , Button} from 'semantic-ui-react';
import { connect } from 'react-redux';

class ClienteContenedorEditar extends Component {
    render() {
        return (
            <Container  style={{marginTop: '3em' }} >
                <Header  textAlign= "center" as='h1' color='teal' >Modificar cliente</Header>
                <div>
                <Informacion dni={this.props.dni}/>
                <Contrasena dni={this.props.dni}/>
                </div>
                <Button fluid color="teal" onClick={() => this.props.history.push("/ListarClientes")}>  Finalizar edicion</Button>                                
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        dni: state.bancoStore.dni
    }
}

export default connect(mapStateToProps)(ClienteContenedorEditar);
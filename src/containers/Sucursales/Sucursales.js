import React, { Component } from 'react';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { Container, Header, Message, Icon } from 'semantic-ui-react';
import ListSucursales from './ListSucursales/ListSucursales';

const DATA_STATE = {
    LOADING: 'LOADING',
    OK: 'OK',
    ERROR: 'ERROR'
};
class Sucursales extends Component {

    state = {
        dataState: DATA_STATE.LOADING
    }

    componentDidMount() {
        axios.get("http://localhost:8080/sucursal/")
            .then(response => {
                this.props.cargarSucursales(response.data);
                this.setState({
                    dataState: DATA_STATE.OK
                });
            }).catch(error => {
                this.setState({
                    dataState: DATA_STATE.ERROR
                });
            })
    }

    renderData = () => {
        switch (this.state.dataState) {
            case DATA_STATE.LOADING:
                return (
                    <Message icon>
                        <Icon name='circle notched' loading />
                        <Message.Content>
                            <Message.Header>Cargando sucursales</Message.Header>
                        </Message.Content>
                    </Message>
                );
            case DATA_STATE.ERROR:
                return (
                    <Message
                        error
                        header='Se ha producido un error al cargar los datos'
                    />
                );
            case DATA_STATE.OK:
                return (<ListSucursales
                    sucursales={this.props.sucursales}
                    clickEdit={this.props.editSucursal}/>
                );
            default:
                return;
        }
    }

    render() {
        let sucursales = this.renderData();

        return (
                <Container style={{ marginTop: '3em' }}>
                    <Header as='h1' textAlign='center' color='teal'>Sucursales</Header>
                    {sucursales}
                </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        sucursal: state.bancoStore.sucursal,
        sucursales: state.bancoStore.sucursal.sucursales
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cargarSucursales: sucursales => dispatch(actions.cargarSucursales(sucursales)),
        borrarSucursal: id => dispatch(actions.borrarSucursal(id)),
        editSucursal: (sucursal, edit) => dispatch(actions.editSucursal(sucursal, edit))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sucursales);
import React, { Component } from 'react';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { Grid, Container, Header, Message, Icon, Button } from 'semantic-ui-react';
import ListSucursales from './ListSucursales/ListSucursales';

const DATA_STATE = {
    LOADING: 'LOADING',
    OK: 'OK',
    ERROR: 'ERROR'
};
class Sucursales extends Component {

    state = {
        dataSate: DATA_STATE.LOADING
    }

    componentDidMount() {
        axios.get("http://localhost:8080/sucursal/")
            .then(response => {
                this.props.cargarSucursales(response.data);
                this.setState({
                    dataSate: DATA_STATE.OK
                });
            }).catch(error => {
                this.setState({
                    dataSate: DATA_STATE.ERROR
                });
            })
    }

    renderData = () => {
        switch (this.state.dataSate) {
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
                    sucursales={this.props.sucursal.sucursales}
                    clickBorrar={this.borrarSucursalHandler}
                    edit={this.props.sucursal.editSucursal} />);
        }
    }

    borrarSucursalHandler = (id) => {
        axios.delete("http://localhost:8080/sucursal/" + id);
        this.props.borrarSucursal(id);
    }

    toggleAddSucursalHandler = () => {
        this.props.toggleAddSucursalHandler();
    }

    render() {

        let sucursales = this.renderData();

        return (
            <React.Fragment>
                <Header as="h2">Sucursales</Header>
                <Container>
                    <Container textAlign='right'>
                        <Button color='blue' onClick={this.toggleAddSucursalHandler}>Añadir sucursal</Button>
                    </Container>
                    {sucursales}
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        sucursal: state.sucursal,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cargarSucursales: sucursales => dispatch(actions.cargarSucursales(sucursales)),
        borrarSucursal: id => dispatch(actions.borrarSucursal(id)),
        toggleAddSucursalHandler: () => dispatch(actions.toggleAddSucursalHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sucursales);
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
        dataState: DATA_STATE.LOADING,
        showEdit: false,
        exported: true
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
                    sucursales={this.props.sucursal.sucursales}
                    clickBorrar={this.borrarSucursalHandler}
                    showEditHandler={this.changeShowEditHandler}
                    showEdit={this.state.showEdit}
                    clickEdit={this.props.editSucursal} />
                );
            default:
                return;
        }
    }

    borrarSucursalHandler = (id) => {
        axios.delete("http://localhost:8080/sucursal/" + id);
        this.props.borrarSucursal(id);
    }

    changeShowEditHandler = (open) => {
        this.setState({
            showEdit: open
        });
        this.props.editSucursal({ nombre: '', direccion: '' }, false);
    }

    exportarSucursales = () => {
        this.setState({ exported: false });
        axios.get("http://localhost:8080/sucursal/export").then(response => {
            if (response.status === 200)
                this.setState({
                    exported: true
                });
        });
    }

    render() {

        let sucursales = this.renderData();
        let mensajeExportar = !this.state.exported ? (<Message icon>
            <Icon name='circle notched' loading />
            <Message.Content>
                <Message.Header>Exportando sucursales</Message.Header>
            </Message.Content>
        </Message>) : null;

        return (
            <React.Fragment>
                <Container style={{ marginTop: '3em' }}>
                    <Header as='h1' textAlign='center' color='teal'>Sucursales</Header>
                    <Container textAlign='right'>
                        <Button className="option-buttons" color='blue' onClick={() => this.changeShowEditHandler(true)}>Añadir sucursal</Button>
                        <Button className="option-buttons" color='blue' onClick={() => this.exportarSucursales()}>Exportar Sucursales</Button>
                        {mensajeExportar}
                    </Container>
                    {sucursales}
                </Container>
                <Container>
                    
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
        editSucursal: (sucuresal, edit) => dispatch(actions.editSucursal(sucuresal, edit))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sucursales);
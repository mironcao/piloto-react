import React, { Component } from 'react';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { Grid, Container, Header } from 'semantic-ui-react';
import ListSucursales from './ListSucursales/ListSucursales';
class Sucursales extends Component {

    componentDidMount() {
        axios.get("http://localhost:8080/sucursal/")
            .then(response => {
                console.log(response.data);
                this.props.cargarSucursales(response.data);
            })
    }

    render() {


        return (
            <React.Fragment>
                <Header as="h2">Sucursales</Header>
                <Container>
                    <ListSucursales sucursales={this.props.sucursales} />
                </Container>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        sucursales: state.sucursales,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        cargarSucursales: sucursales => dispatch(actions.cargarSucursales(sucursales))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sucursales);
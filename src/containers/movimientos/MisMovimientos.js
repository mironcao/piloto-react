import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import { Table, Button, Icon } from 'semantic-ui-react'
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import axios from 'axios';
import Link from 'react-router-dom/Link';
import * as estilo from '../css/Movimiento';

/* Constantes */
const URL = 'http://localhost:8080/movimiento/mismovimientos/';

class MisMovimientos extends Component {

    componentDidMount() {
        axios.get(URL + this.props.numeroCuenta)
            .then(response => {
                this.props.cargarMovimientosAction(response.data);
                console.log(response.data);
            })
            .catch(function (error){
                console.log(error);
            })
    }

    render() {
        return (
            <div style={estilo.align}>
                <br/>
                <Header as='h2' color="teal">Mis Movimientos</Header>
                <Header.Subheader>
                    Movimientos asociados a la cuenta: {this.props.numeroCuenta}
                </Header.Subheader>
                <br/>
                <div>
                    <Table celled selectable color="teal">
                        <Table.Header style={estilo.align}>
                        <Table.Row>
                            <Table.HeaderCell>Fecha</Table.HeaderCell>
                            <Table.HeaderCell>Tipo</Table.HeaderCell>
                            <Table.HeaderCell>Importe</Table.HeaderCell>
                            <Table.HeaderCell>Descripción</Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>

                        <Table.Body>
                        {
                        this.props.movimientos.map((movimiento) =>
                        <Table.Row>
                            <Table.Cell>{movimiento.fecha}</Table.Cell>
                            <Table.Cell>{movimiento.tipo}</Table.Cell>
                            <Table.Cell>{movimiento.importe}</Table.Cell>
                            <Table.Cell>{movimiento.descripcion}</Table.Cell>
                        </Table.Row>)
                        }
                        </Table.Body>
                    </Table>
                    <br/>
                </div>

                <div>
                    <Link to='/misCuentas'>
                        <Button floated='center'>
                            Atrás
                        </Button>
                    </Link>

                    <Link to='/misMovimientos/CrearMovimiento'>
                        <Button color='teal' floated='center'
                        icon labelPosition='left'>
                            <Icon name='payment' />
                            Crear Movimiento
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      movimientos: state.movimientos,
      numeroCuenta: state.numeroCuenta
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        cargarMovimientosAction: movimientos => {
        dispatch(actions.cargarMovimientosAction(movimientos))
        }        
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(MisMovimientos);
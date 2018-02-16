import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import { Table, Button, Icon, Pagination, Message } from 'semantic-ui-react'
import Header from 'semantic-ui-react/dist/commonjs/elements/Header/Header';
import axios from 'axios';
import Link from 'react-router-dom/Link';
import * as estilo from '../css/Movimiento';
/* Constantes */
const URL = 'http://localhost:8080/movimiento/mismovimientos/';

const URL_EXPORT = 'http://localhost:8080/movimiento/export/';

class MisMovimientos extends Component {

    constructor() {
        super();
        this.state = { itemsPerPage: 5, activePage: 1, 
            export:{enabled: false, valido:true} }
    }

    componentDidMount() {
        axios.get(URL + this.props.numeroCuenta)
            .then(response => {
                this.props.cargarMovimientosAction(response.data);
            })
            .catch(error => {
                
            })
    }

    mostrarMovimientos = () => {
        let rows = [];
        let split = [[]];
        for (let i = 0; i <= this.props.movimientos.length; i += this.state.itemsPerPage) {
            if (i + this.state.itemsPerPage <= this.props.movimientos.length)
                split.push(this.props.movimientos.slice(i, i + this.state.itemsPerPage))
            else
                split.push(this.props.movimientos.slice(i, this.props.movimientos.length))
        }

        for (let movimiento of split[this.state.activePage]) {
            rows.push(<Table.Row key={movimiento.id}>
                <Table.Cell>{movimiento.fecha}</Table.Cell>
                <Table.Cell>{movimiento.tipo}</Table.Cell>
                <Table.Cell>{movimiento.importe}</Table.Cell>
                <Table.Cell>{movimiento.descripcion}</Table.Cell>
            </Table.Row>)
        }

        return rows;

    }

    exportarMovimientos =()=>{
        axios.get(URL_EXPORT + this.props.numeroCuenta)
            .then(response => {
                this.exportCorrecto();
            })
            .catch(error => {
                this.exportIncorrecto();
            })
    }

    handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

    calcularPaginas = () => {
        let pages = this.props.movimientos.length / this.state.itemsPerPage;
        if (this.props.movimientos.length % this.state.itemsPerPage === 0)
            return pages;
        return pages + 1;
    }

    exportCorrecto=()=>{
        this.setState({export:{
            enabled: true,
            valido: true
        }})
    }

    exportIncorrecto=()=>{
        this.setState({export:{
            enabled: true,
            valido: false
        }})
    }

    printMensajeOk=()=>{
        return(
            <Message positive>
                <Message.Header>Correcto</Message.Header>
                <p>Los movimientos se han exportado correctamente</p>
            </Message>
        );
    }

    printMensajeError=()=>{
        return(
            <Message negative>
                <Message.Header>Error</Message.Header>
                <p>No hay movimientos o no se han podido exportar</p>
            </Message>
        );
    }

    render() {
        return (
            <div style={estilo.align}>
                <br />
                <Header as='h2' color="teal">Mis Movimientos</Header>
                <br />
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
                                this.mostrarMovimientos()
                            }
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='4'>
                                    <Link to='/misCuentas'>
                                        <Button floated='left'>
                                        Atrás
                                        </Button>
                                    </Link>    

                                    <Link to='/misMovimientos/CrearMovimiento'>
                                        <Button color='teal' 
                                            icon labelPosition='left'>
                                            <Icon name='payment' />
                                            Crear Movimiento
                                        </Button>
                                    </Link>

                                    <Button color="green" onClick={() => this.exportarMovimientos()} 
                                        floated='right' icon labelPosition='left' size='small'>
                                        <Icon name='external' /> Exportar movimientos
                                    </Button>
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='4'>
                                    <Pagination floated='right' defaultActivePage={1} onPageChange={this.handlePaginationChange} totalPages={parseInt(this.calcularPaginas(), 10)} />
                                </Table.HeaderCell>
                               </Table.Row>
                        </Table.Footer>
                    </Table>
                    <br />
                </div>
                <br/>
                <div>
                    {this.state.export.enabled & this.state.export.valido ? this.printMensajeOk() : null}
                    {this.state.export.enabled & !this.state.export.valido ? this.printMensajeError() : null}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        movimientos: state.bancoStore.movimientos,
        numeroCuenta: state.bancoStore.numeroCuenta
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import axios from 'axios';
import { Link } from 'react-router-dom'
import { Table, Button } from 'semantic-ui-react'

import { withRouter } from 'react-router-dom';

class ListarTransferencias extends Component {


	constructor() {
		super();
		this.state = {
			transferencias: []
		}
	}
	componentDidMount() {
		console.log(this.props.numeroCuenta)
		this.cargarMisTransferencias(this.props.numeroCuenta);
	}

	cargarMisTransferencias = (cuenta) => {
		axios.get('http://localhost:8080/transferencia/listarTransferenciaId/' + cuenta)
			.then(response => {
				this.setState({ transferencias: response.data })
			})
			.catch(function (error) {
				console.log(error);
			})
	}

	render() {
		return (
			<Table celled color='teal' key={'blue'}>
				<Table.Header>
					<Table.Row>
						<Table.HeaderCell> Cuenta de destino </Table.HeaderCell>
						<Table.HeaderCell> Cuenta de origen </Table.HeaderCell>
						<Table.HeaderCell> Importe </Table.HeaderCell>
						<Table.HeaderCell> Fecha de realizacion</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{
						this.state.transferencias.map((transferencia) =>
							<Table.Row>
								<Table.Cell >{transferencia.idDestino}</Table.Cell>
								<Table.Cell >{transferencia.cuenta}</Table.Cell>
								<Table.Cell >{`${transferencia.importe}€`}</Table.Cell>
								<Table.Cell >{new Date(transferencia.fechaRealizacion).toLocaleString()} </Table.Cell>
							</Table.Row>
						)
					}
				</Table.Body>
				<Table.Footer fullWidth>
					<Table.Row>
						<Table.HeaderCell colSpan='4'>
							<Button color="teal" onClick={() => this.props.history.push('/misCuentas')} floated='left' size='small'>
								Volver a mis cuentas
							</Button>
						</Table.HeaderCell>
					</Table.Row>
				</Table.Footer>
			</Table>
		)
	}
}

const mapStateToProps = state => {
	return {
		transferencias: state.bancoStore.transferencias,
		numeroCuenta: state.bancoStore.numeroCuenta
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listarTransfersAction: transferencias => {
			dispatch(actions.listarTransfersAction(transferencias))
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListarTransferencias));

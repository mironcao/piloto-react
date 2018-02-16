import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import axios from 'axios';
import { Table, Button, Pagination, Message, Icon } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom';

class ListarTransferencias extends Component {
	state = {
		exported: false
	}

	constructor() {
		super();
		this.state = {
			transferencias: [], activePage: 1, itemsPerPage: 5, numberOfPages: 1
		}
	}

	handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

	componentDidMount() {
		this.cargarMisTransferencias(this.props.numeroCuenta);
	}

	cargarMisTransferencias = (cuenta) => {
		axios.get('http://localhost:8080/transferencia/listarTransferenciaId/' + cuenta)
			.then(response => {
				this.setState({ transferencias: response.data })
			})
	}

	calcularPaginas = () => {
		let pages = this.state.transferencias.length / this.state.itemsPerPage;
		if (this.state.transferencias.length % this.state.itemsPerPage === 0)
			return pages;
		return pages + 1;
	}

	mostrarTransferencias = () => {
		let rows = [];
		let split = [[]];
		for (let i = 0; i <= this.state.transferencias.length; i += this.state.itemsPerPage) {
			if (i + this.state.itemsPerPage <= this.state.transferencias.length)
				split.push(this.state.transferencias.slice(i, i + this.state.itemsPerPage))
			else
				split.push(this.state.transferencias.slice(i, this.state.transferencias.length))
		}

		for (let transferencia of split[this.state.activePage]) {
			rows.push(<Table.Row>
				<Table.Cell >{transferencia.idDestino}</Table.Cell>
				<Table.Cell >{transferencia.cuenta}</Table.Cell>
				<Table.Cell >{`${transferencia.importe}€`}</Table.Cell>
				<Table.Cell >{new Date(transferencia.fechaRealizacion).toLocaleString()} </Table.Cell>
			</Table.Row>)
		}

		return rows;
	}

	exportarTransferencias = () => {
		this.setState({
			exported: true
		});
		axios.get("http://localhost:8080/transferencia/export").then(response => {
			if (response.status === 200)
				this.setState({
					exported: false
				});
		});
	}

	render() {
		let mensajeExportar = this.state.exported ? (<Message icon>
			<Icon name='circle notched' loading />
			<Message.Content>
				<Message.Header>Transferencias exportadas</Message.Header>
			</Message.Content>
		</Message>) : null;
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
					{this.mostrarTransferencias()}
				</Table.Body>
				<Table.Footer fullWidth>
					<Table.Row>
						<Table.HeaderCell colSpan='4'>
							<Button color="teal" onClick={() => this.props.history.push('/misCuentas')} floated='left' size='small'>
								Volver a mis cuentas
							</Button>
							<Button color="green" onClick={() => this.exportarTransferencias()} floated='right' icon labelPosition='left' size='small'>
								<Icon name='external' /> Exportar transferencias
                                            </Button>
							{mensajeExportar}
						</Table.HeaderCell>
						<Table.HeaderCell>
							<Pagination defaultActivePage={1} onPageChange={this.handlePaginationChange} totalPages={parseInt(this.calcularPaginas(), 10)} />
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

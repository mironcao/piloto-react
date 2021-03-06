import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import axios from 'axios';
import { Button, Table, Header, Message, Pagination, Container } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class MisCuentas extends Component {
	constructor() {
		super();
		this.state = { cuentas: [[]], dni: null, active: false, visible: true, error: null, itemsPerPage: 5, activePage: 1 }
	}

	handleDismiss = () => {
		this.setState({ visible: false })
	}

	buscarCuentas = (dni) => {
		let ret = this.validarDni(dni);
		let message = (<Message error onDismiss={this.handleDismiss} header='Formato de NIF/NIE inválido'
			content='Por favor introduzca un valor correcto' />)
		let split = []
		if (ret) {
			axios.get('http://localhost:8080/cuenta/miscuentas?dni=' + dni).then(response => {
				for (let i = 0; i <= response.data.length; i += this.state.itemsPerPage) {
					if (i + this.state.itemsPerPage <= response.data.length)
						split.push(response.data.slice(i, i + this.state.itemsPerPage))
					else
						split.push(response.data.slice(i, response.data.length))
				}
				this.setState({ cuentas: split })
			})
			this.setState({ error: null });
			return ret;
		}
		this.setState({ error: message });
		this.setState({ visible: true });
		return ret;

	}

	handlePaginationChange = (e, { activePage }) => this.setState({ activePage })

	validarDni(dni) {
		var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
		var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
		var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
		var str = dni.toString().toUpperCase();

		if (!nifRexp.test(str) && !nieRexp.test(str)) {
			this.setState({ mensajeError: this.state.mensajeError + "El DNI es incorrecto\n" });
			return false;
		}
		var nie = str
			.replace(/^[X]/, '0')
			.replace(/^[Y]/, '1')
			.replace(/^[Z]/, '2');

		var letter = str.substr(-1);
		var charIndex = parseInt(nie.substr(0, 8), 10) % 23;
		if (validChars.charAt(charIndex) === letter)
			return true;
		this.setState({ mensajeError: this.state.mensajeError + "El DNI es incorrecto\n" });
		return false;
	}



	actualizarDni = (event) => {
		this.setState({ dni: event.target.value });
		if (event.target.value.length === 9)
			this.setState({ active: true });
		else
			this.setState({ active: false });
	}

	mostrarMovimientos = (numeroCuenta) => {
		this.props.listarMovimientos(numeroCuenta);
		this.props.history.push('/misMovimientos');
	}

	mostrarTransferencias = (numeroCuenta) => {
		this.props.listarMovimientos(numeroCuenta);
		this.props.history.push('/Transferencias/ListarTransferencias');
	}

	generarTransferencias = (numeroCuenta) => {
		this.props.listarMovimientos(numeroCuenta);
		this.props.history.push('/Transferencias/GenerarTransferencia');
	}

	gestionarTitulares = (numeroCuenta) => {
		this.props.listarMovimientos(numeroCuenta);
		this.props.history.push('/titulares');
	}

	mostrarCuentas = () => {
		let rows = [];
		let index = 0;
		for (let c of this.state.cuentas[this.state.activePage - 1]) {
			index = 0;
			for (let t of c.titulares) {
				if (index === 0) {
					rows.push(<Table.Row key={c.numeroCuenta}>
						<Table.Cell rowSpan={c.titulares.length}>{c.numeroCuenta}</Table.Cell>
						<Table.Cell>{t.nombre}</Table.Cell>
						<Table.Cell>{t.apellidos}</Table.Cell>
						<Table.Cell rowSpan={c.titulares.length}><Button onClick={() => this.mostrarMovimientos(c.numeroCuenta)}>Mostrar movimientos</Button></Table.Cell>
						<Table.Cell rowSpan={c.titulares.length}><Button onClick={() => this.mostrarTransferencias(c.numeroCuenta)}>Mostrar transferencias</Button></Table.Cell>
						<Table.Cell rowSpan={c.titulares.length}><Button onClick={() => this.generarTransferencias(c.numeroCuenta)}>Generar transferencias</Button></Table.Cell>
						<Table.Cell rowSpan={c.titulares.length}><Button onClick={() => this.gestionarTitulares(c.numeroCuenta)}>Gestionar titulares</Button></Table.Cell>
					</Table.Row>)
				} else {
					rows.push(<Table.Row key={t.dni}>
						<Table.Cell>{t.nombre}</Table.Cell>
						<Table.Cell>{t.apellidos}</Table.Cell>
					</Table.Row>)
				}
				index = index + 1;
			}
		}
		return rows;
	}

	render() {
		return (
			<Container>
				<br></br>
				<Header as='h2' color="teal" textAlign="center">
					Cuentas
				</Header>
				<label htmlFor="dni">DNI/NIE/NIF: &nbsp;&nbsp; </label>
				<input name="dni" type="text" onChange={this.actualizarDni} />
				<Button toggle disabled={!this.state.active} onClick={() => this.buscarCuentas(this.state.dni)}>Buscar</Button>
				{this.state.visible ? this.state.error : null}
				<br></br>

				<br></br>
				<Table unstackable celled structured color='teal'>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>Número Cuenta</Table.HeaderCell>
							<Table.HeaderCell>Nombre</Table.HeaderCell>
							<Table.HeaderCell>Apellidos</Table.HeaderCell>
							<Table.HeaderCell>Movimientos</Table.HeaderCell>
							<Table.HeaderCell>ListarTransferencias</Table.HeaderCell>
							<Table.HeaderCell>GenerarTransferencias</Table.HeaderCell>
							<Table.HeaderCell>Titulares</Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{this.mostrarCuentas()}
					</Table.Body>
					<Table.Footer>
						<Table.Row>
							<Table.HeaderCell colSpan='7'>
								<Pagination defaultActivePage={1} onPageChange={this.handlePaginationChange} totalPages={this.state.cuentas.length} />
							</Table.HeaderCell>
						</Table.Row>
					</Table.Footer>
				</Table>
			</Container>
		)
	}

}

const mapStateToProps = state => {
	return {
		cuentas: state.cuentas
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listarMovimientos: numeroCuenta => {
			dispatch(actions.listarMovimientos(numeroCuenta))
		}
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MisCuentas));





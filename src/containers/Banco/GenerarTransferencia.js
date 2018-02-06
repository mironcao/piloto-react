import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import axios from 'axios';
import { Table } from 'semantic-ui-react';
import { Message } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class GenerarTransferencia extends Component {

	state = {
		cuentaOrigen: {
			value: "",
			valid: true,
			touched: false
		},
		cuentaDestino: {
			value: "",
			valid: true,
			touched: false
		},
		importe: 0
	}
	peticion = () => {
		let valid = true;
		for (let prop in this.state) {
			valid = this.state[prop].valid && this.state[prop].touched && valid;
		}
		if (valid) {
			const transferencia = {
				cuenta: this.state.cuentaOrigen,
				idDestino: this.state.cuentaDestino,
				importe: this.state.importe
			}
			axios.post('http://localhost:8080/transferencia/transferencia', transferencia).then((response) => {
				this.props.history.push("/Transferencias");
			});
			this.setState({
				cuentaOrigen: {
					value: "",
					valid: true,
					touched: false
				},
				cuentaDestino: {
					value: "",
					valid: true,
					touched: false
				},
				importe: 0
			});
		} else {
			this.setState({
				cuentaOrigen: {
					value: "",
					valid: true,
					touched: false
				},
				cuentaDestino: {
					value: "",
					valid: true,
					touched: false
				},
				importe: 0
			});
		}
	}

	asignarOrigenHandler = (event) => {
		this.setState({ cuentaOrigen: event.target.value })
		const cuentaOrigen = this.state.cuentaOrigen;
		let valid = event.target.value.trim(" ") !== "";
		this.setState({
			cuentaOrigen: {
				value: event.target.value,
				touched: true,
				valid: valid
			}
		});
	}

	asignarDestinoHandler = (event) => {
		this.setState({ cuentaDestino: event.target.value })
		const cuentaDestino = this.state.cuentaDestino;
		let valid = event.target.value.trim(" ") !== "";
		this.setState({
			cuentaDestino: {
				value: event.target.value,
				touched: true,
				valid: valid
			}
		});
	}

	asignarImporteHandler = (event) => {
		this.setState({ importe: event.target.value })
	}




	render() {
		const message = <Message error header='Campo no puede ser vacio' />
		return (
			<form class="ui fluid form">
				<div class="field">
					<label>Inserte cuenta origen</label>
					<Input fluid error={!this.state.cuentaOrigen.valid}
						onChange={this.asignarOrigenHandler} placeholder="Inserte cuenta de origen">{this.props.cuentaOrigen ? this.props.cuentaOrigen : null}</Input>
					{this.state.cuentaOrigen.valid ? null : message}
				</div>
				<div class="field">
					<label>Inserte cuenta de destino</label>
					<Input fluid error={!this.state.cuentaDestino.valid}
						onChange={this.asignarDestinoHandler} placeholder="Inserte cuenta de destino">{this.props.cuentaDestino ? this.props.cuentaDestino : null}</Input>
					{this.state.cuentaDestino.valid ? null : message}
				</div>

				<div class="field">
					<label>Importe transferencia</label>
					<input onChange={this.asignarImporteHandler} type="text" placeholder="Importe transferencia" />
				</div>

				<button class="ui fluid button" role="button" onClick={this.peticion}>Realizar Transferencia</button>

				<p><Link to="/Transferencias">Volver a transferencias</Link></p>
			</form>
		)
	}

}

export default withRouter(GenerarTransferencia);
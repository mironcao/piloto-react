import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import axios from 'axios';
import { Table } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

class GenerarTransferencia extends Component {

	state = {
		cuentaOrigen: null,
		cuentaDestino: null,
		importe: 0
	}
	peticion = () => {
		const transferencia = {
			cuenta: this.state.cuentaOrigen,
			idDestino: this.state.cuentaDestino,
			importe: this.state.importe
		}
		axios.post('http://localhost:8080/transferencia/transferencia', transferencia).then((response) => {
			this.props.history.push("/Transferencias");
		});
	}

	asignarOrigenHandler = (event) => {
		this.setState({ cuentaOrigen: event.target.value })
	}

	asignarDestinoHandler = (event) => {
		this.setState({ cuentaDestino: event.target.value })
	}

	asignarImporteHandler = (event) => {
		this.setState({ importe: event.target.value })
	}




	render() {
		return (
			<form class="ui fluid form">
				<div class="field">
					<label>Inserte cuenta origen</label>
					<input onChange={this.asignarOrigenHandler} type="text" placeholder="Inserte cuenta de origen" />
				</div>
				<div class="field">
					<label>Inserte cuenta de destino</label>
					<input onChange={this.asignarDestinoHandler} type="text" placeholder="Inserte cuenta de destino" />
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
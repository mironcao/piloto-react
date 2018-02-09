import React, { Component } from 'react';
import axios from 'axios';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import { Input } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';

class GenerarTransferencia extends Component {

	state = {
		cuentaOrigen: {
			value: "",
			valid: false
		},
		cuentaDestino: {
			value: "",
			valid: false
		},
		importe: {
			value: null,
			valid: false,
		}
	}
	peticion = () => {
		const transferencia = {
			cuenta: this.props.numeroCuenta,
			idDestino: this.state.cuentaDestino.value,
			importe: this.state.importe.value
		}
		if (this.validarImporte(this.state.importe.value) && this.validarCuenta(this.state.cuentaDestino.value)) {
			axios.post('http://localhost:8080/transferencia/transferencia', transferencia).then((response) => {
			});
			this.props.history.push("/Transferencias");
		}
	}

	asignarDestinoHandler = (event) => {
		if (!this.validarCuenta(event.target.value)) {
			this.setState({
				cuentaDestino: {
					value: event.target.value,
					valid: false
				}
			});
		} else {
			this.setState({
				cuentaDestino: {
					value: event.target.value,
					valid: true
				}
			});
		}
	}

	asignarImporteHandler = (event) => {
		if (!this.validarImporte(event.target.value)) {
			this.setState({
				importe: {
					value: event.target.value,
					valid: false
				}
			});
		} else {
			this.setState({
				importe: {
					value: event.target.value,
					valid: true
				}
			});
		}
	}

	validarCuenta(cuentaDes) {
		var exprCuenta = /^[0-9]{25}$/;
		if (cuentaDes == null || !exprCuenta.test(cuentaDes)) {
			return false;
		}
		return true;
	}
	validarImporte(importe) {
		var exprImp = /^([0-9]{1,15})(\.[0-9]{1,2})?$/;
		if (importe == null || !exprImp.test(importe)) {
			return false;
		}
		return true;
	}

	render() {
		var messageImporte = <Message negative>
			<Message.Header>Error</Message.Header>
			<p> El importe debe tener el formato correcto</p>
		</Message>

		var messageCuenta = <Message negative>
			<Message.Header>Error</Message.Header>
			<p> La cuenta debe tener 25 dígitos</p>
		</Message>
		return (
			<div class="ui fluid form">
				<div class="field">
					<label>Inserte cuenta de destino</label>
					<Form>
						<Input fluid error={!this.validarCuenta(this.cuentaDestino)} onChange={this.asignarDestinoHandler} placeholder="Inserte cuenta de destino" />
						{this.state.cuentaDestino.valid ? null : messageCuenta}
					</Form>
				</div>

				<div class="field">
					<label>Importe transferencia</label>
					<Form>
						<Input fluid error={!this.validarImporte(this.importe)} onChange={this.asignarImporteHandler} type="text" placeholder="Importe transferencia" />
						{this.state.importe.valid ? null : messageImporte}
					</Form>
				</div>

				<button class="ui fluid button" onClick={this.peticion}>Realizar Transferencia</button>

				<p><Link to="/Transferencias">Volver a transferencias</Link></p>
			</div>
		)
	}

}

const mapStateToProps = state => {
	return {
		transferencias: state.transferencias,
		numeroCuenta: state.numeroCuenta
	}
}

const mapDispatchToProps = dispatch => {
	return {
		generarTransfersAction: transferencias => {
			dispatch(actions.generarTransfersAction(transferencias))
		}
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(GenerarTransferencia);
import React, { Component } from 'react';
import axios from 'axios';
import { Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import { Input, Button } from 'semantic-ui-react';
import Form from 'semantic-ui-react/dist/commonjs/collections/Form/Form';
import * as validator from '../Validadores/ValidadorImporte';

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
		},
		error:false
	}
	peticion = () => {
		const transferencia = {
			cuenta: this.props.numeroCuenta,
			idDestino: this.state.cuentaDestino.value,
			importe: this.state.importe.value
		}
		if (validator.validarImporte(this.state.importe.value) && this.validarCuenta(this.state.cuentaDestino.value)) {
			axios.post('http://localhost:8080/transferencia/transferencia', transferencia).then((response) => {
			this.props.history.push('/misCuentas')
			}).catch( (error)=> {
				this.setState({
					error: true
				});
			 });
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
		if (!validator.validarImporte(event.target.value)) {
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

	render() {
		var messageImporte = <Message negative>
			<Message.Header>Error</Message.Header>
			<p> El importe debe tener el formato correcto</p>
		</Message>

		var messageCuenta = <Message negative>
			<Message.Header>Error</Message.Header>
			<p> La cuenta debe tener 25 dígitos</p>
		</Message>

		var messageImporteCuenta = <Message negative>
			<Message.Header>Error</Message.Header>
			<p> No puedes hacerte una transferencia a ti mismo o el importe de la transferencia es superior al de tu saldo en la cuenta</p>
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
						<Input fluid error={!validator.validarImporte(this.importe)} onChange={this.asignarImporteHandler} type="text" placeholder="Importe transferencia" />
						{this.state.importe.valid ? null : messageImporte}
					</Form>
				</div>

				<button class="ui fluid button" onClick={this.peticion}>Realizar Transferencia</button>

				<div>
					{this.state.error ? messageImporteCuenta: null}
				</div>

				<Button color="teal" onClick={() => this.props.history.push('/misCuentas')} floated='left' size='small'>
					Volver a mis cuentas
				</Button>
			</div>
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
		generarTransfersAction: transferencias => {
			dispatch(actions.generarTransfersAction(transferencias))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GenerarTransferencia);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import axios from 'axios';
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

var divStyle = {
	width: "25%%"
};
var divStyle100 = {
	width: "100%"
};
class ListarTransferencias extends Component {


	constructor() {
		super();
		this.state = {
			transferencias: []
		}
	}
	componentDidMount() {
		axios.get('http://localhost:8080/transferencia/listarTransferenciaId/123456').then(response => {
			this.props.listarTransfersAction(response.data)
		}
		)
	}


	render() {
		return (
			<table style={divStyle100}>
				<thead>
					<th style={divStyle}>Cuenta de destino</th>
					<th style={divStyle}>Cuenta de Origen</th>
					<th style={divStyle}>Importe</th>
					<th style={divStyle}>Fecha de realizacion</th>
				</thead>
				{this.props.transferencias.map((transferencia) =>
					<tr>
						<td style={divStyle}>{transferencia.idDestino}</td>

						<td style={divStyle}> {transferencia.cuenta}</td>

						<td style={divStyle}> {transferencia.importe} </td>

						<td style={divStyle}> {new Date(transferencia.fechaRealizacion).toLocaleString()} </td>
					</tr>
				)}
				<tfoot>
					<p><Link to="/Transferencias">Volver a transferencias</Link></p>
				</tfoot>
			</table>

		)
	}

}

const mapStateToProps = state => {
	return {
		transferencias: state.transferencias
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listarTransfersAction: transferencias => {
			dispatch(actions.listarTransfersAction(transferencias))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ListarTransferencias);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import axios from 'axios';
import {Table} from 'semantic-ui-react';

var divStyle = {
	width:"33.3%"
  }; 
  var divStyle100 = {
	width:"100%"
  }; 
class ListarTransferencias extends Component {
	

	constructor() {
		super();
		this.state = {
			transferencias: []
		}
	}
	componentDidMount() {
		axios.get('http://localhost:8080/transferencia/listarTransferenciaId/1234567').then(response => {
			console.log("tran", response.data);
			this.setState({ transferencias: response.data });
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
				</thead>
				{this.state.transferencias.map((transferencia) => 
					<tr>
						<td style={divStyle}>{transferencia.idDestino}</td>
					
						<td style={divStyle}> {transferencia.cuenta}</td>
					
						<td style={divStyle}> {transferencia.importe} </td>
					</tr>
				)}
				</table>
		)
	}
	
}

export default ListarTransferencias;
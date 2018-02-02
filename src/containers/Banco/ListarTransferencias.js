import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import axios from 'axios';

class ListarTransferencias extends Component {
	constructor(){
		super();
		this.state= {transferencias:[]
		}
	}
componentDidMount() {
	axios.get('http://localhost:8080/transferencia/listarTransferenciaId/123456').then(response => {
	this.setState({transferencias:response.data}); }
    )
}

render() {
	return(
	<div>
	{this.state.transferencias.map((transferencia)=> <p>{transferencia.numeroCuenta}</p>)}
	</div>
	)
}
}

export default ListarTransferencias;
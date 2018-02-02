import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import axios from 'axios';

class MisCuentas extends Component {
	constructor(){
		super();
		this.state= {cuentas:[]
		}
	}
	


componentDidMount() {
	axios.get('http://localhost:8080/cuenta/miscuentas?dni=71778153Y').then(response => {
	this.setState({cuentas:response.data}); }
	)
}

render() {
	return(
	<div>
	{this.state.cuentas.map((cuenta)=> <p>{cuenta.numeroCuenta}</p>)}
	</div>
	)
}

}



export default MisCuentas;



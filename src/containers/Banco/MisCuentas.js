import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import axios from 'axios';
import {Button, Table} from 'semantic-ui-react';

class MisCuentas extends Component {
	constructor(){
		super();
		this.state= {cuentas:[], dni:null
		}
	}
	


buscarCuentas(dni) {
	axios.get('http://localhost:8080/cuenta/miscuentas?dni='+dni).then(response => {
	this.setState({cuentas:response.data}); }
	)
}

actualizarDni=(event)=>  {
	this.setState({dni:event.target.value});
}

render() {
	return(
	<div>
	<input type="text" onChange={this.actualizarDni}/>
	<Button onClick={()=>this.buscarCuentas(this.state.dni)}>Buscar</Button>
	<Table collapsing celled structured> 
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell rowSpan='2'>Número Cuenta</Table.HeaderCell>
				<Table.HeaderCell colSpan='2'	>Titulares</Table.HeaderCell>
			</Table.Row>
			<Table.Row>
				<Table.HeaderCell>Nombre</Table.HeaderCell>
				<Table.HeaderCell>Apellidos</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
	{this.state.cuentas.map((cuenta)=> 
		<Table.Row>
			<Table.Cell collapsing>{cuenta.numeroCuenta}</Table.Cell>
			{cuenta.titulares.map((titular)=>
			<Table.Row>
			<Table.Cell collapsing>{titular.nombre}</Table.Cell>
			<Table.Cell collapsing>{titular.apellidos}</Table.Cell>
			</Table.Row>
			)}
		</Table.Row>
		)}
	</Table>
	</div>
	)
}

}



export default MisCuentas;



import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import axios from 'axios';
import {Button, Table} from 'semantic-ui-react';

class MisCuentas extends Component {
	constructor(){
		super();
		this.state= {cuentas:[],dni:null}
	}

buscarCuentas=(dni)=> {
	axios.get('http://localhost:8080/cuenta/miscuentas?dni='+dni).then(response => {
	this.setState({cuentas:response.data}); 
	}
	);
	
}

actualizarDni=(event)=>  {
	this.setState({dni:event.target.value});
}

mostrarCosas=()=> {
	let rows=[];
	let index=0;
	for(let c of this.state.cuentas) {
		index=0;
		rows.push(<Table.Body>);
		rows.push(<Table.Row>);
		rows.push(<Table.Cell rowspan={c.titulares.length}>{c.numeroCuenta}</Table.Cell>);
		for(let t of c.titulares) { 
			if(index==0) {
				rows.push(<Table.Cell>{t.nombre}</Table.Cell>);
				rows.push(<Table.Cell>{t.apellidos}</Table.Cell>);
				rows.push(</Table.Row>);
			} else {
				rows.push(<Table.Row>);
				rows.push(<Table.Cell>{t.nombre}</Table.Cell>);
				rows.push(<Table.Cell>{t.apellidos}</Table.Cell>);
				rows.push(</Table.Row>);
			}
			index=index+1;
		}
		rows.push(</Table.Body>);
	}
	return rows;
}

render(){
	return(
	<div>
	<input type="text" onChange={this.actualizarDni}/>
	<Button onClick={()=>this.buscarCuentas(this.state.dni)}>Buscar</Button>
	<Table collapsing celled structured> 
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>Número Cuenta</Table.HeaderCell>
				<Table.HeaderCell>Nombre</Table.HeaderCell>
				<Table.HeaderCell>Apellidos</Table.HeaderCell>
			</Table.Row>
		</Table.Header>
		<Table.Body>
		{this.mostrarCosas()}
		</Table.Body>
	</Table>
	</div>
	)
}

}



export default MisCuentas;




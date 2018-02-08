import React, { Component } from 'react';
/*import {connect} from 'react-redux';
import * as actions from "../../store/actions";*/
import axios from 'axios';
import {Button, Table} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';

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

mostrarMovimientos=(numeroCuenta)=> {
	this.props.listarMovimientos(numeroCuenta);
	this.props.history.push('/misMovimientos');
}

mostrarCosas=()=> {
	let rows=[];
	let index=0;
	for(let c of this.state.cuentas) {
		index=0;
		for(let t of c.titulares) { 
			if(index===0) {
				rows.push(<Table.Row>
				<Table.Cell rowspan={c.titulares.length}>{c.numeroCuenta}</Table.Cell>
				<Table.Cell>{t.nombre}</Table.Cell>
				<Table.Cell>{t.apellidos}</Table.Cell>
				<Table.Cell rowspan={c.titulares.length}><Button onClick={()=>this.mostrarMovimientos(c.numeroCuenta)}>Mostrar movimientos</Button></Table.Cell>
				</Table.Row>)
			} else {
				rows.push(<Table.Row>
				<Table.Cell>{t.nombre}</Table.Cell>
				<Table.Cell>{t.apellidos}</Table.Cell>
				</Table.Row>)
			}
			index=index+1;
		}
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
				<Table.HeaderCell>Movimientos</Table.HeaderCell>
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

const mapStateToProps = state => {
	return {
		cuentas:state.cuentas
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listarMovimientos: numeroCuenta => {
			dispatch(actions.listarMovimientos(numeroCuenta))
		}
	}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MisCuentas));

/*export default MisCuentas;*/




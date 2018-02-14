import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import axios from 'axios';
import {Button, Table, Header, Message} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';

class MisCuentas extends Component {
	constructor(){
		super();
		this.state= {cuentas:[],dni:null, active:false}
	}
	
  
buscarCuentas=(dni)=> {
		axios.get('http://localhost:8080/cuenta/miscuentas?dni='+dni).then(response => {
			this.setState({cuentas:response.data}); })
}

mostrarMovimientos=(numeroCuenta)=> {
	this.props.listarMovimientos(numeroCuenta);
	this.props.history.push('/misMovimientos');
}

mostrarTransferencias=(numeroCuenta)=> {
	this.props.listarMovimientos(numeroCuenta);
	this.props.history.push('/Transferencias/ListarTransferencias');
}

generarTransferencias=(numeroCuenta)=> {
	this.props.listarMovimientos(numeroCuenta);
	this.props.history.push('/Transferencias/GenerarTransferencia');
}

gestionarTitulares=(numeroCuenta)=> {
	this.props.listarMovimientos(numeroCuenta);
	this.props.history.push('/titulares/list');
}

mostrarCosas=()=> {
	let rows=[];
	let index=0;
	for(let c of this.state.cuentas) {
		index=0;
		for(let t of c.titulares) { 
			if(index===0) {
				rows.push(<Table.Row key={c.numeroCuenta}>
				<Table.Cell rowSpan={c.titulares.length}>{c.numeroCuenta}</Table.Cell>
				<Table.Cell>{t.nombre}</Table.Cell>
				<Table.Cell>{t.apellidos}</Table.Cell>
				<Table.Cell rowSpan={c.titulares.length}><Button onClick={()=>this.mostrarMovimientos(c.numeroCuenta)}>Mostrar movimientos</Button></Table.Cell>
				<Table.Cell rowSpan={c.titulares.length}><Button onClick={()=>this.mostrarTransferencias(c.numeroCuenta)}>Mostrar transferencias</Button></Table.Cell>
				<Table.Cell rowSpan={c.titulares.length}><Button onClick={()=>this.generarTransferencias(c.numeroCuenta)}>Generar transferencias</Button></Table.Cell>
				<Table.Cell rowSpan={c.titulares.length}><Button onClick={()=>this.gestionarTitulares(c.numeroCuenta)}>Gestionar titulares</Button></Table.Cell>
				</Table.Row>)
			} else {
				rows.push(<Table.Row key={t.dni}>
				<Table.Cell>{t.nombre}</Table.Cell>
				<Table.Cell>{t.apellidos}</Table.Cell>
				</Table.Row>)
			}
			index=index+1;
		}
	}
	return rows;
}
componentDidMount(){
	this.buscarCuentas(this.props.user.dni)
}

render(){
	return(
	<div>
	<br></br>
	<Header as='h2'>
			Mis cuentas
		<Header.Subheader>
			Información acerca de sus cuentas y movimientos.
		</Header.Subheader>	
	</Header>
	<br></br>
	<Table collapsing unstackable celled structured color='teal'> 
		<Table.Header>
			<Table.Row>
				<Table.HeaderCell>Número Cuenta</Table.HeaderCell>
				<Table.HeaderCell>Nombre</Table.HeaderCell>
				<Table.HeaderCell>Apellidos</Table.HeaderCell>
				<Table.HeaderCell>Movimientos</Table.HeaderCell>
				<Table.HeaderCell>ListarTransferencias</Table.HeaderCell>
				<Table.HeaderCell>GenerarTransferencias</Table.HeaderCell>
				<Table.HeaderCell>Titulares</Table.HeaderCell>
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
		cuentas:state.bancoStore.cuentas,
		user:state.bancoStore.user
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listarMovimientos: numeroCuenta => {
			dispatch(actions.listarMovimientos(numeroCuenta))}
	}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MisCuentas));





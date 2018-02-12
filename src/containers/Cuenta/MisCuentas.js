import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import axios from 'axios';
import {Button, Table, Header, Message} from 'semantic-ui-react';
import {withRouter} from 'react-router-dom';

class MisCuentas extends Component {
	constructor(){
		super();
		this.state= {cuentas:[],dni:null, active:false, visible:true, error:null}
	}
	
handleDismiss = () => {
    this.setState({ visible: false })
}
  
buscarCuentas=(dni)=> {
	let ret = this.validarDni(dni);
	let message = (<Message error onDismiss={this.handleDismiss} header='Formato de DNI/NIE/NIF inválido'
					content='Por favor introduzca un valor correcto'/>)
	if(ret) {
		axios.get('http://localhost:8080/cuenta/miscuentas?dni='+dni).then(response => {
			this.setState({cuentas:response.data}); 
			}
		);
		this.setState({error:null});
		return ret;
	}
	this.setState({error:message});
	this.setState({visible:true});
	return ret;
}

validarDni(dni) {
	var validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
	var nifRexp = /^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
	var nieRexp = /^[XYZ]{1}[0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]{1}$/i;
	var str = dni.toString().toUpperCase();

	if (!nifRexp.test(str) && !nieRexp.test(str)){
		this.setState({mensajeError:this.state.mensajeError+"El DNI es incorrecto\n"});
		return false;
	}
	var nie = str
	.replace(/^[X]/, '0')
	.replace(/^[Y]/, '1')
	.replace(/^[Z]/, '2');

	var letter = str.substr(-1);
	var charIndex = parseInt(nie.substr(0, 8)) % 23;
	if (validChars.charAt(charIndex) === letter) 
		return true;
	this.setState({mensajeError:this.state.mensajeError+"El DNI es incorrecto\n"});
	return false;
} 
 


actualizarDni=(event)=>  {
	this.setState({dni:event.target.value});
	if(event.target.value.length===9)
		this.setState({active:true});
	else
		this.setState({active:false});
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
	<label htmlFor="dni">DNI/NIE/NIF: &nbsp;&nbsp; </label>
	<input name="dni" type="text" onChange={this.actualizarDni}/>
	<Button toggle disabled={!this.state.active} onClick={()=>this.buscarCuentas(this.state.dni)}>Buscar</Button>
	{this.state.visible? this.state.error : null}
	<br></br>
	
	<br></br>
	<center><Table collapsing unstackable celled structured> 
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
	</Table></center>
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
			dispatch(actions.listarMovimientos(numeroCuenta))}
	}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(MisCuentas));





import React, { Component } from 'react';
import axios from 'axios';
import { Button, Input, Message,Dropdown, Grid,Form} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import * as validadores from '../Validadores/ValidadorPersona'
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Segment from 'semantic-ui-react/dist/commonjs/elements/Segment/Segment';
import FormField from 'semantic-ui-react/dist/commonjs/collections/Form/FormField';
import FormDropdown from 'semantic-ui-react/dist/commonjs/collections/Form/FormDropdown';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label/Label';

class AñadirCliente extends Component {
    constructor() {
        super();
        this.state = {
            clientes: [], sucursalId: "", DNI: { value: "", valid: true }, nombre: { value: "", valid: true },
            apellidos: { value: "", valid: true }, direccion: { value: "", valid: true }, email: { value: "", valid: true },
            fijo: { value: "", valid: true }, movil: { value: "", valid: true ,sucursales:[]}
        }
    }

    componentDidMount() {
       
        axios.get("http://localhost:8080/sucursal/")
            .then(response => { 
                let listaSucursales = []
                 response.data.map((sucursal)=>{
                    listaSucursales.push({text: sucursal.nombre, value:sucursal.id})
                 })
                 this.setState({sucursales:listaSucursales})})
              
    }

    crearCliente() {
        if (this.validarCliente()) {
            axios.post("http://localhost:8080/clientes/clientes?sucursalId=" + this.state.sucursalId, {
                dni: this.state.DNI.value,
                nombre: this.state.nombre.value, apellidos: this.state.apellidos.value, direccion: this.state.direccion.value,
                email: this.state.email.value, fijo: this.state.fijo.value, movil: this.state.movil.value
            }).then((response) => this.props.history.push("/Clientes"))
        }

    }
    reiniciarFormulario(){
        this.setState(
            { 
                sucursalId:"",
                DNI: {value: "",valid:true},
                nombre: {value: "",valid:true},
                apellidos: {value: "",valid:true},
                direccion: {value: "",valid:true},
                email:{value: "",valid:true},
                fijo:{value: "",valid:true},
                movil:{value: "",valid:true}
            }
        )
    }
    validarCliente() {
        var valido = true;
        if (!this.validarDNI(this.state.DNI.value))
            valido = false;
        if (!this.validarEmail(this.state.email.value))
            valido = false;
        if (this.state.fijo.value.length !== 0 && !this.validarFijo(this.state.fijo.value))
            valido = false;
        if (this.state.movil.value.length !== 0 && !this.validarMovil(this.state.movil.value))
            valido = false;
        if (!this.validarDireccion(this.state.direccion.value))
            valido = false;
        if (!this.validarNombre(this.state.nombre.value))
            valido = false;
        if (!this.validarApellidos(this.state.apellidos.value))
            valido = false;
        return valido;
    }

    validarDNI(dni) {
        if (!validadores.validarDNI(dni)) {
            this.setState({ DNI: { value: dni, valid: false } })
            return false;
        } return true;
    }

    validarEmail(email) {
        if (!validadores.validarEmail(email)) {
            this.setState({ email: { value: email, valid: false } })
            return false;
        } return true;
    }
    validarFijo(fijo) {
        if (!validadores.validateTelefonoFijo(fijo)) {
            this.setState({ fijo: { value: fijo, valid: false } })
            return false;
        } return true;
    }

    validarMovil(movil) {
        if (!validadores.validateTelefonoMovil(movil)) {
            this.setState({ movil: { value: movil, valid: false } })
            return false;
        } return true;
    }
    validarNombre(nombre) {
        if (!validadores.validarNombre(nombre)) {
            this.setState({ nombre: { value: nombre, valid: false } })
            return false;
        } return true;
    }
    validarApellidos(apellidos) {
        if (!validadores.validarApellidos(apellidos)) {
            this.setState({ apellidos: { value: apellidos, valid: false } })
            return false;
        } return true;
    }
    validarDireccion(direccion) {
        if (!validadores.validarDireccion(direccion)) {
            this.setState({ direccion: { value: direccion, valid: false } })
            return false;
        } return true;
    }

    cambiarSucursal = (event, data) => {
        this.setState({ sucursalId: data.value });
    }

    cambiarEstado = (event,{name, value}) => {
        this.setState({ [name]: { value: value, valid: true } })
    }
    mostrarError(tipo) {
        return (
            <Message negative>
                <p>El {tipo} es incorrecto</p>
            </Message>
        )
    }
    render() {
        return (
           <Grid textAlign = "center" style={{height:"100%"}} verticalAlign="middle">
                <Grid.Column style={{maxWidth: 500}}>
                    <Form size="large">
                        <Segment stacked>
                        <Form.Field>
                        <Dropdown fluid selection options={this.state.sucursales} 
                            onChange={(event,data)=>this.cambiarSucursal(event, data)} placeholder='Sucursal' 
                            pointing='left' className='link item' value={this.state.sucursalId}>
                        </Dropdown>
                        </Form.Field>
                            <Form.Field>
                            <Label >DNI</Label>
                                <Input focus label={{icon: 'asterisk' }} labelPosition="rigth corner" focus placeholder='DNI...'
                                 name="DNI" value={this.state.DNI.value} onChange={this.cambiarEstado} maxLength="9" />    
                                {this.state.DNI.valid ? null : this.mostrarError("DNI")}
                            </Form.Field>
                            <Form.Field>
                                <Input focus label={{ icon: 'asterisk' }} labelPosition="rigth corner" placeholder='Nombre...'
                                name="nombre" value={this.state.nombre.value} onChange={this.cambiarEstado} maxLength="15" />
                                {this.state.nombre.valid ? null : this.mostrarError("nombre")}
                            </Form.Field>
                            <Form.Field>
                                <Input focus label={{ icon: 'asterisk' }} labelPosition="rigth corner" placeholder='Apellidos...' 
                                name="apellidos" value={this.state.apellidos.value} onChange={this.cambiarEstado} maxLength="30" />
                                {this.state.apellidos.valid ? null : this.mostrarError("apellidos")}
                            </Form.Field>
                            <Form.Field>
                                <Input focus label={{ icon: 'asterisk' }} labelPosition="rigth corner" placeholder='Direccion...' 
                                name="direccion" value={this.state.direccion.value} onChange={this.cambiarEstado} maxLength="50" />
                                {this.state.direccion.valid ? null : this.mostrarError("direccion")}
                            </Form.Field>
                            <Form.Field>
                                <Input focus labelPosition="rigth corner" placeholder='Email...'
                                 name="email" value={this.state.email.value} onChange={this.cambiarEstado}/>
                                {this.state.email.valid ? null : this.mostrarError("email")}
                            </Form.Field>
                            <Form.Field>
                                <Input focus labelPosition="rigth corner" placeholder='Fijo...' 
                                name="fijo" value={this.state.fijo.value}  onChange={this.cambiarEstado} />
                                {this.state.fijo.valid ? null : this.mostrarError("fijo")}
                            </Form.Field>
                            <Form.Field>
                                <Input focus labelPosition="rigth corner" placeholder='Movil...'
                                name="movil" value={this.state.movil.value} onChange={this.cambiarEstado}/>
                                {this.state.movil.valid ? null : this.mostrarError("movil")}
                            </Form.Field>
                            <Form.Field>
                            <Button fluid color="teal" onClick={() => this.crearCliente()} >Guardar</Button>
                            </Form.Field>
                            <Form.Field>
                            <Button fluid color="teal" onClick={() => this.reiniciarFormulario()}>Reiniciar</Button>
                            </Form.Field>
                            <Form.Field>
                            <Button fluid color="teal" onClick={() => this.props.history.push('/Clientes')}>  Cancelar</Button>
                            </Form.Field>
                        </Segment>
                    </Form>
                </Grid.Column>     
           </Grid>
           
    )
    }
}
const mapStateToProps = state => {
    return {
                        sucursales: state.sucursal.sucursales
    }
}

const mapDispatchToProps = dispatch => {
    return {
                        cargarSucursales: sucursales => {
                        dispatch(actions.cargarSucursales(sucursales))
                    }
                    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AñadirCliente));
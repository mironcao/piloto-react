import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import { Form, Checkbox, Button, Header, TextArea, Message, Input, Grid } from 'semantic-ui-react';
import axios from 'axios';
import Link from 'react-router-dom/Link';
import * as validator from '../Validadores/ValidadorImporte';
import * as estilo from '../css/Movimiento';

/*Constantes*/
const URL = 'http://localhost:8080/movimiento/?cuenta=';

class CreateMovimiento extends Component {

    constructor() {
        super();
        this.state = {
            tipo:{
                value:null,
                valid:true
            },
            descripcion: {
             value:  "",
             valid: true
            },
            importe:{
             value: null,
             valid: true
            }
        }
    }

    crearMovimiento = () => {
        if(validator.validarImporte(this.state.importe.value) && 
            this.comprobarTipo() && this.state.descripcion.value!==""){
            axios.post(URL + this.props.numeroCuenta, 
                {importe: this.state.importe.value, tipo: this.state.tipo.value, 
                descripcion: this.state.descripcion.value, usuario: 'pepe'})
                .then(function (response){
                    console.log(response);
                })
                .then(response => this.props.history.push('/misMovimientos') )
                .catch(function (error){
                    console.log(error);
            })
        }
        else{
           this.actualizarEstados();
        }
    }
    
    handleChange = (e, { value }) => {
        this.setState({tipo:{
            value: value,
            valid: true
            }
        });
    }

    actualizaImporte= (event) => {
        if(!validator.validarImporte(event.target.value)){
            this.setState({importe:{
                    value: event.target.value,
                    valid: false
                }
            });
        }
        else{
            this.setState({importe:{
                value: event.target.value,
                valid: true
                }
            });
            this.comprobarTipo();
        }
    }

    actualizaDescripcion= (event) => {
        if(event.target.value==="" || event.target.value.length > 60){
            this.setState({descripcion:{
                    value: event.target.value,
                    valid: false
                }
            });
        }
        else{
            this.setState({descripcion:{
                value: event.target.value,
                valid: true
                }
            });
            this.comprobarTipo();
        }
    }

    comprobarTipo(){
        if(this.state.tipo.value!=null){
            this.setState({tipo:{
                value: this.state.tipo.value,
                valid: true
                }
            });
            return true;
        }
        else{
            this.setState({tipo:{
                value: this.state.tipo.value,
                valid: false
                }
            });
            return false;
        }
    }

    printImportError(){
        return(
            <Message negative>
                <Message.Header>Error</Message.Header>
                <p>El importe debe tener el formato correcto</p>
            </Message>
        );
    }

    actualizarEstados(){
        if(!validator.validarImporte(this.state.importe.value)){
            this.setState({importe:{
                value: null,
                valid: false
            }
        });
        }
        if(!this.state.descripcion.value!==""){
            this.setState({descripcion:{
                value: null,
                valid: false
            }
        });
        }
    }

    printDescriptionError(){
        return(
            <Message negative>
                <Message.Header>Error</Message.Header>
                <p>La descripcion no puede ser vacía</p>
            </Message>
        );
    }

    printTipoError(){
        return(
            <Message negative>
                <Message.Header>Error</Message.Header>
                <p>Debe seleccionarse un tipo de movimiento</p>
            </Message>
        );
    }

    render() {
        return (
            <div style={estilo.align}>
                <Header color="teal">CrearMovimiento</Header>
                <br/>
                <Grid textAlign = "center" style={{height:"100%"}} verticalAlign="middle">
                    <div className="ui segments">
                        <div className="ui segment">
                            <div className="ui input">
                            <Form>
                                <Input id='importe' type="text" placeholder="Importe €" onChange={this.actualizaImporte} />
                                {this.state.importe.valid ? null : this.printImportError()}                     
                            </Form>
                            </div>
                        </div>

                        <div className="ui segment">
                            <Form>
                                <Form.Field>
                                Tipo: <b>{this.state.value}</b>
                                </Form.Field>
                                <Form.Field>
                                <Checkbox
                                    radio
                                    label='Abono'
                                    name='checkboxRadioGroup'
                                    value='ABONO'
                                    checked={this.state.tipo.value === 'ABONO'}
                                    onChange={this.handleChange}
                                />
                                </Form.Field>
                                <Form.Field>
                                <Checkbox
                                    radio
                                    label='Cargo'
                                    name='checkboxRadioGroup'
                                    value='CARGO'
                                    checked={this.state.tipo.value === 'CARGO'}
                                    onChange={this.handleChange}
                                />
                                </Form.Field>
                                {this.state.tipo.valid ? null: this.printTipoError()}
                            </Form>
                        </div>
                        <div className="ui segment">
                            <Form>
                                <TextArea id='descripcion' placeholder='Descripción' style={{ minHeight: 100, width:400 }} 
                                    onChange={this.actualizaDescripcion}/>
                                {this.state.descripcion.valid ? null : this.printDescriptionError()}
                            </Form>
                        </div>

                        <div className="ui segment">
                            <Link to='/misMovimientos'>
                                <Button fluid>
                                    Cancelar
                                </Button>
                            </Link>
                            <br/>
                            <Button fluid color="teal" 
                                onClick={() => this.crearMovimiento()}>
                                Guardar
                            </Button>
                        </div>
                    </div>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      movimientos: state.bancoStore.movimientos,
      numeroCuenta: state.bancoStore.numeroCuenta
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
        cargarMovimientosAction: movimientos => {
        dispatch(actions.cargarMovimientosAction(movimientos))
        }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(CreateMovimiento);
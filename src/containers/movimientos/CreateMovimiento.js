import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import { Form, Checkbox, Button, Header, TextArea, Message, Input } from 'semantic-ui-react';
import axios from 'axios';
import Link from 'react-router-dom/Link';

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

    crearMovimiento = (cuenta) => {
        if(this.validarImporte(this.state.importe.value) && this.comprobarTipo() && this.state.descripcion.value!==""){
            axios.post('http://localhost:8080/movimiento/?cuenta='+cuenta, {importe: this.state.importe.value,
                tipo: this.state.tipo.value, descripcion: this.state.descripcion.value, usuario: 'pepe'})
                .then(function (response){
                    console.log(response);
                })
                .then(response => this.props.history.push('/misMovimientos') )
                .catch(function (error){
                    console.log(error);
            })
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
        if(!this.validarImporte(event.target.value)){
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

    validarImporte(importe){
        var exprImp = /^([0-9]{1,15})(\.[0-9]{1,2})?$/;
        if(importe==null || !exprImp.test(importe)){
            return false;
        }
        return true;
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

    render() {
       var  msgImporte =  <Message negative>
                   <Message.Header>Error</Message.Header>
                   <p>El importe debe tener el formato correcto</p>
                   </Message>
        
        var msgDescripcion =  <Message negative>
                        <Message.Header>Error</Message.Header>
                        <p>La descripcion no puede ser vacía</p>
                        </Message>

        var msgTipo =  <Message negative>
                        <Message.Header>Error</Message.Header>
                        <p>Debe seleccionarse un tipo de movimiento</p>
                        </Message>

        return (
            <div>
                <Header>CrearMovimiento</Header>
                <br/>
                <div>
                    <div className="ui segments">
                    <div className="ui segment">
                        <div className="ui input">
                        <Form>
                            <Input id='importe' type="text" placeholder="Importe €" onChange={this.actualizaImporte} />
                            {this.state.importe.valid ? null : msgImporte}                     
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
                        {this.state.tipo.valid ? null: msgTipo}
                    </Form>
                    
                    </div>
                    <div className="ui segment">
                        <Form>
                            <TextArea id='descripcion' placeholder='Descripción' style={{ minHeight: 100, width:400 }} 
                                onChange={this.actualizaDescripcion}/>
                            {this.state.descripcion.valid ? null : msgDescripcion}
                        </Form>
                    </div>
                    </div>
                    <div>
                        <Button.Group>
                            <Link to='/misMovimientos'>
                                <Button>
                                    Cancelar
                                </Button>
                            </Link>
                            <Button.Or />
                            <Button positive 
                                onClick={() => this.crearMovimiento('6182057801123304201775953')}>
                                Guardar
                            </Button>
                        </Button.Group>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      movimientos: state.movimientos
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
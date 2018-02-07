import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import { Form, Checkbox, Button, Header } from 'semantic-ui-react';
import axios from 'axios';

class CreateMovimiento extends Component {

    constructor() {
        super();
        this.state = {value:null, descripcion:null,
             importe:0}
    }

    crearMovimiento = (cuenta) => {
        axios.post('http://localhost:8080/movimiento/?cuenta='+cuenta, {importe: this.state.importe,
            tipo: this.state.value, descripcion: this.state.descripcion, usuario: 'pepe'})
            .then(function (response){
                console.log(response);
            })
            .catch(function (error){
                console.log(error);
            })
    }
    
    handleChange = (e, { value }) => this.setState({ value })

    actualizaImporte= (event) => {
        this.setState({importe:event.target.value});
    }

    actualizaDescripcion= (event) => {
        this.setState({descripcion:event.target.value});
    }

    render() {
        return (
            <html>
                <Header>CrearMovimiento</Header>
                <br/>
                <div className="mov">
                    <div class="ui segments">
                    <div class="ui segment">
                        <div class="ui input">
                            <input type="text" placeholder="Importe" onChange={this.actualizaImporte} />
                            <div class="ui basic label">€</div>
                        </div>
                    </div>
                    <div class="ui segment">

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
                            checked={this.state.value === 'ABONO'}
                            onChange={this.handleChange}
                        />
                        </Form.Field>
                        <Form.Field>
                        <Checkbox
                            radio
                            label='Cargo'
                            name='checkboxRadioGroup'
                            value='CARGO'
                            checked={this.state.value === 'CARGO'}
                            onChange={this.handleChange}
                        />
                        </Form.Field>
                    </Form>
                    
                    </div>
                    <div class="ui segment"> 
                        <input type="text" placeholder="Descripcion" onChange={this.actualizaDescripcion}/>
                    </div>
                    </div>
                    <div>
                        <Button 
                            href="http://localhost:3000/misMovimientos">
                            Cancelar
                        </Button>

                        <Button 
                            href="http://localhost:3000/misMovimientos"
                            onClick={() => this.crearMovimiento('6182057801123304201775953')}>
                            Guardar
                        </Button>
                    </div>
                </div>
            </html>
        );
    }
}

const mapStateToProps = state => {
    return {
      test: state.test,
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      ejemplo: data => {
        dispatch(actions.ejemploAction)
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(CreateMovimiento);
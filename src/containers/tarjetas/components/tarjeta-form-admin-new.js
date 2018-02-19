import React, { Component } from 'react';
import { Table, Button, Input } from 'semantic-ui-react';
import { addTarjeta as addTarjetaAction } from "../actions/tarjetas-actions";
import axios from 'axios';
import { connect } from 'react-redux';

const URL = 'http://localhost:8080/tarjetas';

class TarjetaFormAdminNew extends Component {

    state = {
        numeroCuenta: {
            value: "",
            valid: true,
            touched: false
        },
        dni: {
            value: "",
            valid: true,
            touched: false
        },
        valid: true,
        mensaje: ''
    }


    onChangeCuentaHandler = (event) => {
        let valid = event.target.value.trim(" ") !== "";
        const formValid = this.validateForm();
        this.setState({
            numeroCuenta: {
                value: event.target.value,
                touched: true,
                valid: valid
            },
            valid: formValid
        });
    }

    onChangeDniHandler = (event) => {
        let valid = event.target.value.trim(" ") !== "";
        const formValid = this.validateForm();
        this.setState({
            dni: {
                value: event.target.value,
                touched: true,
                valid: valid
            },
            valid: formValid
        });
    }

    validateForm = () => {
        let valid = true;
        for (let prop in this.state) {
            if (prop !== "valid")
                valid = this.state[prop].valid && this.state[prop].touched && valid;
        }
        return valid;
    }


    newTarjetaRow = () => {
        return (
            <Table.Row key='123'>
                <Table.Cell><Button negative size='tiny'>Cancelar</Button></Table.Cell>
                <Table.Cell><Button positive size='small' onClick={this.submit}>Confirmar</Button></Table.Cell>
                <Table.Cell>
                    <Input focus fluid placeholder='Introduza el nº de cuenta' error={!this.state.numeroCuenta.valid}
                        onChange={this.onChangeCuentaHandler} value={this.state.numeroCuenta.value} />
                </Table.Cell>
                <Table.Cell>
                    <Input focus fluid placeholder='Introduza el DNI del titular' error={!this.state.dni.valid}
                        onChange={this.onChangeDniHandler} value={this.state.dni.value} />
                </Table.Cell>
            </Table.Row>
        )
    }

    submit = () => {
        const dto = {
          dni: this.state.dni.value,
          numeroCuenta: this.state.numeroCuenta.value
        };
        axios.post(URL, dto)
          .then(response => {
            this.props.addTarjeta(response.data)
            this.setState({mensaje: 'Tarjeta añdida correctamente'})
            console.log(this.state.mensaje);
          })
      }


    render() {
        return this.newTarjetaRow();
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTarjeta: (tarjeta) => {
            dispatch(addTarjetaAction(tarjeta))
        }
    }
}
export default connect(null, mapDispatchToProps)(TarjetaFormAdminNew);
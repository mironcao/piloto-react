import React, { Component } from 'react';
import { Table, Button, Input, Message } from 'semantic-ui-react';
import * as actions from '../../../../store/actions';
import { connect } from 'react-redux';
import axios from 'axios';

class EditItemSucursal extends Component {
    state = {
        nombre: {
            value: "",
            valid: true,
            touched: false
        },
        direccion: {
            value: "",
            valid: true,
            touched: false
        },
        valid:true
    }

    onChangeNombreHandler = (event) => {
        const nombre = this.state.nombre;
        let valid = event.target.value.trim(" ") !== "";
        this.setState({
            nombre: {
                value: event.target.value,
                touched: true,
                valid: valid
            }
        });
    }

    onChangeDireccionHandler = (event) => {
        const direccion = this.state.direccion;
        let valid = event.target.value.trim(" ") !== "";
        this.setState({
            direccion: {
                value: event.target.value,
                touched: true,
                valid: valid
            }
        });
    }

    validateForm = () => {
       let valid = true;
        for(let prop of this.state){
            valid = prop.valid && prop.touched && valid;
        }
        this.setState({
            valid: valid
        });
    }

    guardarSucursalHandler = () => {
        const dto = {
            id: null,
            nombre: this.state.nombre.value,
            direccion: this.state.direccion.value,
            usuario: "user1"
        };
       if(this.state.valid){
           axios.post("http://localhost:8080/sucursal/", dto)
           .then((response) => {
                this.props.addSucursal(response.data);
           })
       }
    }

    cancelarHandler = () => {
        this.props.showEditHandler(false);
    }

    render() {
        const message = <Message error header='Campo no puede ser vacio'/>;
        return (
            <Table.Row>
                <Table.Cell>
                    <Input fluid error={!this.state.nombre.valid} 
                    onChange={this.onChangeNombreHandler} value={this.state.nombre.value}></Input>
                    {this.state.nombre.valid?null:message}
                </Table.Cell>
                <Table.Cell>
                    <Input fluid error={!this.state.direccion.valid} onChange={this.onChangeDireccionHandler} value={this.state.direccion.value}></Input>
                    {this.state.direccion.valid?null:message}
                </Table.Cell>
                <Table.Cell textAlign='right'>
                    <Button color='blue' onClick={this.guardarSucursalHandler}>Guardar</Button>
                    <Button color='red' onClick={this.cancelarHandler}>Cancelar</Button>
                </Table.Cell>
            </Table.Row>
        );
    };
}

const mapStateToProps = state => {
    return {
        sucursal: state.sucursal,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSucursal: (sucursal) => dispatch(actions.addSucursal(sucursal)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItemSucursal);
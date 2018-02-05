import React, { Component } from 'react';
import { Table, Button, Input } from 'semantic-ui-react';
import * as actions from '../../../../store/actions';
import { connect } from 'react-redux';

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
        }
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

    guardarSucursalHandler = () => {
        let valid = true;
        for(let prop in this.state){
            valid = prop.valid && valid;
        }
        if(valid){
        }
    }

    render() {
        return (
            <Table.Row>
                <Table.Cell>
                    <Input error={!this.state.nombre.valid} onChange={this.onChangeNombreHandler}>{this.props.nombre ? this.props.nombre : null}</Input>
                </Table.Cell>
                <Table.Cell>
                    <Input error={!this.state.direccion.valid} onChange={this.onChangeDireccionHandler}>{this.props.direccion ? this.props.direccion : null}</Input>
                </Table.Cell>
                <Table.Cell textAlign='right'>
                    <Button color='blue' onClick={this.guardarSucursalHandler}>Guardar</Button>
                    <Button color='red'>Cancelar</Button>
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
        addSucursal: (sucursal) => dispatch(actions.addSucursal(sucursal))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItemSucursal);
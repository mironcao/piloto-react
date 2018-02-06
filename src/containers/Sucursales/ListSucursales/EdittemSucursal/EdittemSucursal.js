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
        for (let prop in this.state) {
            valid = this.state[prop].valid && this.state[prop].touched && valid;
        }
        console.log(valid);
        if (valid) {
            const dto = {
                id: null,
                nombre: this.state.nombre.value,
                direccion: this.state.direccion.value,
                usuario: 'User1'
            }
            axios.post("http://localhost:8080/sucursal/", dto).then((response) => {
                this.props.addSucursal(response.data);
            })
            this.setState({
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
            });
            this.props.toggleAddSucursalHandler();
        } else{
            this.setState({
                nombre: {
                    value: "",
                    valid: false,
                    touched: true
                },
                direccion: {
                    value: "",
                    valid: false,
                    touched: true
                }
            });
        }
    }

    cancelarHandler = () => {
        this.props.toggleAddSucursalHandler();
    }

    render() {
        const message = <Message error header='Campo no puede ser vacio'/>
        return (
            <Table.Row>
                <Table.Cell>
                    <Input fluid error={!this.state.nombre.valid} 
                    onChange={this.onChangeNombreHandler}>{this.props.nombre ? this.props.nombre : null}</Input>
                    {this.state.nombre.valid?null:message}
                </Table.Cell>
                <Table.Cell>
                    <Input fluid error={!this.state.direccion.valid} onChange={this.onChangeDireccionHandler}>{this.props.direccion ? this.props.direccion : null}</Input>
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
        toggleAddSucursalHandler: () => dispatch(actions.toggleAddSucursalHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItemSucursal);
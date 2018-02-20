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
        }, valid: true
    }

    onChangeNombreHandler = (event) => {
        let valid = event.target.value.trim(" ") !== "";
        const formValid = this.validateForm();
        this.setState({
            nombre: {
                value: event.target.value,
                touched: true,
                valid: valid
            },
            valid: formValid
        });
    }

    onChangeDireccionHandler = (event) => {
        let valid = event.target.value.trim(" ") !== "";
        const formValid = this.validateForm();
        this.setState({
            direccion: {
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

    onGuardarHandler = () => {
        if (this.props.sucursal.editSucursal) {
            this.actualizarSucursalHandler();
        } else {
            this.guardarSucursalHandler();
        }
    }

    actualizarSucursalHandler = () => {
        const dto = {
            id: this.props.sucursal.toBeEditted.id,
            nombre: this.state.nombre.value,
            direccion: this.state.direccion.value,
            usuario: "user1"
        };
        if (this.state.valid) {
            axios.put("http://localhost:8080/sucursal/" + this.props.sucursal.toBeEditted.id, dto)
                .then((response) => {
                    this.props.updateSucursal(this.state.nombre.value, this.state.direccion.value);
                    this.props.showEditHandler(false);
                    this.props.paginate();
                })
        }
    }

    guardarSucursalHandler = () => {
        const dto = {
            id: null,
            nombre: this.state.nombre.value,
            direccion: this.state.direccion.value,
            usuario: "user1"
        };
        if (this.state.valid) {
            axios.post("http://localhost:8080/sucursal/", dto)
                .then((response) => {
                    this.props.addSucursal(response.data);
                    this.props.showEditHandler(false);
                    this.props.paginate();
                })
        }
    }

    cancelarHandler = () => {
        this.props.showEditHandler(false);
    }

    componentDidMount() {
        this.setState({
            nombre: {
                value: this.props.sucursal.toBeEditted.nombre,
                touched: true,
                valid: true
            },
            direccion: {
                value: this.props.sucursal.toBeEditted.direccion,
                touched: true,
                valid: true
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            nombre: {
                value: nextProps.sucursal.toBeEditted.nombre,
                touched: true,
                valid: true
            },
            direccion: {
                value: nextProps.sucursal.toBeEditted.direccion,
                touched: true,
                valid: true
            }
        })
    }

    render() {
        const message = <Message size='tiny' attached='top' error content='Campo no puede ser vacio' />;
        return (
            <Table.Row>
                <Table.Cell>
                    <Input maxLength="15" fluid error={!this.state.nombre.valid}
                        onChange={this.onChangeNombreHandler} value={this.state.nombre.value}>{}</Input>
                    {this.state.nombre.valid ? null : message}
                </Table.Cell>
                <Table.Cell>
                    <Input maxLength="50" fluid error={!this.state.direccion.valid} onChange={this.onChangeDireccionHandler} value={this.state.direccion.value}></Input>
                    {this.state.direccion.valid ? null : message}
                </Table.Cell>
                <Table.Cell className="options">
                    <Button className="option-buttons" color='blue' onClick={this.onGuardarHandler}>Guardar</Button>
                    <Button className="option-buttons" color='red' onClick={this.cancelarHandler}>Cancelar</Button>
                </Table.Cell>
            </Table.Row>
        );
    };
}

const mapStateToProps = state => {
    return {
        sucursal: state.bancoStore.sucursal,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addSucursal: (sucursal) => dispatch(actions.addSucursal(sucursal)),
        updateSucursal: (nombre, direccion) => dispatch(actions.updateSucursal(nombre, direccion))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditItemSucursal);
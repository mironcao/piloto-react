import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import Table from './TablaEmpleado';
import axios from 'axios';
import { Header, Container } from 'semantic-ui-react';

class Empleado extends Component {

    state = {
        empleadosCargados: false
    }

    componentDidMount() {
        axios.get('http://localhost:8080/empleado/').then(response => {
            this.props.cargarEmpleados(response.data); 
            this.setState({empleadosCargados: true});
        })
    }

    render() {
        return (
            <Container style={{ marginTop: '3em', marginBottom: '3em' }}>
                <Header as='h1' textAlign='center' color='teal'>Empleados</Header>
                {this.state.empleadosCargados ? <Table empleados={this.props.empleados}/> : null}
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        empleados: state.bancoStore.empleados,
    }
  }

const mapDispatchToProps = dispatch => {
    return {
        cargarEmpleados: empleados => dispatch(actions.cargarEmpleados(empleados))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Empleado);
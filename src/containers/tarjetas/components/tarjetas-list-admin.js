import React, { Component } from 'react';
import { connect } from "react-redux";
import { Button, Checkbox, Icon, Table, Pagination, Input } from 'semantic-ui-react';
import TarjetaCard from "./tarjeta-card";
import TarjetaFormAdminNew from './tarjeta-form-admin-new';
import { deleteTarjetas as deleteTarjetasAction } from "../actions/tarjetas-actions";
import axios from "axios";

const URL = 'http://localhost:8080/tarjetas';

class TarjetasListAdmin extends Component {
  state = {
    newTarjeta: {
      numeroCuenta: '',
      dni: ''
    },
    newTarjetaRowVisibility: false,
    exported: true,
    numberOfPages: 0,
    pageSize: 5,
    activePage: 1,
    tarjetasPaginadas: [],
    tarjetasEliminadas: []
  }

  componentDidMount() {
    this.paginate(1);
  }

  onChangeHandle = (tarjeta) => {
    let tj = this.state.tarjetasEliminadas.find(e=> e === tarjeta.numeroTarjeta);
    if(tj === undefined) {
      this.setState({tarjetasEliminadas: [...this.state.tarjetasEliminadas,tarjeta.numeroTarjeta]});
    }
    else{
      let tjs = this.state.tarjetasEliminadas.filter(e=> e !== tarjeta.numeroTarjeta);
      this.setState({tarjetasEliminadas: tjs}) 
    }


  }

  tarjetasRows = () => {
    return this.state.tarjetasPaginadas.map(tarjeta => {
      return (
        <Table.Row key={tarjeta.numeroTarjeta}>
          <Table.Cell collapsing>
            <Checkbox slider onChange={() =>this.onChangeHandle(tarjeta)}/>
          </Table.Cell>
          <Table.Cell>{tarjeta.numeroTarjeta}</Table.Cell>
          <Table.Cell>{tarjeta.numeroCuenta}</Table.Cell>
          <Table.Cell>{tarjeta.dniTitular}</Table.Cell>
        </Table.Row>
      )
    })
  }


  paginate = (pageNumber) => {
    let numberOfPages = Math.floor(this.props.tarjetas.length / this.state.pageSize); 
    if (this.props.tarjetas.length % this.state.pageSize !== 0) 
      numberOfPages = numberOfPages + 1;
    const initIndex = (pageNumber - 1) * this.state.pageSize;
    const endIndex = initIndex + this.state.pageSize;
    const tarjetasPaginadas = this.props.tarjetas.filter((sucursal, index) => index >= initIndex && index < endIndex);
    this.setState({
        tarjetasPaginadas: tarjetasPaginadas,
        numberOfPages: numberOfPages,
        activePage: pageNumber
    });
  }

  eliminarTarjetas = () => {
    let ts = {
      numeroTarjetas: this.state.tarjetasEliminadas
    };
    
    axios.put(`${URL}/delete`,ts)
      .then(response => {
        this.props.deleteTarjetas(this.state.tarjetasEliminadas);
        this.setState({tarjetasEliminadas:[]});
        this.paginate(1);
      })
      .catch(error => {
      })
  }

  render() {
    return (
      <Table color='teal'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Nº de tarjeta</Table.HeaderCell>
            <Table.HeaderCell>Nº de cuenta</Table.HeaderCell>
            <Table.HeaderCell>DNI de propietario</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.newTarjetaRowVisibility == true && <TarjetaFormAdminNew />}
          {this.tarjetasRows()}
        </Table.Body>
        <Table.Footer fullWidth>
          <Table.Row>
            <Table.HeaderCell colSpan='4'>
              <Pagination
                activePage={this.state.activePage}
                totalPages={this.state.numberOfPages}
                onPageChange={(event, data) => this.paginate(data.activePage)} />
              <Button negative size='small' onClick={this.eliminarTarjetas}>Eliminar tarjeta(s)</Button>
              <Button floated='right' icon labelPosition='left' primary size='small'
                onClick={() => {
                  let aux = !this.state.newTarjetaRowVisibility;
                  this.setState({ newTarjetaRowVisibility: aux })
                }}>
                <Icon name='credit card' /> Crear tarjeta
              </Button>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteTarjetas: tarjetas => {
      dispatch(deleteTarjetasAction(tarjetas))
    }
  }
}

export default connect(null, mapDispatchToProps)(TarjetasListAdmin)
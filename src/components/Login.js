import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../store/actions';

class LoginPage extends React.Component {

  state = {
    dni:""
  }

  login=()=> {
    axios.get('http://localhost:8080/clientes/buscarCliente/' + this.state.dni).then(response => {
      console.log("fueradelif", response.data)
      if(response.data.nombre!==null) { 
        this.props.pasarUser(response.data);   
        this.props.history.push('/misCuentas')
      }
      })
  }

  actualizarDni=(event)=>  {
    this.setState({dni:event.target.value});
  }

  render() {
    return (
      <div className='login-form'>
      <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style>
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>
            {' '}Iniciar sesión
          </Header>
          <Form size='large'>
            <Segment stacked>
              <Form.Input onChange={this.actualizarDni}
                fluid
                icon='user'
                iconPosition='left'
                placeholder='DNI/NIE/NIF'
              />
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Contraseña'
                type='password'
              />
  
              <Button color='teal' fluid size='large' onClick={this.login}>Login</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
    );
  }
}
const mapStateToProps = state => {
	return {
		user:state.user
	}
}

const mapDispatchToProps = dispatch => {
	return {
		pasarUser: user => {
			dispatch(actions.pasarUser(user))}
	}
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps) (LoginPage));
import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

class LoginPage extends React.Component {

  state = {
    dni: "",
    password: "",
    error: false,
  }

  login = () => {
    if (this.state.dni !== "" && this.state.password !== "") {
      axios.post('http://localhost:8080/login/',
        { dni: this.state.dni, password: this.state.password }).then(response => {
          if (response.data.nombre !== null) {
            this.props.pasarUser(response.data);
            this.props.history.push('/misCuentas')
          } else
            this.setState({ error: true })
        }).catch(error => this.setState({ error: true }))
    }
  }

  actualizarDni = (event) => {
    this.setState({ dni: event.target.value });
  }

  actualizarPassword = (event) => {
    this.setState({ password: event.target.value });
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
                  placeholder='NIF/NIE'
                />
                <Form.Input onChange={this.actualizarPassword}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Contraseña'
                  type='password'
                />
                {this.state.error ? <p style={{color:"#FF0000"}}>El usuario o contraseña es incorrecto</p> : null}
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
		user:state.bancoStore.user
	}
}

const mapDispatchToProps = dispatch => {
  return {
    pasarUser: user => {
      dispatch(actions.pasarUser(user))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
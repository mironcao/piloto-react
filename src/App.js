import React, { Component } from 'react';
import './App.css';
import Banco from './containers/Banco/Banco';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react';
import LoginPage from './components/Login';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    return this.props.user !== null ? <Route path='/' component={Banco} /> : 
    <div><Route path='/login' component={LoginPage} /><Redirect to='/login' /></div>
  }
}

const mapStateToProps = state => {
  return {
    user: state.bancoStore.user
  }
}

export default withRouter(connect(mapStateToProps)(App));
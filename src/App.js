import React, { Component } from 'react';
import './App.css';
import Banco from './containers/Banco/Banco';
import { Route, Redirect, withRouter } from 'react-router-dom';
import LoginPage from './components/Login';
import { connect } from 'react-redux';

class App extends Component {
  render() {
    if (this.props.user !== null)
      return <Route path='/' component={Banco} />
    else if (this.props.user === null && this.props.history.location.pathname !== "/login"){
      return (<div>
        <Route path='/login' component={LoginPage} />
        <Redirect to='/login' />
      </div>)
    } else {
      return <Route path='/login' component={LoginPage} />
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.bancoStore.user
  }
}

export default withRouter(connect(mapStateToProps)(App));

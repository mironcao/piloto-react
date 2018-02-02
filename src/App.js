import React, { Component } from 'react';
import './App.css';
import Banco from './containers/Banco/Banco';
import { Route, Switch } from 'react-router-dom';
import Transferencias from './containers/Banco/Transferencias';
import ListarTransferencias from './containers/Banco/ListarTransferencias';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
            <Route path="/ListarTransferencias" component={ListarTransferencias}/>
            <Route path="/Banco" component={Banco} />
            <Route path="/Transferencias" component={Transferencias}/>
          </Switch>
      </div>
    );
  }
}

export default App;

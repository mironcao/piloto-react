import React, { Component } from 'react';
import './App.css';
import Banco from './containers/Banco/Banco';

import MisCuentas from './containers/Banco/MisCuentas';

import { Route, Switch } from 'react-router-dom';
import Sucursales from './containers/Sucursales/Sucursales';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
            <Route path="/sucursal" exact component={Sucursales}/>
            <Route path="/" component={Banco} />
            <Route path="/" component={MisCuentas} />
          </Switch>
      </div>
    );
  }
}

export default App;

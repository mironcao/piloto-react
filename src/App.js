import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import './App.css';
import MisMovimientos from './containers/movimientos/MisMovimientos';
import CreateMovimiento from './containers/movimientos/CreateMovimiento';
import MisCuentas from './containers/Banco/MisCuentas';
import { Sidebar, Segment, Menu, Icon } from 'semantic-ui-react'
import GestionTitulares from './containers/titulares/GestionTitulares';


class App extends Component {
  render() {
    return (
      <div>
        {/* <Button onClick={this.toggleVisibility}>Toggle Visibility</Button> */}
        <Sidebar.Pushable as={Segment}>
          <Sidebar as={Menu} width='thin' visible icon='labeled' vertical inverted>
            <Link to="/miscuentas">
            <Menu.Item>
              <Icon name='money' />
              Mis cuentas
            </Menu.Item>
            </Link>
            <Link to="/misMovimientos">
            <Menu.Item>
              <Icon name='exchange' />
              Mis movimientos
            </Menu.Item>
            </Link>
            <Link to="/CrearMovimiento">
            <Menu.Item>
              <div>
              <Icon.Group size='big'>
                <Icon name='exchange' />
                <Icon corner name='add' color='green' />
              </Icon.Group>
              </div>
              Crear movimiento
            </Menu.Item>
            </Link>
            <Link to="/titulares">
            <Menu.Item>
              <Icon name='users' />
              Titulares
            </Menu.Item>
            </Link>
          </Sidebar>
          <Sidebar.Pusher>
            <Segment basic className="grande" >
                <Switch>
                  <Route path="/miscuentas" component={MisCuentas} />
                  <Route path="/misMovimientos" component={MisMovimientos} />
                  <Route path="/CrearMovimiento" component={CreateMovimiento} />
                  <Route path="/titulares" component={GestionTitulares} />
                </Switch>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button, Grid } from 'semantic-ui-react'

export default class AppMenu extends Component {

    render() {
        return(
            <div>
            <Grid centered verticalAlign='middle'><Grid.Row verticalAlign='middle'>
                <Button.Group>
                    <Link to="/miscuentas">
                        <Button>Mis cuentas</Button>
                    </Link>
                    <Button.Or />
                    <Link to="/misMovimientos">
                        <Button>Mis movimientos</Button>
                    </Link>
                    <Button.Or />
                    <Link to="/CrearMovimiento">
                        <Button>Crear movimiento</Button>
                    </Link>
                </Button.Group>
            </Grid.Row></Grid>
            </div>
        )
    }
}

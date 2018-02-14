import React, { Component } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';

class TarjetaForm extends Component {
  renderField = ({
    input,
    label,
    type,
    meta: { touched, error}
  }) => (
    <Form.Field className={classnames({
      error:touched && error
    })}>
      <label>{label}</label>
      <input {...input} placeholder={label} type={type}/>
      {touched && error && <span className="error">{error.message}</span>}
    </Form.Field>
  )

  render() {
    const { handleSubmit, pristine, submitting, loading } = this.props;

    return (
      <Grid>
        <Grid.Column>
          <h1 style={{marginTop:"1em"}}>Crear una nueva tarjeta</h1>
          <Form onSubmit={handleSubmit} loading={loading}>
            <Field name="numeroCuenta" type="text" component={this.renderField} label="Numero de cuenta"/>
            <Button primary type='submit' disabled={pristine || submitting}>Crear</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

const validate = (values) => {

  const errors={};

  if(!values.numeroCuenta) {
    errors.dniTitular = {
      message : 'Necesita proporcionar el DNI del nuevo titular'
    }
  }

  return errors
}

export default reduxForm({form: 'tarjeta', validate})(TarjetaForm);

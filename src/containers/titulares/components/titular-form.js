import React, { Component } from 'react';
import { Form, Grid, Button } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import classnames from 'classnames';

class TitularForm extends Component {
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
      <Grid centered columns={2}>
        <Grid.Column>
          <h1 style={{marginTop:"1em"}}>Add New Titular</h1>
          <Form onSubmit={handleSubmit} loading={loading}>
            <Field name="dniTitular" type="text" component={this.renderField} label="DNI"/>
            <Button primary type='submit' disabled={pristine || submitting}>Save</Button>
          </Form>
        </Grid.Column>
      </Grid>
    )
  }
}

const validate = (values) => {

  const errors={};

  if(!values.dniTitular) {
    errors.dniTitular = {
      message : 'Necesita proporcionar el DNI del nuevo titular'
    }
  }
  else if(!dniTest(values.dniTitular)) {
      errors.dniTitular = {
        message : 'Error de validacion'
      } 
  }

  return errors
}

const dniTest = (dni) => {
  let validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
      let Rexp = /^[0-9XYZ][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/i;
      let str = dni.toString().toUpperCase();

      if (!Rexp.test(str)) return false;     

      let nie = str
        .replace(/^[X]/, '0')
        .replace(/^[Y]/, '1')
        .replace(/^[Z]/, '2');

      let letter = str.substr(-1);
      let charIndex = parseInt(nie.substr(0, 8),0) % 23;

      if (validChars.charAt(charIndex) === letter) return true;

      return false;
}

export default reduxForm({form: 'titular', validate})(TitularForm);

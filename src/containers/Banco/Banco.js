import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from "../../store/actions";
import Button from '../../components/Prueba';

class Banco extends Component {
    render() {
        return (
            <div>
                <p>Prueba</p>
                <Button nombre="Test"></Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
      test: state.test,
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      ejemplo: data => {
        dispatch(actions.ejemploAction)
      }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Banco);
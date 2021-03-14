import React, { Component } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';

import { auth } from '../../store/actions';
import { Button, Input } from '../../components/shared';

import styles from './styles.module.css';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your email',
          autoComplete: 'username'
        },
        value: '',
        isValid: false,
        validation: {
          required: true,
          isEmail: true
        },
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Your password',
          autoComplete: 'current-password'
        },
        value: '',
        isValid: false,
        validation: {
          required: true,
          minLength: 6
        },
        touched: false
      }
    },
    formIsValid: false,
    isSignUp: true
  };

  checkInputValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = !_.isEmpty(value) && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      isValid = _.isNumeric(value) && isValid;
    }

    return isValid;
  };

  setOverallFormValidity = () =>
    this.setState(prevState => ({
      formIsValid: _.every(prevState.controls, 'isValid')
    }));

  onInputChange = (event, fieldName) => {
    const { value } = event.target;

    this.setState(prevState => {
      const fieldIsValid = this.checkInputValidity(
        value,
        prevState.controls[fieldName].validation
      );

      return {
        controls: {
          ...prevState.controls,
          [fieldName]: {
            ...prevState.controls[fieldName],
            value,
            touched: true,
            isValid: fieldIsValid
          }
        }
      };
    }, this.setOverallFormValidity);
  };

  switchAuthMode = () =>
    this.setState(prevState => ({ isSignUp: !prevState.isSignUp }));

  handleSubmit = event => {
    event.preventDefault();

    const {
      controls: { email, password },
      isSignUp
    } = this.state;

    this.props.onAuth(email.value, password.value, isSignUp);
  };

  render() {
    const { controls, formIsValid, isSignUp } = this.state;

    const authModeButtonText = isSignUp
      ? 'Already have an account? Log in!'
      : 'Create an account';

    const submitButtonText = isSignUp ? 'Sign up' : 'Log in';

    return (
      <div className={styles.auth}>
        <form onSubmit={this.handleSubmit}>
          {_.map(controls, ({ validation, ...inputProps }, fieldName) => (
            <Input
              key={fieldName}
              shouldValidate={!_.isNil(validation)}
              onChange={event => this.onInputChange(event, fieldName)}
              {...inputProps}
            />
          ))}

          <Button type="success" disabled={!formIsValid}>
            {submitButtonText}
          </Button>
        </form>
        <Button type="danger" onClick={this.switchAuthMode}>
          {authModeButtonText}
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignUp) =>
    dispatch(auth(email, password, isSignUp))
});

export default connect(null, mapDispatchToProps)(Auth);

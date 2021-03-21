import React, { useState, useEffect } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { checkInputValidity } from '../../utils';
import { auth, setAuthRedirectPath } from '../../store/actions';
import { Button, Input, Spinner } from '../../components/shared';

import styles from './styles.module.css';

const Auth = ({
  isBuildingBurger,
  authRedirectPath,
  onSetAuthRedirectPath,
  onAuth,
  isAuthenticated,
  loading,
  error
}) => {
  const [authForm, setAuthForm] = useState({
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
  });

  const [formIsValid, setFormIsValid] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    if (!isBuildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [isBuildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const onInputChange = (event, fieldName) => {
    const { value } = event.target;

    const fieldIsValid = checkInputValidity(
      value,
      authForm[fieldName].validation
    );

    const updatedAuthForm = {
      ...authForm,
      [fieldName]: {
        ...authForm[fieldName],
        value,
        touched: true,
        isValid: fieldIsValid
      }
    };

    setAuthForm(updatedAuthForm);
    setFormIsValid(_.every(updatedAuthForm, 'isValid'));
  };

  const switchAuthMode = () => setIsSignUp(!isSignUp);

  const handleSubmit = event => {
    event.preventDefault();

    const { email, password } = authForm;
    onAuth(email.value, password.value, isSignUp);
  };

  const authModeButtonText = isSignUp
    ? 'Already have an account? Log in!'
    : 'Create an account';

  const submitButtonText = isSignUp ? 'Sign up' : 'Log in';

  if (isAuthenticated) {
    return <Redirect to={authRedirectPath} />;
  }

  return (
    <div className={styles.auth}>
      {error && <p>{error.message}</p>}
      {loading && <Spinner />}
      {!loading && (
        <>
          <form onSubmit={handleSubmit}>
            {_.map(authForm, ({ validation, ...inputProps }, fieldName) => (
              <Input
                key={fieldName}
                shouldValidate={!_.isNil(validation)}
                onChange={event => onInputChange(event, fieldName)}
                {...inputProps}
              />
            ))}

            <Button type="success" disabled={!formIsValid}>
              {submitButtonText}
            </Button>
          </form>
          <Button type="danger" onClick={switchAuthMode}>
            {authModeButtonText}
          </Button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({
  auth: { token, error, loading, authRedirectPath },
  burgerBuilder: { building }
}) => ({
  isAuthenticated: !_.isNull(token),
  error,
  loading,
  authRedirectPath,
  isBuildingBurger: building
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignUp) =>
    dispatch(auth(email, password, isSignUp)),
  onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

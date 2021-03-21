import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { initiateLogout } from '../../../store/actions';

const Logout = ({ initiateLogout }) => {
  useEffect(() => {
    initiateLogout();
  }, []);

  return <Redirect to="/" />;
};

const mapDispatchToProps = dispatch => ({
  initiateLogout: () => dispatch(initiateLogout())
});

export default connect(null, mapDispatchToProps)(Logout);

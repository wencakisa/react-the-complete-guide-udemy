import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { initiateLogout } from '../../../store/actions';

class Logout extends Component {
  componentDidMout() {
    this.props.initiateLogout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => ({
  initiateLogout: dispatch(initiateLogout())
});

export default connect(null, mapDispatchToProps)(Logout);

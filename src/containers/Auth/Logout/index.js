import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logout } from '../../../store/actions';

class Logout extends Component {
  componentDidMout() {
    this.props.logout();
  }

  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => ({ logout: dispatch(logout()) });

export default connect(null, mapDispatchToProps)(Logout);

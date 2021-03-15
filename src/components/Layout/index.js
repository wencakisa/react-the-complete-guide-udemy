import React, { Component } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';

import Toolbar from '../Navigation/Toolbar';
import SideDrawer from '../Navigation/SideDrawer';

import styles from './styles.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  closeSideDrawer = () => this.setState({ showSideDrawer: false });

  toggleSideDrawer = () =>
    this.setState(prevState => ({
      showSideDrawer: !prevState.showSideDrawer
    }));

  render() {
    const { showSideDrawer } = this.state;
    const { isAuthenticated } = this.props;

    return (
      <>
        <Toolbar
          toggleSideDrawer={this.toggleSideDrawer}
          isAuthenticated={isAuthenticated}
        />
        <SideDrawer
          open={showSideDrawer}
          close={this.closeSideDrawer}
          isAuthenticated={isAuthenticated}
        />

        <main className={styles.content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = ({ auth: { token } }) => ({
  isAuthenticated: !_.isNull(token)
});

export default connect(mapStateToProps)(Layout);

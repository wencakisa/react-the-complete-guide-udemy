import React, { Component } from 'react';

import Toolbar from '../Navigation/Toolbar';
import SideDrawer from '../Navigation/SideDrawer';

import styles from './styles.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  closeSideDrawer = () => this.setState({ showSideDrawer: false });

  toggleSideDrawer = () =>
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));

  render() {
    const { showSideDrawer } = this.state;

    return (
      <>
        <Toolbar toggleSideDrawer={this.toggleSideDrawer} />
        <SideDrawer open={showSideDrawer} close={this.closeSideDrawer} />
        <main className={styles.content}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;

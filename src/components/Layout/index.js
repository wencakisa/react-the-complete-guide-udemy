import React, { useState } from 'react';

import _ from 'lodash';
import { connect } from 'react-redux';

import Toolbar from '../Navigation/Toolbar';
import SideDrawer from '../Navigation/SideDrawer';

import styles from './styles.module.css';

const Layout = ({ isAuthenticated, children }) => {
  const [isSideDrawerVisible, setIsSideDrawerVisible] = useState(false);

  const closeSideDrawer = () => setIsSideDrawerVisible(false);
  const toggleSideDrawer = () => setIsSideDrawerVisible(!isSideDrawerVisible);

  return (
    <>
      <Toolbar
        toggleSideDrawer={toggleSideDrawer}
        isAuthenticated={isAuthenticated}
      />
      <SideDrawer
        open={isSideDrawerVisible}
        close={closeSideDrawer}
        isAuthenticated={isAuthenticated}
      />

      <main className={styles.content}>{children}</main>
    </>
  );
};

const mapStateToProps = ({ auth: { token } }) => ({
  isAuthenticated: !_.isNull(token)
});

export default connect(mapStateToProps)(Layout);

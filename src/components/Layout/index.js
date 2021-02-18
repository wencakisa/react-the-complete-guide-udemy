import styles from './styles.module.css';

import Toolbar from '../Navigation/Toolbar';

const Layout = ({ children }) => (
  <>
    <Toolbar />
    <main className={styles.content}>{children}</main>
  </>
);

export default Layout;

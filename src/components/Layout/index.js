import styles from './styles.module.css';

const Layout = ({ children }) => (
  <>
    <div>Toolbar / Side drawer / Backdrop</div>
    <main className={styles.content}>{children}</main>
  </>
);

export default Layout;

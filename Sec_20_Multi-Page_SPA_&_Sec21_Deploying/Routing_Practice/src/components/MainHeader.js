import styles from "./MainHeader.module.css";
import { NavLink } from "react-router-dom";

const MainHeader = () => {
  return (
    <header className={styles.header}>
      <nav>
        <ul>
          <li>
            <NavLink activeClassName={styles.active} to="/welcome">
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={styles.active} to="/products">
              Products
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;

// <Link> wants a 'to="/xx" prop
// <Link> wouldnt send new HTML request and manualy update the url

// <NavLink> + activeClassName={xx} automatically highlighted the 'active page' on nav bar

// while <a> wants a 'path="/xx" prop

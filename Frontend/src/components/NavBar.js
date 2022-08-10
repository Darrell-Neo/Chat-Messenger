import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import ReactContext from "../context/react-context";

const NavBar = () => {
  const reactCtx = useContext(ReactContext);
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink to="/messenger" activeClassName={styles.active}>
              Messenger
            </NavLink>
          </li>
          {reactCtx.loginState ? (
            <li>
              <NavLink to="/profile" activeClassName={styles.active}>
                Profile
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink to="/login" activeClassName={styles.active}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

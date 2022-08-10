import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./NavBar2.module.css";

const NavBar2 = () => {
  return (
    <header className={styles.navbar}>
      <nav>
        <ul>
          <li>
            <NavLink to="/dogs" activeClassName={styles.active}>
              Dogs
            </NavLink>
          </li>
          <li>
            {/* currently only works if the role is user */}
            <NavLink to="/cats" activeClassName={styles.active}>
              Cats
            </NavLink>
          </li>
          <li>
            <NavLink to="/smallanimals" activeClassName={styles.active}>
              Others
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar2;

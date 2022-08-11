import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./navBar.css"
import ReactContext from "../context/react-context";

const NavBar = () => {
  const reactCtx = useContext(ReactContext);
  return (
    <header className="navbar">
      <nav>
        <ul>
          <li>
            <NavLink to="/messenger">
              Messenger
            </NavLink>
          </li>
          {reactCtx.loginState ? (
            <li id="profile">
              <NavLink to="/profile">
                My Profile
              </NavLink>
            </li>
          ) : (
            <li id="profile">
              <NavLink to="/login">
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

import React from "react";
import { logout } from "../../actions/auth";
import { NavLink } from "react-router-dom";
export const Navbar = () => {
  const authLinks = (
    <ul>
      <li>
        <a href="!#">Developers</a>
      </li>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <NavLink to="/">
          <i className="fas fa-code"></i> DevConnector
        </NavLink>
      </h1>
      <ul>
        <li>
          <NavLink to="/!">Developers</NavLink>
        </li>
        <li>
          <NavLink to="/register">Register</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;

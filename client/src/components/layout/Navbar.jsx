import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import { NavLink } from "react-router-dom";

import { logout } from "../../actions/auth";
export const Navbar = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const authLinks = (
    <ul>
      <li>
        <NavLink to="/profiles">Developers</NavLink>
      </li>
      <li>
        <a onClick={() => dispatch(logout())} href="#!">
          <span className="hide-sm">Logout</span>
        </a>
      </li>
      <li>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </li>
      <li>
        <NavLink to="/posts">Posts</NavLink>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <NavLink to="/profiles">Developers</NavLink>
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
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};
export default Navbar;

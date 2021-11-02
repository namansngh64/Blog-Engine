import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../style/base.css";

const Nav = ({ history }) => {
  const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "#def2f1" };
    } else {
      // return { color: "#FFFFFF" };
    }
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Blog Engine
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSmall"
          aria-controls="navbarSmall"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSmall">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                style={currentTab(history, "/")}
                to="/"
                className="nav-link"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signin" className="navSignin nav-link">
                Signin
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/signup" className="navSignup nav-link">
                Signup
              </Link>
            </li> */}
          </ul>
          <span className="d-flex nav-item ms-auto text-white">
            <div className="nav-link disabled" style={{ paddingLeft: "0" }}>
              New User?
            </div>
            <Link to="/signup" className="nav-link navSignup">
              Signup
            </Link>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Nav);

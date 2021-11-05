import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { getToken, signout } from "../auth/helper/authapicalls";
import "../style/base.css";

const Nav = ({ history }) => {
  const currentTab = (history, path) => {
    if (history.location.pathname === path) {
      return { color: "#feffff " };
    } else {
      // return { color: "#FFFFFF" };
    }
  };

  const [token, setToken] = useState("");
  const [loading, setloading] = useState(false);
  const myGetToken = () => {
    getToken().then(async (data) => {
      await setToken(data.data.token);
      await setloading(true);
    });
    return token;
  };
  // useEffect(() => {}, []);

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
            <li className="nav-item ">
              <Link
                to="/"
                className="nav-link"
                style={currentTab(history, "/")}
              >
                Home
              </Link>
            </li>
            {myGetToken() === undefined && loading && (
              <li className="nav-item ">
                <Link to="/signin" className="navSignin nav-link">
                  Signin
                </Link>
              </li>
            )}
            {myGetToken() != undefined && loading && (
              <>
                <li className="nav-item ">
                  <Link to="/create/blog" className=" nav-link">
                    Create Blog
                  </Link>
                </li>
                <li className="nav-item ">
                  <Link to="/manage" className=" nav-link">
                    Manage Blog
                  </Link>
                </li>
              </>
            )}
            {/* <li className="nav-item navBackground">
              <Link to="/signin" className="navSignin nav-link">
                Signin
              </Link>
            </li> */}
            {/* <li className="nav-item">
              <Link to="/signup" className="navSignup nav-link">
                Signup
              </Link>
            </li> */}
          </ul>
          {myGetToken() === undefined && loading && (
            <span className="d-flex nav-item ms-auto text-white">
              <Link to="/signup" className="btn btn-outline-warning btn-sm">
                Create account
              </Link>
            </span>
          )}
          {myGetToken() !== undefined && loading && (
            <span className="d-flex nav-item ms-auto text-white">
              <input
                type="button"
                onClick={() => {
                  signout(() => {
                    history.push({
                      pathname: "/",
                      signout: "Signed Out Successfully"
                    });
                  });
                }}
                className="btn btn-outline-danger btn-sm"
                value="Signout"
              />
            </span>
          )}
        </div>
      </div>
    </nav>
  );
};

export default withRouter(Nav);

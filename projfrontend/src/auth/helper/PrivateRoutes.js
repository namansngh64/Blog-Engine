import axios from "axios";
import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { API } from "../../backend";
import { getToken } from "./authapicalls";
import "../../style/privateroute.css";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);
  const myGetToken = () => {
    getToken().then(async (data) => {
      await setToken(data.data.token);
      setLoading(false);
    });
  };
  // const getToken = async () => {
  //   const a = await axios.get(`${API}/reftoken`, {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     withCredentials: true
  //   });

  //   await setToken(a.data.token);
  // };

  useEffect(() => {
    // getToken().then(setLoading(false));
    myGetToken();
    return () => {
      setToken();
      setLoading();
    };
  }, []);

  console.log(token);
  return (
    <>
      {loading && (
        <div className="overlay">
          <div className="d-flex justify-content-center">
            <div className="spinner-border myspin " role="status"></div>
          </div>
        </div>
      )}
      <Route
        {...rest}
        render={
          (props) =>
            //   <Redirect
            //     to={{
            //       pathname: "/signin",
            //       state: { from: props.location }
            //     }}
            //   />

            token != undefined ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: "/signin",
                  state: { from: props.location }
                }}
              />
            )

          // getToken().then((data) => {
          //   data !== undefined ?
          // });
        }
      />
    </>
  );
};

export default PrivateRoute;

import React from "react";
import Nav from "./Nav";
import "../style/base.css";
import { ToastContainer } from "react-toastify";

const Base = ({ className = " text-black p-2", children }) => {
  return (
    <div className="myBase">
      <Nav />
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="container-fluid">
        {/* <div className="jumbotron text-white text-center p-4">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div> */}
        <div className={className}>{children}</div>
      </div>
      <div className="fixed-bottom  ">
        <div className="container-fluid bg-dark  text-white text-center py-1">
          <h6>Developed by Naman</h6>
        </div>
      </div>
    </div>
  );
};
export default Base;

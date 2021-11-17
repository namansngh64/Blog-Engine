import React, { useState } from "react";
import { useHistory } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { signup, verifyOtp } from "../auth/helper/authapicalls";
import Base from "../core/Base";

import "../style/signup.css";

const Signup = () => {
  const [values, setValues] = useState({
    email: "",
    name: "",
    c_password: "",
    password: "",
    error: "",
    loading: false,
    success: false,
    otp: false,
    otpValue: "",
    userId: ""
  });

  const {
    email,
    password,
    error,
    loading,
    success,
    name,
    c_password,
    otp,
    userId,
    otpValue
  } = values;

  let history = useHistory();

  const handleChange = (name) => (event) => {
    setValues((prevState) => {
      return { ...prevState, [name]: event.target.value };
    });
  };

  const handleClick = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });

    if (c_password !== password) {
      toast.error("Password does not match", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      setValues({ ...values, loading: false });
      return;
    }
    signup({ name, email, password }).then((data) => {
      if (data.error) {
        toast.error(data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        setValues({ ...values, loading: false });
      } else {
        toast.success("OTP Sent Successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        setValues({
          ...values,
          loading: false,
          otp: true,
          userId: data.id
        });
        // authenticate(data, () => {
        //   setValues({ ...values, loading: false, success: true });
        // });
      }
    });
  };

  const handleOtp = (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true });

    verifyOtp({ userId, otpValue }).then((data) => {
      if (data.error) {
        toast.error(data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        setValues({ ...values, loading: false });
      } else {
        // toast.success(data.message, {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined
        // });
        setValues({
          ...values,
          loading: false,
          success: true
        });
        history.push({
          pathname: "/signin",
          message: "Account Verified! Signin to continue"
        });
      }
    });
  };

  return (
    <Base>
      <div>
        {!otp && (
          <div className=" signup-div">
            <form>
              <h2 className="signup-heading">Signup</h2>
              <br />
              <div className="form-group mydiv mb-4">
                {/* <label htmlFor="i-username" className="form-label ">
              Username:{" "}
            </label> */}

                <input
                  type="name"
                  required
                  className="signup-input"
                  placeholder=" "
                  value={name}
                  onChange={handleChange("name")}
                />
                <span className="my-floating-label">Name</span>
              </div>
              <div className="form-group mydiv mb-4">
                {/* <label htmlFor="i-username" className="form-label ">
              Username:{" "}
            </label> */}

                <input
                  type="email"
                  required
                  className="signup-input"
                  placeholder=" "
                  value={email}
                  onChange={handleChange("email")}
                />
                <span className="my-floating-label">Email</span>
              </div>
              <div className="form-group mydiv mb-4">
                {/* <label htmlFor="i-username" className="form-label ">
              Username:{" "}
            </label> */}

                <input
                  type="password"
                  required
                  className="signup-input"
                  placeholder=" "
                  value={password}
                  onChange={handleChange("password")}
                />
                <span className="my-floating-label">Password</span>
              </div>
              <div className="form-group mydiv mb-1">
                <input
                  type="password"
                  required
                  className=" signup-input"
                  placeholder=" "
                  value={c_password}
                  onChange={handleChange("c_password")}
                />
                <span className="my-floating-label">Confirm Password</span>
              </div>
              {/* <div className="mx-2">
            <input
              className="form-check-input mx-0"
              type="checkbox"
              value=""
              checked={checked}
              // onChange={handleCheck}
              id="flexCheckDefault"
            />
            <label className="form-check-label mx-2" htmlFor="flexCheckDefault">
              Stay Signed In
            </label>
          </div> */}
              {/* <br /> */}

              {!loading && (
                <button
                  className="btn signup-bt mt-3 mb-1"
                  onClick={handleClick}
                >
                  Sign Up{" "}
                </button>
              )}
              {loading && (
                <button
                  className="btn signup-bt mt-3 mb-1"
                  disabled
                  // onClick={handleClick}
                >
                  Loading{" "}
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </button>
              )}

              {/* <button className="btn signup-bt mt-3 mb-1" onClick={handleClick}>
            Sign In{" "}
            {loading && (
              <span
                className="spinner-grow spinner-grow-sm"
                role="status"
                aria-hidden="true"
              ></span>
            )}
          </button> */}
              {/* <div class="spinner-grow" role="status"> */}

              {/* </div> */}
              <br />
            </form>
            {JSON.stringify(values)}
          </div>
        )}

        {otp && (
          <div className=" signup-div">
            <form>
              <h2 className="signup-heading">Signup</h2>
              <br />
              <div className="form-group mydiv mb-4">
                {/* <label htmlFor="i-username" className="form-label ">
            Username:{" "}
          </label> */}

                <input
                  type="text"
                  required
                  className="signup-input"
                  placeholder=" "
                  value={otpValue}
                  onChange={handleChange("otpValue")}
                />
                <span className="my-floating-label">OTP</span>
              </div>
              {!loading && (
                <button
                  className="btn signup-bt mt-3 mb-1 otp"
                  onClick={handleOtp}
                >
                  Verify{" "}
                </button>
              )}
              {loading && (
                <button
                  className="btn signup-bt mt-3 mb-1"
                  disabled
                  // onClick={handleClick}
                >
                  Loading{" "}
                  <span
                    className="spinner-grow spinner-grow-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </button>
              )}
            </form>
          </div>
        )}
        {/* {success && (
          <div style={{ display: "none" }}>
            {setTimeout(() => {
              history.push("/signin");
            }, 2000)}
          </div>
        )} */}
      </div>
    </Base>
  );
};

export default Signup;

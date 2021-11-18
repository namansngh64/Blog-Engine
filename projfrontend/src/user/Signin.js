import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "../style/signin.css";
import "react-toastify/dist/ReactToastify.css";
import {
  authenticate,
  getToken,
  signin,
  test
} from "../auth/helper/authapicalls";
import Base from "../core/Base";

const Signin = (props) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
    checked: false,
    loading: false,
    success: false
  });
  const message = () => {
    var message = (props.location && props.location.message) || undefined;

    // console.log(message + " " + props.location.signout);
    if (message !== undefined) {
      console.log("HEHE");
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
      message = undefined;
    }
  };
  let history = useHistory();

  const accToken = async () => {
    const a = await getToken().then((data) => {
      return data;
    });
    console.log(a.data.token);
  };

  useEffect(() => {
    //
    message();
    if (props.location && props.location.message) {
      props.location.message = undefined;
    }
  }, []);

  const { email, password, checked, error, loading, success } = values;

  const handleChange = (name) => (event) => {
    setValues((prevState) => {
      return { ...prevState, [name]: event.target.value };
    });
  };

  const handleCheck = (event) => {
    setValues((prevState) => {
      return { ...prevState, checked: event.target.checked };
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    setValues({ ...values, loading: true });
    // toast.error("hello toast!", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined
    // });
    // console.log(signin({ email, password, checked }));
    signin({ email, password, checked }).then((data) => {
      // const token = getToken();
      accToken();
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
        // toast.success(data.user.name + " Signed In Successfully", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined
        // });
        setValues({ ...values, loading: false, success: true });
        history.push({
          pathname: "/",
          message: "Signed In Successfully!"
        });
        // authenticate(data, () => {
        //   setValues({ ...values, loading: false, success: true });
        // });
      }
      // accToken();
    });
  };
  return (
    <Base>
      <div>
        {message()}
        <div className=" signin-div">
          <form>
            <h2>Welcome Back</h2>
            <br />
            <div className="form-group mydiv mb-4">
              {/* <label htmlFor="i-username" className="form-label ">
              Username:{" "}
            </label> */}

              <input
                type="email"
                required
                className="signin-input"
                placeholder=" "
                value={email}
                onChange={handleChange("email")}
              />
              <span className="my-floating-label">Username</span>
            </div>
            <div className="form-group mydiv mb-2">
              <input
                type="password"
                required
                className=" signin-input"
                placeholder=" "
                value={password}
                onChange={handleChange("password")}
              />
              <span className="my-floating-label">Password</span>
            </div>
            <div className="mx-2">
              <input
                className="form-check-input mx-0"
                type="checkbox"
                value=""
                checked={checked}
                onChange={handleCheck}
                id="flexCheckDefault"
              />
              <label
                className="form-check-label mx-2"
                htmlFor="flexCheckDefault"
              >
                Stay Signed In
              </label>
            </div>
            {/* <br /> */}

            {!loading && (
              <button className="btn signin-bt mt-3 mb-1" onClick={handleClick}>
                Sign In{" "}
              </button>
            )}
            {loading && (
              <button
                className="btn signin-bt mt-3 mb-1"
                disabled
                onClick={handleClick}
              >
                Loading{" "}
                <span
                  className="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              </button>
            )}

            {/* <button className="btn signin-bt mt-3 mb-1" onClick={handleClick}>
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

            <span className="text-black">
              New User?{" "}
              <Link to="/signup" className="signin-link">
                Sign Up!
              </Link>
            </span>
          </form>
          {JSON.stringify(values)}
        </div>
      </div>
    </Base>
  );
};

export default Signin;

import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Base from "./Base";

const Home = (props) => {
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
  // const signinMessage = () => {
  //   var message = (props.location && props.location.signin) || undefined;
  //   // console.log(message + " " + props.location.signout);
  //   if (message !== undefined) {
  //     // console.log("HEHE");
  //     toast.success(message, {
  //       position: "top-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined
  //     });
  //     message = undefined;
  //   }
  // };
  useEffect(() => {
    message();
    if (props.location && props.location.message) {
      props.location.message = undefined;
    } //because signout toast not working in signin page
  }, []);
  return (
    <Base>
      {message()}
      <div>Hello</div>
    </Base>
  );
};

export default Home;

import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Base from "./Base";

const Home = (props) => {
  const signoutMessage = () => {
    var message = (props.location && props.location.signout) || undefined;
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
  useEffect(() => {
    signoutMessage(); //because signout toast not working in signin page
  }, []);
  return (
    <Base>
      {signoutMessage()}
      <div>Hello</div>
    </Base>
  );
};

export default Home;

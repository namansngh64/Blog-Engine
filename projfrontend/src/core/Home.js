import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Base from "./Base";

const Home = (props) => {
  const signoutMessage = () => {
    const message = (props.location && props.location.signout) || undefined;
    console.log(message + " " + props.location.signout);
    if (message != undefined) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      });
    }
  };
  useEffect(() => {
    signoutMessage();
  }, []);
  return (
    <Base>
      <div>Hello</div>
    </Base>
  );
};

export default Home;

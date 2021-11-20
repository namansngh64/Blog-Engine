import React, { useEffect } from "react";
import { toast } from "react-toastify";
import Base from "../core/Base";

const ManageBlogs = (props) => {
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

  useEffect(() => {
    message();
  }, []);
  return (
    <Base>
      {message()}
      <h1>Manage Blogs</h1>
    </Base>
  );
};

export default ManageBlogs;

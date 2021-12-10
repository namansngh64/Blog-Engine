import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "../core/Base";
import "../style/manageBlogs.css";
import { getUserBlogs } from "./helper/blogapicalls";

const ManageBlogs = (props) => {
  let history = useHistory();
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

  const [blogs, setBlogs] = useState([]);

  const preload = () => {
    getUserBlogs().then((data) => {
      setBlogs([...data]);
    });
    console.log(blogs);
  };

  useEffect(() => {
    message();
    preload();
  }, []);

  const blogCard = (title, blogBody, pic, blogId) => {
    return (
      <>
        <div
          className="blogWrapper"
          onClick={() => {
            blogClick(blogId);
          }}
        >
          {pic ? (
            <div className="row">
              <div className="col-9">
                <div className="blogHeading">{title}</div>
                <div className="blogBody">
                  {blogBody.substring(0, 150)}
                  {blogBody.length > 150 ? "..." : ""}
                </div>
              </div>
              <div className="col-3">
                <img
                  src={pic}
                  style={({ width: "150px" }, { height: "100px" })}
                />
              </div>
              <button className="btn btn-warning edit-btn">Edit</button>
              <button className="btn btn-danger delete-btn">Delete</button>
            </div>
          ) : (
            <div className="row">
              <div className="blogHeading">{title}</div>
              <div className="blogBody">
                {blogBody.substring(0, 20)}
                {blogBody.length > 150 ? "..." : ""}
              </div>
              <button className="btn btn-warning edit-btn">Edit</button>
              <button className="btn btn-danger delete-btn">Delete</button>
            </div>
          )}
        </div>
      </>
    );
  };

  const blogClick = (blogId) => {
    history.push(`/blog/${blogId}`);
  };

  const myblogs = () => {
    let content = (
      <>
        {blogs.map((blog, key) =>
          blogCard(
            blog.title,
            blog.blogBody,
            blog.images.length
              ? window.location.origin + blog.images[0].substring(22)
              : 0,
            blog._id
          )
        )}
      </>
    );
    return content;
  };

  return (
    <Base>
      {message()}
      <div className="row">
        <div className="col-12 heading">Manage Blog</div>
      </div>
      {myblogs()}
    </Base>
  );
};

export default ManageBlogs;

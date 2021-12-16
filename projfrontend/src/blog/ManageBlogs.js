import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Base from "../core/Base";
import "../style/manageBlogs.css";
import { deleteBlogById, getUserBlogs } from "./helper/blogapicalls";
import { Modal } from "bootstrap";

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
    // console.log(blogs);
  };

  useEffect(() => {
    message();
    preload();
  }, []);

  const blogCard = (title, blogBody, pic, blogId, key) => {
    return (
      // <>
      <div
        className="blogWrapper"
        key={key}
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
            <button
              onClick={(e) => {
                e.stopPropagation();
                history.push(`/edit/blog/${blogId}`);
              }}
              className="btn btn-warning edit-btn"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                confirmDelete(e, blogId, key);
              }}
              className="btn btn-danger delete-btn"
            >
              Delete
            </button>
          </div>
        ) : (
          <div className="row">
            <div className="blogHeading">{title}</div>
            <div className="blogBody">
              {blogBody.substring(0, 20)}
              {blogBody.length > 150 ? "..." : ""}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                history.push(`/edit/blog/${blogId}`);
              }}
              className="btn btn-warning edit-btn"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                confirmDelete(e, blogId, key);
              }}
              className="btn btn-danger delete-btn"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  const blogClick = (blogId) => {
    history.push(`/blog/${blogId}`);
  };

  const confirmDelete = (e, blogId, key) => {
    e.stopPropagation();
    var myModal = new Modal(document.getElementById("myModal"));
    document.getElementById("span-btn").value = `${blogId}`;
    // document.getElementById("span-key").value = `${key}`;

    myModal.show();
  };

  const deleteBlog = () => {
    const blogId = document.getElementById("span-btn").value;
    // const key = document.getElementById("span-key").value;
    var myModalEl = document.getElementById("myModal");
    var modal = Modal.getInstance(myModalEl);
    deleteBlogById(blogId).then((data) => {
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
      } else {
        toast.success("Blog Deleted Successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        // let myBlogs = blogs;
        // myBlogs.splice(key, 1);
        // setBlogs([...myBlogs]);
        preload();
        modal.hide();
      }
    });
    console.log(blogId);
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
            blog._id,
            key
          )
        )}
      </>
    );
    return content;
  };

  return (
    <Base>
      {/* {message()} */}
      <div className="modal fade-scale" id="myModal" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modal title</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p>Do you want to delete this blog?</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <input hidden type="text" id="span-btn" />
              {/* <input hidden type="text" id="span-key" /> */}
              <button className="btn btn-danger" onClick={deleteBlog}>
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12 heading">Manage Blog</div>
      </div>
      {myblogs()}
    </Base>
  );
};

export default ManageBlogs;

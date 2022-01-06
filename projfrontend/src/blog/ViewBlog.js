import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { getToken } from "../auth/helper/authapicalls";
import Base from "../core/Base";
import {
  createComment,
  getBlogById,
  getBlogComments
} from "./helper/blogapicalls";

const ViewBlog = ({ match }) => {
  const [values, setValues] = useState({
    title: "",
    blogBody: "",
    prevImagePreviewUrl: [],
    comments: []
  });

  let history = useHistory();

  const { title, blogBody, prevImagePreviewUrl, comments } = values;

  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  const myGetToken = () => {
    getToken().then(async (data) => {
      await setToken(data.data.token);
      setLoading(false);
    });
  };

  const preload = (blogId) => {
    getBlogById(blogId).then((data) => {
      if (data.error) {
        history.push({
          pathname: "/",
          message: data.error
        });
      } else {
        let previmages = [];
        data.images.map((image) => {
          previmages.push(image);
        });
        setValues({
          ...values,
          title: data.title,
          blogBody: data.blogBody,
          prevImagePreviewUrl: [...previmages]
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.blogId);
    myGetToken();
    getComments();
  }, []);

  const addComment = () => {
    return (
      <>
        <div className="row mt-4 align-items-center">
          <div className="col-2">
            <label
              htmlFor="myComment"
              className="col-form-label"
              style={{ float: "right", paddingBottom: "40%" }}
            >
              Naman
            </label>
          </div>
          <div className="col-10">
            <textarea
              id="myComment"
              rows={2}
              className="form-control"
              style={{ width: "80%" }}
            ></textarea>
            <button
              className="btn btn-sm btn-info mt-2"
              style={{ float: "right", marginRight: "20%" }}
              onClick={postComment}
            >
              Comment
            </button>
          </div>
        </div>
        <br />
      </>
    );
  };

  const postComment = () => {
    let comment = document.getElementById("myComment").value;
    createComment(match.params.blogId, comment).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        toast.success("Comment Added!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        document.getElementById("myComment").value = "";
      }
    });
  };

  const getComments = () => {
    getBlogComments(match.params.blogId).then((data) => {
      if (data.error || data.length <= 0) {
      } else {
        setValues({ ...values, comments: [...data] });
      }
    });
  };

  const showComments = () => {
    let content = (
      <>
        {/* {comments.map((comment, key) =>
            blogCard(
              blog.title,
              blog.blogBody,
              blog.images.length
                ? window.location.origin + blog.images[0].substring(22)
                : 0,
              blog._id,
              key
            )
          )} */}
      </>
    );
    return content;
  };

  return (
    <Base>
      <center>
        <h1>{title}</h1>
        <br />
        <p className="lead h6" style={{ whiteSpace: "pre-wrap" }}>
          {blogBody}
        </p>
      </center>
      <h4 className="mt-4">Comments:</h4>

      {token === undefined && (
        <center>
          <button className="btn btn-sm btn-light">
            SignIn to add comment
          </button>
        </center>
      )}
      {token !== undefined && addComment()}
      {comments.length <= 0 && (
        <center>
          <h6>No comments yet!</h6>
        </center>
      )}
      {comments.length > 0 && showComments()}
    </Base>
  );
};

export default ViewBlog;

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
import "../style/viewBlog.css";
import { Carousel } from "bootstrap";

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
        <div className="row mt-4">
          <div className="col-2">
            <label
              htmlFor="myComment"
              className="col-form-label"
              style={{
                float: "right"
                // paddingBottom: "40%"
              }}
            >
              Naman
            </label>
          </div>
          <div className="col-10">
            <textarea
              id="myComment"
              rows={2}
              placeholder="Less than 200 characters"
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
        toast.success("Comment Added!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        getComments();
        document.getElementById("myComment").value = "";
      }
    });
  };

  const getComments = () => {
    getBlogComments(match.params.blogId).then((data) => {
      if (data.error || data.length <= 0) {
      } else {
        setValues((prevState) => {
          return { ...prevState, comments: [...data] };
        });
      }
    });
  };

  const commentCard = (commentBody, ctime, uname, key) => {
    return (
      <>
        <div className="row" key={key}>
          <div className="col-1 h6">
            <span
              // htmlFor="myComment"
              // className="col-form-label"
              style={{ marginLeft: "70%" }}
            >
              {uname}:
            </span>
          </div>
          <div className="col-11">
            <p
              className="h6 mb-1"
              style={{
                whiteSpace: "pre-wrap",
                float: "left",
                paddingLeft: "10px"
              }}
            >
              {commentBody}
            </p>
            <br />
            <small
              // className="mx-1"
              style={{
                float: "left",
                paddingLeft: "10px"
              }}
            >
              {ctime}
            </small>
          </div>
        </div>
        <br />
      </>
    );
  };

  const showComments = () => {
    let content = (
      <>
        {comments.map((comment, key) =>
          commentCard(
            comment.commentBody,
            comment.updatedAt,
            comment.user.name,
            key
          )
        )}
      </>
    );
    return content;
  };

  const showImgs = () => {
    let content = (
      <>
        <div
          id="carouselExampleFade"
          className="carousel slide"
          data-bs-ride="carousel"
          // data-interval="100"
          style={{
            maxWidth: "30%",
            height: "50%"
            // overflow: "hidden !important"
          }}
        >
          <div className="carousel-inner" id="myCar">
            {prevImagePreviewUrl.map((img, key) => (
              <>
                {key == 0 && (
                  <div className="carousel-item active" key={key}>
                    <img
                      src={
                        window.location.origin +
                        prevImagePreviewUrl[0].substring(22)
                      }
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "30vh",
                        overflow: "hidden"
                      }}
                      // className="img-fluid"
                    />
                  </div>
                )}
                {key != 0 && (
                  <div
                    className="carousel-item"
                    key={key}

                    // style={{
                    //   height: "100px !important",
                    //   backgroundSize: "cover",
                    //   backgroundPosition: "center center"
                    // }}
                  >
                    <img
                      src={window.location.origin + img.substring(22)}
                      // className="img-fluid"
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "30vh",
                        overflow: "hidden"
                      }}
                    />
                  </div>
                )}
              </>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            id="btn-next"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </>
    );
    var myCarousel = document.querySelector("#carouselExampleFade");
    var carousel = new Carousel(myCarousel);
    carousel.cycle();
    // setTimeout(() => {
    //   const body = document.getElementById("btn-next");
    //   body.click();
    //   document.getElementById("myCar").focus();
    // }, 2000);

    return content;
  };

  return (
    <Base>
      <center>
        <h1>{title}</h1>
        <br />
        {prevImagePreviewUrl.length > 0 && showImgs()}
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

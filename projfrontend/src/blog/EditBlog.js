import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import Base from "../core/Base";
import "../style/editBlog.css";
import { editBlog, getBlogById } from "./helper/blogapicalls";

const EditBlog = ({ match }) => {
  const [values, setValues] = useState({
    title: "",
    blogBody: "",
    myFile: [],
    imagePreviewUrl: [],
    formData: new FormData(),
    error: "",
    loading: false,
    success: false
  });

  let history = useHistory();

  const {
    title,
    blogBody,
    myFile,
    error,
    loading,
    success,
    imagePreviewUrl,
    formData
  } = values;

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
          previmages.push(window.location.origin + image.substring(22));
          <img
            style={{ display: "none" }}
            src={window.location.origin + image.substring(22)}
          />;
        });
        setValues({
          ...values,
          title: data.title,
          blogBody: data.blogBody,
          imagePreviewUrl: [...previmages]
        });
      }
    });
  };

  useEffect(() => {
    preload(match.params.blogId);
  }, []);

  const imgprev = () => {
    let imagePreview;
    imagePreview = (
      <div className="row mb-4">
        {imagePreviewUrl.map((imgsrc, key) => (
          <div
            key={key}
            className="col-md-4 imgContainer"
            // style={{position:"relative"},{ display: "inline-block" }}
          >
            <img
              src={imgsrc}
              // className="img-fluid"
              // style={({ height: "200px" }, { width: "200px" })}
            />
            <br />
            <button
              className="mt-1 btn btn-sm btn-danger myDelBtn"
              // style={
              //   ({ position: "absolute" }, { top: "0px" }, { right: "0px" })
              // }
              onClick={(e) => {
                deleteImage(e, key);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
    );
    return imagePreview;
  };

  const deleteImage = (e, key) => {
    e.preventDefault();
    let myImgArr = imagePreviewUrl;
    let myFileArr = myFile;
    myImgArr.splice(key, 1);
    myFileArr.splice(key, 1);
    setValues({
      ...values,
      myFile: [...myFileArr],
      imagePreviewUrl: [...myImgArr]
    });
  };

  const handleImage = (e) => {
    let files = [];
    let setMyFile = [];
    for (let file of e.target.files) {
      setMyFile.push(file);
      files.push(URL.createObjectURL(file));
    }
    setValues({
      ...values,
      myFile: [...myFile, ...setMyFile],
      imagePreviewUrl: [...imagePreviewUrl, ...files]
    });
  };

  const handleChange = (name) => (event) => {
    const value =
      name === "myFile" ? event.target.files[0] : event.target.value;
    if (name === "myFile") {
      // console.log(value, name);
      handleImage(event);
    } else {
      setValues({ ...values, [name]: value });
      formData.set(name, value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValues((prevState) => {
      return { ...prevState, error: "", loading: true };
    });
    formData.delete("myFile");
    myFile.map((myfile) => {
      formData.append("myFile", myfile);
    });
    if (!title || !blogBody) {
      toast.error("Please provide all the necessary details!", {
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
        error: "Please provide all the necessary details!",
        loading: false
      });
      return;
    }

    formData.set("title", title);

    formData.set("blogBody", blogBody);
    editBlog(formData).then((data) => {
      // console.log(data);
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
        setValues({ ...values, error: data.error, loading: false });
      } else {
        toast.success(data.message, {
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
          error: "",
          success: true,
          loading: false
        });
        history.push({
          pathname: "/manage",
          message: "Blog Created Successfully"
        });
      }
    });
  };

  return (
    <Base>
      <div className="row">
        <div className="col-md-12 heading">Edit Blog</div>
      </div>
      <form>
        <div className="row myTitle mt-4">
          <div className="col-md-2 mb-4 ">
            <center>
              <label
                htmlFor="mytitle"
                // style={{ marginLeft: "30%" }}
                className="col-form-label"
              >
                Title :
              </label>
            </center>
          </div>
          <div className="col-md-10 mb-4">
            <input
              id="mytitle"
              type="text"
              value={title}
              onChange={handleChange("title")}
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-4">
            <textarea
              className="form-control"
              value={blogBody}
              onChange={handleChange("blogBody")}
              rows="18"
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-4">
            <label htmlFor="myFile" className="btn btn-sm myFileBtn">
              Upload pictures
              <input
                id="myFile"
                type="file"
                accept="image/jpeg , image/jpg , image/png"
                multiple
                // onChange={(e) => {
                //   // handleChange("photo");
                //   handleImage(e);
                // }}
                onChange={handleChange("myFile")}
              />
            </label>
          </div>
        </div>
        {imgprev()}
        <img src="/images/616332e79f1df4dbdd213d58/8fd25aa98fa03a5136846bf05.jpeg" />
        <button className="btn btn-success" onClick={handleSubmit}>
          Save
        </button>
      </form>
    </Base>
  );
};

export default EditBlog;

import React, { useState } from "react";
import { toast } from "react-toastify";
import Base from "../core/Base";
import "../style/createBlog.css";
import { createBlog } from "./helper/blogapicalls";

const CreateBlog = () => {
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

  const imgprev = () => {
    let imagePreview;
    // console.log(myUrl);
    var i = 0;
    imagePreview = (
      <div className="row mb-4">
        {imagePreviewUrl.map((imgsrc) => (
          <div key={i++} className="col-md-4">
            <img
              src={imgsrc}
              className="img-fluid"
              // style={({ height: "200px" }, { width: "200px" })}
            />
          </div>
        ))}
      </div>
    );
    return imagePreview;
  };

  const handleImage = (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(reader);
    reader.onloadend = () => {
      setValues({
        ...values,
        myFile: [...myFile, file],
        imagePreviewUrl: [...imagePreviewUrl, reader.result]
      });
    };

    if (file !== undefined) reader.readAsDataURL(file);
  };

  const handleChange = (name) => (event) => {
    const value =
      name === "myFile" ? event.target.files[0] : event.target.value;
    if (name === "myFile") {
      // console.log(value, name);
      handleImage(event);
      // formData.append(name, value);
    } else {
      setValues({ ...values, [name]: value });
      formData.set(name, value);
    }

    // setValues((prevState) => {
    //   return { ...prevState, [name]: event.target.value };
    // });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    formData.set("title", title);

    formData.set("blogBody", blogBody);

    for (var i = 0; i < myFile.length; i++) {
      formData.append("myFile", myFile[i]);
    }
    console.log(formData.getAll("myFile"));

    // formData.append("myFile", myFile);

    createBlog(formData).then((data) => {
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
      }
    });
  };

  return (
    <Base>
      <div className="row">
        <div className="col-md-12 heading">Create Blog</div>
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
                multiple
                accept="image"
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
        <button className="btn btn-success" onClick={handleSubmit}>
          Create
        </button>
      </form>
    </Base>
  );
};

export default CreateBlog;

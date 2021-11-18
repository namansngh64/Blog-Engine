import React, { useState } from "react";
import Base from "../core/Base";
import "../style/createBlog.css";

const CreateBlog = () => {
  const [values, setValues] = useState({
    title: "",
    blogBody: "",
    myFile: [],
    imagePreviewUrl: [],
    error: "",
    loading: false,
    success: false
  });

  const { title, blogBody, myFile, error, loading, success, imagePreviewUrl } =
    values;

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

    // if (myUrl)
    //   imagePreview = (
    //     <img
    //       src={myUrl}
    //       className="img-thumbnail"
    //       style={({ height: "200px" }, { width: "200px" })}
    //     />
    //   );
    // else
    //   imagePreview = (
    //     <div className="h6">Please select an Image for Preview</div>
    //   );
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
    setValues((prevState) => {
      return { ...prevState, [name]: event.target.value };
    });
  };

  return (
    <Base>
      <div className="row">
        <div className="col-md-12 heading">Create Blog</div>
      </div>
      <form encType="multipart/form-data">
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
              <input id="myFile" multiple type="file" onChange={handleImage} />
            </label>
          </div>
        </div>
        {imgprev()}
        <button className="btn btn-success">Create</button>
      </form>
    </Base>
  );
};

export default CreateBlog;

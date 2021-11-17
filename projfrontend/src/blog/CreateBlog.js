import React from "react";
import Base from "../core/Base";
import "../style/createBlog.css";

const CreateBlog = () => {
  return (
    <Base>
      <div className="row">
        <div className="col-md-12 heading">Create Blog</div>
      </div>
      <form>
        <div className="row  myTitle mt-4">
          <div className="col-md-1 mb-4 ">
            <label for="mytitle" class="col-form-label">
              Title :
            </label>
          </div>
          <div className="col-md-11 mb-4">
            <input id="mytitle" type="text" className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 mb-4">
            <textarea className="form-control" rows="18"></textarea>
          </div>
        </div>
        <button className="btn btn-success">Create</button>
      </form>
    </Base>
  );
};

export default CreateBlog;
